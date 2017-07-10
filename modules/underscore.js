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

    find: function (selector) {
        return new __(this.element.querySelectorAll(selector));
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
        for (let elem of this.get()) {
            elem.addEventListener('keyup', function handleKeyUp() {
                let _this = _(this),
                    search = _this.get().value.toLowerCase(),
                    _target = _this.closestClass('panel-body').next(),
                    _rows = _target.find('tbody tr');

                if (search === '') {
                    _rows.show();
                } else {
                    for (let row of _rows.get()) {
                        row.innerText.toLowerCase().indexOf(search) === -1 ? _(row).hide() : _(row).show();
                    }
                }
            });
        }
    }

};
let _ = function (select) {
    return new __(select)
};
export default _;