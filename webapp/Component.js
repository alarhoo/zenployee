sap.ui.define(
  [
    'sap/base/util/UriParameters',
    'sap/ui/core/UIComponent',
    'sap/ui/model/json/JSONModel',
    'sap/ui/Device',
    './model/models',
    'sap/f/library',
    'sap/ui/core/routing/History',
    'sap/ui/model/resource/ResourceModel',
    'sap/f/FlexibleColumnLayoutSemanticHelper',
  ],
  function (
    UriParameters,
    UIComponent,
    JSONModel,
    Device,
    models,
    library,
    History,
    ResourceModel,
    FlexibleColumnLayoutSemanticHelper
  ) {
    'use strict'
    var LayoutType = library.LayoutType

    return UIComponent.extend('zenployee.Component', {
      metadata: {
        manifest: 'json',
      },

      init: function () {
        // call the base component's init function
        UIComponent.prototype.init.apply(this, arguments)

        var oModel = new JSONModel()
        this.setModel(oModel)

        // enable routing
        this.getRouter().initialize()

        // set the device model
        this.setModel(models.createDeviceModel(), 'device')
      },

      navBack: function () {
        var oHistory = History.getInstance()
        var oPrevHash = oHistory.getPreviousHash()
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

      /**
       * Returns an instance of the semantic helper
       * @returns {sap.f.FlexibleColumnLayoutSemanticHelper} An instance of the semantic helper
       */
      getHelper: function () {
        var oView = this.getRouter().getView('zenployee.view.FlexibleColumnLayout') //Get Hold of the view that you want to access to
        var oViewID = oView.getId() //View ID
        var oFCL = sap.ui.getCore().byId(oViewID + '--' + 'flxColumnLayout'), //oViewID + "--" + "flxColumnLayout"
          oParams = UriParameters.fromQuery(location.search),
          oSettings = {
            defaultTwoColumnLayoutType: LayoutType.TwoColumnsMidExpanded,
            defaultThreeColumnLayoutType: LayoutType.ThreeColumnsMidExpanded,
            mode: oParams.get('mode'),
            maxColumnsCount: oParams.get('max'),
          }
        return FlexibleColumnLayoutSemanticHelper.getInstanceFor(oFCL, oSettings)
      },
    })
  }
)
