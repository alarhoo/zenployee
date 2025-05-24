sap.ui.define([
	'./BaseController'
], function (Controller) {

	const className = 'zenployee.controller.Dashboard'
	const _Controller = Controller.extend(className, {
		constructor: function () {}
	})

	_Controller.prototype.onPressHR= function () {
		this.getRouter().navTo('ToolpageLayout')
	}

	_Controller.prototype.onPressAdmin= function () {
		this.getRouter().navTo('ToolpageLayout')
	}

	return _Controller
})
