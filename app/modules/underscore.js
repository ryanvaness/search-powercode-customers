let __ = function (selector) {
    this.element = (typeof selector === "string") ? document.getElementById(selector) : selector;
};

__.prototype = {
    get: function () {
        return this.element;
    },

    closestClass: function(elemClass) {
        let element = this.element;
        while (element.parentNode) {
            element = element.parentNode;
            if (element.classList.contains(elemClass)) {
                break;
            }
        }
        return element;
    },

    remove: function() {
        this.element.parentNode.removeChild(this);
    },

    show: function() {
        this.element.style.display = "";
    },

    hide: function() {
        this.element.style.display = 'none';
    },

    isVisible: function() {
        return (this.element.offsetWidth > 0 && this.element.offsetHeight > 0);
    },

    hasClass: function(elemClass) {
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

};
let _ = function(select) {return new __(select)};
export default _;