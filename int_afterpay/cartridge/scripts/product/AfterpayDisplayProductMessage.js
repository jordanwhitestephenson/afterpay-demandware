
var Money = require("dw/value/Money");
var Web = require("dw/web/Resource");
var URLUtils = require("dw/web/URLUtils");
var AfterpayUtilities = require("~/cartridge/scripts/util/AfterpayUtilities.js")

var AfterpayDisplayProductMessage = {
    getMessage : function (isPDPPage, price : dw.value.Money) {

        if (empty(isPDPPage) || empty(price) || !(price instanceof dw.value.Money) || !isApplicable(price)) {
            return null;
        }

        if (isDisplayMessage(isPDPPage)) {
            return getMessage(price);
        }
    },

    getPDPMessage : function (price : dw.value.Money) {
        return this.getMessage(true, price);
    },

    getPLPMessage : function (price : dw.value.Money) {
        return this.getMessage(false, price);
    }
};

var isApplicable = function (price : dw.value.Money) {
	var paymentMethod = AfterpayUtilities.getAfterpayCheckoutUtilities().getPaymentMethod();
	var isApplicable = paymentMethod.isApplicable(null, null, price.value);
	return paymentMethod.isApplicable(null, null, price.value);
}

var isDisplayMessage = function (isPDPPage : Boolean) {

    var sitePreferenceUtilities = AfterpayUtilities.getSitePreferencesUtilities();
    var displayPreference = null;

    displayPreference = isPDPPage ? sitePreferenceUtilities.isDisplayPdpInfo() : sitePreferenceUtilities.isDisplayPlpInfo();

    return !empty(displayPreference) ? displayPreference : false;
};

var getMessage = function (price : dw.value.Money) {
    var price4 = getPrice(price);
    return Web.msgf('afterpay.pbi.text','afterpay', null, dw.util.StringUtils.formatMoney(price4), URLUtils.url('Page-Show', 'cid', 'afterpay-product-page'), URLUtils.staticURL('/images/afterpay-logo.png'));
};

var getPrice = function (price : dw.value.Money) {
    return new dw.value.Money(Math.ceil(price.divide(4).value * 100) / 100, price.getCurrencyCode());
};

module.exports = AfterpayDisplayProductMessage;