sap.ui.define(
  ['sap/ui/core/mvc/Controller', 'sap/m/MessageToast', 'sap/ui/model/json/JSONModel'],
  function (Controller, MessageToast, JSONModel) {
    'use strict'

    return Controller.extend('zenployee.controller.Login', {
      onInit: function () {
        this.oView = this.getView()

        this.oView.setModel(
          new JSONModel({
            name: '',
            email: '',
          })
        )

        // attach handlers for validation errors
        sap.ui.getCore().getMessageManager().registerObject(this.oView.byId('password'), true)
        sap.ui.getCore().getMessageManager().registerObject(this.oView.byId('username'), true)
      },
      validateEmail: function () {
        var email = this.getView().byId('username').getValue()
        var mailregex = /^\w+[\w-+\.]*\@\w+([-\.]\w+)*\.[a-zA-Z]{2,}$/
        if (!mailregex.test(email)) {
          // alert(email + " is not a valid email address");
          var msg = email + ' is not a valid email address'
          MessageToast.show(msg)
          this.getView().byId('username').setValueState(sap.ui.core.ValueState.Error)
        }
      },
      onPressLogin: function () {
        var oRouter = sap.ui.core.UIComponent.getRouterFor(this)
        oRouter.navTo('Home')
      },
    })
  }
)
