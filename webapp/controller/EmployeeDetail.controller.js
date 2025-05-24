sap.ui.define([
	'./BaseController'
], function (Controller) {

	const className = 'zenployee.controller.EmployeeDetail'
	const _Controller = Controller.extend(className, {
		constructor: function () {}
	})

	_Controller.prototype.onInit = function () {
		this.getRouter().getRoute('EmployeeDetail').attachPatternMatched(this._onEmployeeMatched, this)
	}

	_Controller.prototype.handleFullScreen = function () {
		const sNextLayout = this.oModel.getProperty('/actionButtonsInfo/midColumn/fullScreen')
		// console.log(this.oModel, sNextLayout);
		this.getRouter().navTo('EmployeeDetail', {
			layout: sNextLayout,
			employee: this._employee,
		})
	}

	_Controller.prototype.handleExitFullScreen = function () {
		const sNextLayout = this.oModel.getProperty('/actionButtonsInfo/midColumn/exitFullScreen')
		this.getRouter().navTo('EmployeeDetail', {
			layout: sNextLayout,
			employee: this._employee,
		})
	}

	_Controller.prototype.handleClose = function () {
		const sNextLayout = this.oModel.getProperty('/actionButtonsInfo/midColumn/closeColumn')
		this.getRouter().navTo('EmployeeMaster', {
			layout: sNextLayout,
		})
	}

	_Controller.prototype._onEmployeeMatched = function (oEvent) {
		this._employee = oEvent.getParameter('arguments').employee || this._employee || '0'
		this.getView().bindElement({
			path: '/' + this._employee,
			model: 'emp',
		})
	}

	_Controller.prototype.handleTelPress = function () {
		sap.m.URLHelper.triggerTel(this.byId('empTel').getText())
	}

	_Controller.prototype.handleSmsPress = function (evt) {
		sap.m.URLHelper.triggerSms(this._getVal(evt))
	}

	_Controller.prototype.handleEmailPress = function () {
		sap.m.URLHelper.triggerEmail(this.byId('empEmail').getText(), 'Info Request')
	}

	return _Controller
})
