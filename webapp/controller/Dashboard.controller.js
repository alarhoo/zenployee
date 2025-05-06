sap.ui.define(['sap/ui/core/mvc/Controller'], function (Controller) {
  'use strict'
  var oRouter
  return Controller.extend('zenployee.controller.Dashboard', {
    onInit: function () {
      oRouter = sap.ui.core.UIComponent.getRouterFor(this)
    },

    onPressHR: function () {
      // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo('ToolpageLayout')
    },

    onPressAdmin: function () {
      // var oRouter = sap.ui.core.UIComponent.getRouterFor(this);
      oRouter.navTo('ToolpageLayout')
    },
  })
})
