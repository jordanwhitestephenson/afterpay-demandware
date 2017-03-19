'use strict';

var Class = require('app_storefront_controllers/cartridge/scripts/util/Class').Class;
var Site = require('dw/system/Site');

var createAfterpayWebServiceUtilities = Class.extend({

    setSASAuthorization: function (svc : dw.svc.Service) {
        var apMerchantID = svc.configuration.credential.user || '';
        var apMerchantKey = svc.configuration.credential.password || '';
        var auth : String = [apMerchantID, apMerchantKey].join(':');
        var authCodeByte = dw.util.Bytes(auth);
        var authCode = 'Basic ' + dw.crypto.Encoding.toBase64(authCodeByte);

        svc.setAuthentication('BASIC');
        svc.addHeader('Authorization', authCode);
    }
});

var getAfterpayWebServiceUtilities = function() {
	var AfterpayWebServiceUtilities = createAfterpayWebServiceUtilities;
	return new AfterpayWebServiceUtilities();
}

module.exports.getAfterpayWebServiceUtilities = getAfterpayWebServiceUtilities;

// Checkout Utilities
var createAfterpayCheckoutUtilities = Class.extend({
	
	PAYMENT_MODE : require("~/cartridge/scripts/util/AfterpayConstants.js").PAYMENT_MODE,
	
	getPaymentMethod : function () {
		return dw.order.PaymentMgr.getPaymentMethod(this.PAYMENT_MODE.PAYMENT_METHOD);
	},
	
	getPaymentTransaction : function (lineItemCtnr : dw.order.LineItemCtnr) {
		var paymentInstrument = this.getPaymentInstrument(lineItemCtnr);
		return empty(paymentInstrument) ? null : paymentInstrument.getPaymentTransaction();
	},
	
	getPaymentInstrument : function (lineItemCtnr : dw.order.LineItemCtnr) {
		return lineItemCtnr.getPaymentInstruments(this.PAYMENT_MODE.PAYMENT_METHOD)[0]; 
	},
	
	getPaymentModeFromOrder : function (order : dw.order.Order) {
		if (empty(order)) {
			return null;
		}
		
		var paymentTransaction = this.getPaymentTransaction(order);
		return paymentTransaction.custom.apPaymentMode;
	},
	
	getPaymentMode : function (order : dw.order.Order) {
		var paymentMode = this.getPaymentModeFromOrder(order);
	   	if (empty(paymentMode)) {
	   		var sitePreferencesUtilities = getSitePreferencesUtilities();
	   	    paymentMode = sitePreferencesUtilities.getPaymentMode().value;
	   	}
	   	return paymentMode;
	}
});

var getAfterpayCheckoutUtilities = function () {
	var AfterpayCheckouttilities = createAfterpayCheckoutUtilities;
	return new AfterpayCheckouttilities();	
} 

module.exports.getAfterpayCheckoutUtilities = getAfterpayCheckoutUtilities;

// Site Preferences Utilities
var createAfterpaySitePreferencesUtilities = Class.extend({

    getRedirectConfirmUrl: function() {
        return dw.web.URLUtils.https(Site.current.preferences.custom.apRedirectConfirmUrl).toString();
    },

    getRedirectCancelUrl: function() {
        return dw.web.URLUtils.https(Site.current.preferences.custom.apRedirectCancelUrl).toString();
    },

    getPaymentMode: function() {
        return Site.current.preferences.custom.apPaymentMode;
    },
    
    getServiceName: function() {
    	return Site.current.preferences.custom.apServiceName;
    },
    
    isDisplayPdpInfo : function () {
    	return dw.system.Site.getCurrent().getCustomPreferenceValue('apDisplayPdpInfo');	
    },
    
    isDisplayPlpInfo : function () {
    	return dw.system.Site.getCurrent().getCustomPreferenceValue('apDisplayPlpInfo');	
    }
});

var getSitePreferencesUtilities = function() {
	var SitePreferences = createAfterpaySitePreferencesUtilities;
	return new SitePreferences();
};

module.exports.getSitePreferencesUtilities = getSitePreferencesUtilities;