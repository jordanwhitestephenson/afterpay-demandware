'use strict';

function initSubmitOrderEvent() {
    var $declined = $('.ap-declined'),
        $form = $('.submit-order'),
        $submitButton = $('.order-summary-footer .submit-order .button-fancy-large');

    if ($declined.length > 0) {
        $form.on('submit', function (e) {
            e.preventDefault();
            window.location = window.Urls.billing;
        });
    } else {
        $form.off('submit').on('submit', function (e) {
            $submitButton.attr('disabled', 'disabled');
            return true;
        });
    }
}

module.exports.initSubmitOrderEvent = function () {
    initSubmitOrderEvent();
};