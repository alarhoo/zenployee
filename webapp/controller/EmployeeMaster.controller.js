sap.ui.define([
	'./BaseController',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/Filter',
	'sap/ui/model/FilterOperator'
], function (Controller, JSONModel, Filter, FilterOperator) {

	const className = 'zenployee.controller.EmployeeMaster'
	const _Controller = Controller.extend(className, {
		constructor: function () {},
	})

	_Controller.prototype.onInit = function () {}

	_Controller.prototype.onListItemPress = function () {
		const nextUIState = this.getOwnerComponent().getHelper().getNextUIState(1)
		const path = event.getSource().getBindingContext('emp').getPath()
		const employee = path.split('/').slice(-1).pop()

		this.getRouter().navTo('EmployeeDetail', {
			layout: nextUIState.layout,
			employee: employee,
		})

		const item = event.getSource()
		item.setNavigated(true)
		const parent = item.getParent()
		this._selectedIndex = parent.indexOfItem(item)
	}

	_Controller.prototype.onSearch = function (event) {
		let tableSearchState = []
		const query = event.getParameter('query')

		if (query && query.length > 0) {
			tableSearchState = [new Filter('emp_main_first', FilterOperator.Contains, query)]
		}

		this.getView().byId('employeeTable').getBinding('items').filter(tableSearchState, 'Application')
	}

	return _Controller
})
