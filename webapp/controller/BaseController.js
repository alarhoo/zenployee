sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/UIComponent',
	'sap/ui/core/routing/History',
],	function (Controller, UIComponent, History) {

	const className = 'zenployee.controller.BaseController'
	const BaseController = Controller.extend(className, {
		constructor: function () {}
	})

	BaseController.prototype.getRouter = function () {
		return UIComponent.getRouterFor(this)
	}

	BaseController.prototype.getText = function (...args) {
		return this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(...args)
	}

	BaseController.prototype.onNavBack = function () {
		const oHistory = History.getInstance()
		const sPreviousHash = oHistory.getPreviousHash()

		if (sPreviousHash !== undefined) {
			window.history.go(-1)
		} else {
			this.getRouter().navTo('appHome', {}, true /*no history*/)
		}
	}

	return BaseController
})
