sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/core/Fragment',
], function (Controller, Fragment) {

	return Controller.extend('zenployee.controller.App', {
		onInit: function () {},

		onShellBarNotificationsPressed (oEvent) {
			const oButton = oEvent.getParameter('button'),
				oView = this.getView()

			// create popover
			if (!this._pPopover) {
				this._pPopover = Fragment.load({
					id: oView.getId(),
					name: 'zenployee.fragments.Notifications',
					controller: this
				}).then(function (oPopover) {
					oView.addDependent(oPopover)
					oPopover.bindElement('/')
					return oPopover
				})
			}
			this._pPopover.then(function (oPopover) {
				oPopover.openBy(oButton)
			})
		},
	})
})
