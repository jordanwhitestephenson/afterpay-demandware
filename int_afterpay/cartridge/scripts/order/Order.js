(function () {
    'use strict';

    //var Class = require('app_storefront_controllers/cartridge/scripts/util/Class').Class;

    function Order() {
        this.consumer = new Consumer();
        this.billing = new Address();
        this.shipping = new Address();
        //this.courier = new Courier();
        this.items = [];
        this.discounts = [];
        this.taxAmount = new Amount();
        this.totalAmount = new Amount();
        this.shippingAmount = new Amount();
        this.merchant = new Merchant();
        //this.merchantReference = '';
    }


    /*
     * Define references Model
     *
     * Hoisting functions
    */

    function Consumer() {
        this.phoneNumber = '';
        this.givenNames = '';
        this.surname = '';
        this.email = '';
    }

    function Address() {
        this.name = '';
        this.line1 = '';
        this.line2 = '';
        this.suburb = '';
        this.state = '';
        this.postcode = '';
        this.countryCode = '';
        this.phoneNumber = '';
    }

    function Courier() {
        this.shippedAt = '';
        this.name = '';
        this.tracking = '';
        this.priority = '';
    }

    function LineItem() {
        this.name = '';
        this.sku = '';
        this.quantity = '';
        this.price = new Amount();
    }

    function Discount() {
        this.displayName = '';
        this.amount = new Amount();
    }

    function Amount() {
        this.amount = '';
        this.currency = '';
    }

    function Merchant() {
        this.redirectConfirmUrl = '';
        this.redirectCancelUrl = '';
    }

    module.exports.Order = Order;
    module.exports.LineItem = LineItem;
    module.exports.Discount = Discount;
}());