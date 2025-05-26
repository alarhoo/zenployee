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

	BaseController.prototype.getModel = function (model) {
		return this.getOwnerComponent().getModel(model)
	}

	BaseController.prototype.getText = function (...args) {
		return this.getOwnerComponent().getModel('i18n').getResourceBundle().getText(...args)
	}

	BaseController.prototype.getResourceBundle = function () {
		this.getOwnerComponent().getModel('i18n').getResourceBundle()
	}

	BaseController.prototype._getBundleTextByModel = function (sI18nKey, oResourceModel, aPlaceholderValues) {
		return oResourceModel.getResourceBundle().then(function (oBundle) {
			return oBundle.getText(sI18nKey, aPlaceholderValues)
		})
	}

	BaseController.prototype.getBundleText = function (sI18nKey, aPlaceholderValues) {
		return this._getBundleTextByModel(sI18nKey, this.getOwnerComponent().getModel('i18n'), aPlaceholderValues)
	}

	BaseController.prototype.onNavBack = function () {
		const history = History.getInstance()
		const previousHash = history.getPreviousHash()

		if (previousHash !== undefined) {
			window.history.go(-1)
		} else {
			this.getRouter().navTo('Home', {}, true /*no history*/)
		}
	}

	return BaseController
})
