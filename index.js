'use strict';
import _ from './modules/underscore.js';
import axios from 'axios';
import swal from 'sweetalert2';
import './styles.scss'

(function (window) {
    let document = window.document;

    document.getElementById('searchForm').onsubmit = function handleSubmission(e) {
        axios({
            method: 'post',
            url: 'apiCall.php',
            data: new FormData(e.target),
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            responseType: 'json'
        }).then(function (response) {
            _('customers').html();
            let customerHTML = '';
            response.data.forEach(function eachPowercode(pc) {
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

        if (_theTarget.hasClass('removeEndpoint')) { // remove endpoint
            _theTarget.closestClass('endpoint').remove();
        } else if (_theTarget.get().id === 'addEndpoint') { // add endpoint
            let allNodes = document.getElementsByClassName('endpoint'),
                lastNode = allNodes[allNodes.length - 1],
                num = nextNumber(),
                newNode = document.createElement('div');

            newNode.className = 'endpoint form-group';
            newNode.innerHTML = `
                <input title="API Key" type="text" class="apiKey form-control" name="endpoint[${num}][apiKey]" placeholder="API Key"/>
                <input title="URL Endpoint" type="text" class="apiUrl form-control" name="endpoint[${num}][url]" placeholder="URL Endpoint"/>
                <button type="button" class="btn btn-danger removeEndpoint">Remove Endpoint</button>
            `;
            lastNode.parentNode.insertBefore(newNode, lastNode.nextSibling);
        } else if (_theTarget.hasClass('filter') || _theTarget.hasClass('glyphicon-filter')) { // show/hide filter
            let _panelBody = _theTarget.closestClass('panel-heading').next();
            if (_panelBody.isVisible()) {
                _panelBody.hide();
            } else {
                _panelBody.show();
            }
        }
    });

    const numberGenerator = function (startingNumber) {
        return (function () {
            return startingNumber++;
        });
    };

    const generatePowercodeHTML = function (pc) {
        let customerHTML = `
            <div class="pcInstance panel panel-primary">
                <div class="panel-heading">
                    <h3 class="panel-title">Customers from ${pc.url}</h3>
                    <div class="pull-right">
                        <span class="clickable filter" data-toggle="tooltip" title="Toggle table filter" data-container="body">
                            <i class="glyphicon glyphicon-filter"></i>
                        </span>
                    </div>
                </div>
                <div class="panel-body">
                    <input type="text" class="filter-table form-control" id="customer-table-filter" data-action="filter" placeholder="Filter Customers" />
                </div>
        `;
        if (pc.customers.length) {
            customerHTML += `
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
            customerHTML += pc.customers.map(function eachCustomer(customer) {
                return generateCustomerHTML(customer, pc.url);
            }).join('');
            customerHTML += `
                    </tbody>
                </table>
            `;
        } else {
            customerHTML += `
                <div class="noneFound">
                    <em>None Found</em>
                </div>
            `;
        }
        customerHTML += `
            </div>
         `;

        return customerHTML;
    };

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

    let nextNumber = numberGenerator(1);

})(window);

