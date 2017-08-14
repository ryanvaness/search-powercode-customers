import _ from './modules/underscore.js';
import axios from 'axios';
import swal from 'sweetalert2';

(function (window) {
    'use strict';
    let document = window.document; // localize the document

    // Get all customers from all Powercode instances
    document.getElementById('searchForm').onsubmit = function handleSubmission(e) {
        axios({
            method: 'post',
            url: 'apiCall.php',
            data: new FormData(e.target),
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            responseType: 'json'
        }).then(function (response) { // If api call was successful
            _('customers').html();
            let customerHTML = '';
            response.data.forEach(function eachPowercode(pc) { // Loop through each Powercode instance
                if (pc.statusCode !== 0) {
                    swal('Error', pc.message, 'error');
                    return;
                }
                customerHTML += generatePowercodeHTML(pc);
            });

            _('customers').get().innerHTML = customerHTML.replace(/(^|\n)\s*/g, '');
            _(document.getElementsByClassName('filter-table')).filterTable();
        }).catch(function caughtError(e) {
            console.error('ERROR', e);
        });
        return false;
    };

    // Attach all event listeners by delegation
    document.body.addEventListener('click', function delegateClick(e) {
        const _theTarget = _(e.target);

        if (_theTarget.hasClass('filter') || _theTarget.hasClass('glyphicon-filter')) { // show/hide filter
            let _panelBody = _theTarget.closestClass('panel-heading').next();
            if (_panelBody.isVisible()) {
                _panelBody.hide();
            } else {
                _panelBody.show();
            }
        }
    });

    // Generates html for this Powercode instance
    const generatePowercodeHTML = function (pc) {
        let customerHTML = `
            <div class="pcInstance panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">Customers from ${pc.name}</h3>
                    <div class="pull-right">
                        <span class="clickable filter" data-toggle="tooltip" title="Toggle table filter" data-container="body">
                            <i class="glyphicon glyphicon-filter"></i>
                        </span>
                    </div>
                </div>
                <div class="panel-body">
                    <input type="text" class="filter-table form-control" id="customer-table-filter" data-action="filter" placeholder="Filter Customers" />
                </div>
                <table class="table table-hover">
                    <thead>
                        <tr>
                            <th>ID</th>
                            <th>Name</th>
                            <th>Address 1</th>
                            <th>City</th>
                        </tr>
                    </thead>
                    <tbody>
        `;
        if (pc.customers.length) {
            customerHTML += pc.customers.map(function eachCustomer(customer) {
                return generateCustomerHTML(customer, pc.url);
            }).join('');

        }
        customerHTML += `
                    <tr class="search-sf" style="display: none;"><td class="text-muted" colspan="4">No entries found.</td></tr>
                </tbody>
            </table>
        `;
        customerHTML += `
            </div>
         `;

        return customerHTML;
    };

    // Generates html for each customer
    const generateCustomerHTML = function (customer, url) {
        return `
            <tr>
                <td>${customer.CustomerID}</td>
                <td><a href="${url}/index.php?q&page=/customers/_view.php&customerid=${customer.CustomerID}" target="_blank">${customer.CompanyName}</a></td>
                <td>${customer.Address1}</td>
                <td>${customer.City}</td>
            </tr>
        `;
    };
})(window);

