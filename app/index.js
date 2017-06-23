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
            console.log(response);
            let customerHTML = '';
            response.data.forEach(function eachPowercode(pc, i) {
                for (let j = 0; j < pc.customers.length; j++) {
                    let customer = pc.customers[j];
                    customerHTML += `
                        <div class="customer">
                            ${customer.CustomerID}<br>
                            ${customer.CompanyName}<br>
                            ${customer.Address1}<br>
                            ${customer.City}<br>
                            <hr/>
                        </div>
                    `.replace(/(^|\n)\s*/g, '');
                }
            });
            document.getElementById('customers').innerHTML= customerHTML;
        }).catch(function (error) {
            console.log('ERROR', error);
        });
        return false;
    };

    document.body.addEventListener('click', function delegateClick(e) {
        const theTarget = e.target;

        if (theTarget.classList.contains('removeEndpoint')) {
            let element = theTarget;
            while (element.parentNode) {
                element = element.parentNode;
                if (element.classList.contains('endpoint')) {
                    break;
                }
            }
            element.parentNode.removeChild(element);
        } else if (theTarget.id === 'addEndpoint') {
            let allNodes = document.getElementsByClassName('endpoint'),
                lastNode = allNodes[allNodes.length - 1],
                num = nextNumber(),
                newNode = document.createElement('div');

            newNode.className = 'endpoint';
            newNode.innerHTML = `
                    <input title="API Key" type="text" class="apiKey" name="endpoint[${num}][apiKey]" placeholder="API Key"/>
                    <input title="URL Endpoint" type="text" class="apiUrl" name="endpoint[${num}][url]" placeholder="URL Endpoint"/>
                    <button type="button" class="removeEndpoint">Remove Endpoint</button>
                `;
            lastNode.parentNode.insertBefore(newNode, lastNode.nextSibling);
        }
    });

    const numberGenerator = function(startingNumber) {
        return (function () {
            return startingNumber++;;
        });
    };

    var nextNumber = numberGenerator(1);

})(axios);

