sap.ui.define([
	'./BaseController'
], function (Controller) {

	return Controller.extend('zenployee.controller.FlexibleColumnLayout', {
		onInit: function () {
			this.getRouter().attachRouteMatched(this._onRouteMatched, this)
			this.getRouter().attachBeforeRouteMatched(this._onBeforeRouteMatched, this)
		},

		_onBeforeRouteMatched: function (oEvent) {
			const oModel = this.getOwnerComponent().getModel()
			let sLayout = oEvent.getParameters().arguments.layout
			// If there is no layout parameter, query for the default level 0 layout (normally OneColumn)
			if (!sLayout) {
				const oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(0)
				sLayout = oNextUIState.layout
			}
			// Update the layout of the FlexibleColumnLayout
			if (sLayout) {
				oModel.setProperty('/layout', sLayout)
			}
		},

		_onRouteMatched: function (oEvent) {
			const sRouteName = oEvent.getParameter('name'),
				oArguments = oEvent.getParameter('arguments')
			this._updateUIElements()
			// Save the current route name
			this.currentRouteName = sRouteName
			this.currentEmployee = oArguments.employee
			this.currentSupplier = oArguments.supplier
		},

		onStateChanged: function (oEvent) {
			const bIsNavigationArrow = oEvent.getParameter('isNavigationArrow'),
				sLayout = oEvent.getParameter('layout')
			this._updateUIElements()
			// Replace the URL with the new layout if a navigation arrow was used
			if (bIsNavigationArrow) {
				this.getRouter().navTo(
					this.currentRouteName,
					{
						layout: sLayout,
						employee: this.currentEmployee,
						supplier: this.currentSupplier,
					}
				)
			}
		},

		// Update the close/fullscreen buttons visibility
		_updateUIElements: function () {
			const oModel = this.getOwnerComponent().getModel()
			const oUIState = this.getOwnerComponent().getHelper().getCurrentUIState()
			oModel.setData(oUIState)
		},

		onExit: function () {
			this.getRouter().detachRouteMatched(this._onRouteMatched, this)
			this.getRouter().detachBeforeRouteMatched(this._onBeforeRouteMatched, this)
		},
	})
})
