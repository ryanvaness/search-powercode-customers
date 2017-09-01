import { debounce } from './utilities';
let __ = function (selector) {
    this.element = (typeof selector === "string") ? document.getElementById(selector) : selector;
};

__.prototype = {
    get: function () {
        return this.element;
    },

    addClass: function (className) {
        if (this.element.length > 1) {
            Array.from(this.element).map( (elem) => {
                elem.classList.add(className);
            });
            return;
        }
        this.element.classList.add(className);
    },

    removeClass: function (className) {
        if (Array.isArray(this.element)) {
            Array.from(this.element).map( (elem) => {
                if (_(elem).hasClass(className)) {
                    elem.classList.remove(className);
                }
            });
            return;
        }

        if (this.element.classList.contains(className)) {
            this.element.classList.remove(className);
        }
    },

    closestClass: function (elemClass) {
        let elem = this.element;
        while (elem.parentNode) {
            elem = elem.parentNode;
            if (elem.classList.contains(elemClass)) {
                break;
            }
        }
        return new __(elem);
    },

    findAll: function (selector) {
        return new __(this.element.querySelectorAll(selector));
    },

    findOne: function (selector) {
        return new __(this.element.querySelector(selector));
    },

    remove: function () {
        this.element.parentNode.removeChild(this.get());
    },

    replace: function (child) {
        this.element.parentNode.replaceChild(child, this.element);
    },

    show: function () {
        if (this.element.length > 1) {
            Array.from(this.element).map( (elem) => {
                elem.style.display = '';
                if (!_(elem).isVisible()) {
                    elem.style.display = "block";
                }
            });
            return;
        }

        this.element.style.display = "";
        if (!this.isVisible()) {
            this.element.style.display = "block";
        }
    },

    hide: function () {
        if (this.element.length > 1) {
            for (let elem of this.get()) {
                elem.style.display = 'none';
            }
            return;
        }
        this.element.style.display = 'none';
    },

    isVisible: function () {
        return (this.element.offsetWidth > 0 && this.element.offsetHeight > 0);
    },

    hasClass: function (elemClass) {
        return this.element.classList.contains(elemClass);
    },

    ready: function (handler) {
        function domReady() {
            document.removeEventListener("DOMContentLoaded", domReady, false);
            handler();
        }

        document.addEventListener("DOMContentLoaded", domReady, false);
        return this;
    },

    html: function (htmlString = '') {
        this.element.innerHTML = htmlString;
    },

    next: function () {
        if (this.element && this.element.nodeType) {
            let elem = this.element.nextSibling;
            while (elem && elem.nodeType != 1) {
                elem = elem.nextSibling;
            }
            return new __(elem);
        }
        return null;
    },

    prev: function () {
        if (this.element && this.element.nodeType) {
            let elem = this.element.previousSibling;
            while (elem && elem.nodeType != 1) {
                elem = elem.previousSibling;
            }
            return new __(elem);
        }
        return null;
    },

    filterTable: function () {
        let handleKeyUp = debounce(function handleKeyUp() {
            let fragTBody  = document.createDocumentFragment(),
                _this      = _(this),
                filterFor  = _this.get().value.toLowerCase(),
                _tBody     = _this.closestClass('panel-body').next().findOne('tbody'),
                rows       = _tBody.get().querySelectorAll('tr');


            Array.from(rows).map(function putRowsInFrag(row) {
                fragTBody.appendChild(row);
            });

            let rowsFound = Array.from(fragTBody.querySelectorAll('tr')).filter(function filterRows(row) {
                _(row).addClass('hidden');
                if (!filterFor.length) {
                    return true;
                }
                return row.innerText.toLowerCase().indexOf(filterFor) > -1 && !_(row).hasClass('search-sf');
            });

            if (rowsFound.length) {
                _(rowsFound).removeClass('hidden');
            } else {
                _(fragTBody.querySelector('.search-sf')).removeClass('hidden');
            }
            let newTBody = document.createElement('tbody');
            newTBody.appendChild(fragTBody);

            _tBody.replace(newTBody);

        }, 250);
        for (let elem of this.get()) {
            elem.addEventListener('keyup', handleKeyUp);
        }
    }

};
let _ = function (select) {
    return new __(select)
};
export default _;