'use strict';
const axios = require('axios');

(function(axios){

    document.getElementById('searchForm').onsubmit = function handleSubmission(e) {
        axios({
            method: 'post',
            url: 'file.php',
            data: new FormData(e.target),
            headers: {'X-Requested-With': 'XMLHttpRequest'},
            responseType: 'json'
        }).then(function (response) {
            let customerHTML = '';
            response.data.forEach(function eachPowercode(pc) {
                if (pc.statusCode !== 0) {
                    throw new PCError(pc);
                }
                customerHTML += `
                    <div class="pcInstance">
                        <h2>Customers From ${pc.url}</h2>
                `;
                if (pc.customers.length) {
                    customerHTML += pc.customers.map(function eachCustomer(customer) {
                        return generateCustomerHTML(customer, pc.url);
                    }).join('');
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

            });
            document.getElementById('customers').innerHTML= customerHTML.replace(/(^|\n)\s*/g, '');
        }).catch(function (e) {
            switch (e.constructor) {
                case PCError:
                    console.log(e.message);
                    break;
                default:
                    console.log('ERROR', e);
                    break;
            }
        });
        return false;
    };

    document.body.addEventListener('click', function delegateClick(e) {
        const theTarget = e.target;

        if (theTarget.classList.contains('removeEndpoint')) {
            theTarget.closestClass('endpoint').remove();
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
            console.log('derp');
            lastNode.parentNode.insertBefore(newNode, lastNode.nextSibling);
        }
    });

    const numberGenerator = function(startingNumber) {
        return (function () {
            return startingNumber++;
        });
    };

    const generateCustomerHTML = function(customer, url) {
        return `
            <div class="customer">
                ${customer.CustomerID}<br>
                <a href="${url}/index.php?q&page=/customers/_view.php&customerid=${customer.CustomerID}" target="_blank">${customer.CompanyName}</a><br>
                ${customer.Address1}<br>
                ${customer.City}<br>
                <hr/>
            </div>
        `;
    };

    function PCError(pcInstance) {
        this.statusCode = pcInstance.statusCode;
        this.message = pcInstance.message;
    }

    let nextNumber = numberGenerator(1);

    HTMLElement.prototype.closestClass = function(elemClass) {
        let element = this;
        while (element.parentNode) {
            element = element.parentNode;
            if (element.classList.contains(elemClass)) {
                break;
            }
        }
        return element;
    };

    HTMLElement.prototype.remove = function() {
        this.parentNode.removeChild(this);
    };

})(axios);

