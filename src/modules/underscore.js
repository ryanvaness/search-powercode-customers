import { debounce } from './utilities';
let __ = function (selector) {
    this.element = (typeof selector === "string") ? document.getElementById(selector) : selector;
};

__.prototype = {
    get: function () {
        return this.element;
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

    show: function () {
        if (this.element.length > 1) {
            for (let elem of this.get()) {
                elem.style.display = '';
                if (!_(elem).isVisible()) {
                    this.element.style.display = "block";
                }
            }
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
            let _this   = _(this),
                filter  = _this.get().value.toLowerCase(),
                _target = _this.closestClass('panel-body').next(),
                _tBody   = _target.findOne('tbody'),
                _rows   = _tBody.findAll('tr');

            if (filter === '') {
                _rows.show();
                _tBody.findOne('.search-sf').hide();
            } else {
                let anyAreVisible = false;
                for (let row of _rows.get()) {
                    row.innerText.toLowerCase().indexOf(filter) === -1 ? _(row).hide() : _(row).show();
                    if (_(row).isVisible() && !_(row).hasClass('search-sf')) {
                        anyAreVisible = true;
                    }
                }
                _tBody.findOne('.search-sf').hide();
                if (!anyAreVisible) {
                    _tBody.findOne('.search-sf').show();
                }
            }
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