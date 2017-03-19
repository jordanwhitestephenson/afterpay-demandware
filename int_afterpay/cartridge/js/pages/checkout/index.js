'use strict';

var address = require('sitegenesis/app_storefront_core/cartridge/js/pages/checkout/address'),
    billing = require('sitegenesis/app_storefront_core/cartridge/js/pages/checkout/billing'),
    multiship = require('sitegenesis/app_storefront_core/cartridge/js/pages/checkout/multiship'),
    shipping = require('sitegenesis/app_storefront_core/cartridge/js/pages/checkout/shipping'),
    afterpay = require('./afterpay');

exports.init = function () {
    address.init();
    if ($('.checkout-shipping').length > 0) {
        shipping.init();
    } else if ($('.checkout-multi-shipping').length > 0) {
        multiship.init();
    } else if ($('.checkout-billing').length > 0) {
        billing.init();
    } else if ($('.submit-order').length > 0) {
        afterpay.initSubmitOrderEvent();
    }

    //if on the order review page and there are products that are not available diable the submit order button
    if ($('.order-summary-footer').length > 0) {
        if ($('.notavailable').length > 0) {
            $('.order-summary-footer .submit-order .button-fancy-large').attr('disabled', 'disabled');
        }
    }
};