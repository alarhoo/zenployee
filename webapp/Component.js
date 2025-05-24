sap.ui.define([
	'sap/ui/core/UIComponent',
	'sap/ui/model/json/JSONModel',
	'sap/ui/Device',
	'./model/models',
	'sap/f/library',
	'sap/ui/core/routing/History',
	'sap/ui/model/resource/ResourceModel',
	'sap/f/FlexibleColumnLayoutSemanticHelper',
], function (UIComponent, JSONModel, Device, models, library, History, ResourceModel, FlexibleColumnLayoutSemanticHelper) {
	const LayoutType = library.LayoutType

	return UIComponent.extend('zenployee.Component', {
		metadata: {
			manifest: 'json',
		},

		init: function () {
			// call the base component's init function
			UIComponent.prototype.init.apply(this, arguments)

			const oModel = new JSONModel()
			this.setModel(oModel)

			// enable routing
			this.getRouter().initialize()

			// set the device model
			this.setModel(models.createDeviceModel(), 'device')
		},

		navBack: function () {
			const oHistory = History.getInstance()
			const oPrevHash = oHistory.getPreviousHash()
			if (oPrevHash !== undefined) {
				window.history.go(-1)
			} else {
				this.getRouter().navTo('Home', {})
			}
		},

		getContentDensityClass: function () {
			if (!this._sContentDensityClass) {
				if (!sap.ui.Device.support.touch) {
					this._sContentDensityClass = 'sapUiSizeCompact'
				} else {
					this._sContentDensityClass = 'sapUiSizeCozy'
				}
			}
			return this._sContentDensityClass
		},

		getHelper: function () {
			return this.getFcl().then(function (oFCL) {
				// eslint-disable-next-line new-cap
				const params = URLSearchParams(location.search)
				const settings = {
					defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
					defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
					initialColumnsCount: 2,
					mode: params.get('mode'),
					maxColumnsCount: params.get('max'),
				}
				return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, settings)
			})
		},

		getFcl: function () {
			return new Promise(
				function (resolve) {
					const oFCL = this.getRootControl().byId('flexibleColumnLayout')
					if (!oFCL) {
						this.getRootControl().attachAfterInit(function (oEvent) {
							resolve(oEvent.getSource().byId('flexibleColumnLayout'))
						}, this)
						return
					}
					resolve(oFCL)
				}.bind(this)
			)
		},
	})
})
