sap.ui.define(
  ['sap/ui/core/mvc/Controller'],
  function (Controller) {
    'use strict'

    return Controller.extend('zenployee.controller.EmployeeDetail', {
      onInit: function () {
        this.oRouter = this.getOwnerComponent().getRouter()
        this.oModel = this.getOwnerComponent().getModel()

        this.oRouter.getRoute('EmployeeDetail').attachPatternMatched(this._onEmployeeMatched, this)
      },
      handleFullScreen: function () {
        var sNextLayout = this.oModel.getProperty('/actionButtonsInfo/midColumn/fullScreen')
        // console.log(this.oModel, sNextLayout);
        this.oRouter.navTo('EmployeeDetail', {
          layout: sNextLayout,
          employee: this._employee,
        })
      },
      handleExitFullScreen: function () {
        var sNextLayout = this.oModel.getProperty('/actionButtonsInfo/midColumn/exitFullScreen')
        this.oRouter.navTo('EmployeeDetail', {
          layout: sNextLayout,
          employee: this._employee,
        })
      },
      handleClose: function () {
        var sNextLayout = this.oModel.getProperty('/actionButtonsInfo/midColumn/closeColumn')
        this.oRouter.navTo('EmployeeMaster', {
          layout: sNextLayout,
        })
      },
      _onEmployeeMatched: function (oEvent) {
        this._employee = oEvent.getParameter('arguments').employee || this._employee || '0'
        this.getView().bindElement({
          path: '/' + this._employee,
          model: 'emp',
        })
      },

      handleTelPress: function (evt) {
        sap.m.URLHelper.triggerTel(this.byId('empTel').getText())
      },

      handleSmsPress: function (evt) {
        sap.m.URLHelper.triggerSms(this._getVal(evt))
      },

      handleEmailPress: function (evt) {
        sap.m.URLHelper.triggerEmail(this.byId('empEmail').getText(), 'Info Request')
      },
    })
  },
  true
)
