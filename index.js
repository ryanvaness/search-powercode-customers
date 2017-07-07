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
            url: 'file.php',
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
        }).catch(function (e) {
            console.error('ERROR', e);
        });
        return false;
    };

    document.body.addEventListener('click', function delegateClick(e) {
        const theTarget = e.target;

        if (_(theTarget).hasClass('removeEndpoint')) {
            _(theTarget).closestClass('endpoint').remove();
        } else if (theTarget.id === 'addEndpoint') {
            let allNodes = document.getElementsByClassName('endpoint'),
                lastNode = allNodes[allNodes.length - 1],
                num = nextNumber(),
                newNode = document.createElement('div');

            newNode.className = 'endpoint form-group';
            newNode.innerHTML = `
                <input title="API Key" type="text" class="apiKey" name="endpoint[${num}][apiKey]" placeholder="API Key"/>
                <input title="URL Endpoint" type="text" class="apiUrl" name="endpoint[${num}][url]" placeholder="URL Endpoint"/>
                <button type="button" class="btn btn-danger removeEndpoint">Remove Endpoint</button>
            `;
            lastNode.parentNode.insertBefore(newNode, lastNode.nextSibling);
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
                    <input type="text" class="form-control" id="customer-table-filter" data-action="filter" data-filters="#customer-table" placeholder="Filter Customers" />
                </div>
        `;
        if (pc.customers.length) {
            customerHTML += `
                <table class="table table-hover" id="customer-table">
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

