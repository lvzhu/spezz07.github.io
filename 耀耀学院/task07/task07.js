(function () {
    function $(selector, context) {
        if (context) {
            return context.querySelector(selector);
        }
        return document.querySelector(selector);
    }



})();
