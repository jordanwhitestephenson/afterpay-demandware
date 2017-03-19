'use strict';

/* API Includes */
var Pipeline = require('dw/system/Pipeline');
var OrderMgr = require('dw/order/OrderMgr');
var URLUtils = require('dw/web/URLUtils');

var app = require('app_storefront_controllers/cartridge/scripts/app');

function Handle(args) {
	
	// redirect to new request, the flow will not call back here.
    app.getView({
    	AfterpayRedirectUrl: dw.web.URLUtils.https("AFTERPAY-JSHandle")
    }).render('checkout/redirect.isml');
    
	var pdict = Pipeline.execute('AFTERPAY-JSHandle', {
		Basket: args.Basket
	});
	
	return {error: true};
}

function Authorize(args) {
	var pdict = Pipeline.execute('AFTERPAY_CREDIT-Authorize', {
		Order: OrderMgr.getOrder(args.OrderNo)
	});
	
	if(pdict.EndNodeName == 'authorized') {
		return {authorized: true};
	} else {
		return {
			error: true,
			PlaceOrderError: !empty(pdict.PlaceOrderError) ? pdict.PlaceOrderError : null
		};
	}
}

/*
 * Local methods
 */
exports.Handle = Handle;
exports.Authorize = Authorize;
