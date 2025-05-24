sap.ui.define([
	'sap/ui/model/json/JSONModel',
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function (JSONModel, Controller, Filter, FilterOperator) {

	return Controller.extend('zenployee.controller.LeaveMaster', {
		onInit: function () {
			this.oRouter = this.getOwnerComponent().getRouter()
			this._bDescendingSort = false
		},
		onListItemPress: function (oEvent) {
			const oNextUIState = this.getOwnerComponent().getHelper().getNextUIState(1),
				sPath = oEvent.getSource().getBindingContext('emp').getPath(),
				employee = sPath.split('/').slice(-1).pop()
			console.log(oNextUIState, sPath, employee)
			this.oRouter.navTo('LeaveDetail', {
				layout: oNextUIState.layout,
				employee: employee,
			})

			const oItem = oEvent.getSource()
			oItem.setNavigated(true)
			const oParent = oItem.getParent()
			// store index of the item clicked, which can be used later in the columnResize event
			this.iIndex = oParent.indexOfItem(oItem)
		},
		onSearch: function (oEvent) {
			// create a filter array
			const aFilter = []
			const sQuery = oEvent.getParameter('query')
			if (sQuery) {
				aFilter.push(new Filter('emp_main_first', FilterOperator.Contains, sQuery))
			}
			const oList = this.byId('listEmployees')
			const oBinding = oList.getBinding('items')
			oBinding.filter(aFilter)
		},
	})
})
