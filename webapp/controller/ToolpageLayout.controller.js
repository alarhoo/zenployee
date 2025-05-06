sap.ui.define(
  [
    './BaseController',
    'sap/ui/core/Fragment',
    'sap/ui/core/mvc/Controller',
    'sap/ui/model/json/JSONModel',
    'sap/m/ResponsivePopover',
    'sap/m/MessagePopover',
    'sap/m/ActionSheet',
    'sap/m/Button',
    'sap/m/Link',
    'sap/m/Bar',
    'sap/ui/layout/VerticalLayout',
    'sap/m/NotificationListItem',
    'sap/m/MessagePopoverItem',
    'sap/ui/core/CustomData',
    'sap/m/MessageToast',
    'sap/ui/Device',
    'sap/ui/core/syncStyleClass',
    'sap/m/library',
  ],
  function (
    BaseController,
    Fragment,
    Controller,
    JSONModel,
    ResponsivePopover,
    MessagePopover,
    ActionSheet,
    Button,
    Link,
    Bar,
    VerticalLayout,
    NotificationListItem,
    MessagePopoverItem,
    CustomData,
    MessageToast,
    Device,
    syncStyleClass,
    mobileLibrary
  ) {
    'use strict'
    return BaseController.extend('zenployee.controller.ToolpageLayout', {
      _bExpanded: true,

      onInit: function () {
        this.getView().addStyleClass(this.getOwnerComponent().getContentDensityClass())

        // if the app starts on desktop devices with small or meduim screen size, collaps the sid navigation
        if (Device.resize.width <= 1024) {
          this.onButtonSideNavPress()
        }

        Device.media.attachHandler(
          function (oDevice) {
            if ((oDevice.name === 'Tablet' && this._bExpanded) || oDevice.name === 'Desktop') {
              this.onButtonSideNavPress()
              // set the _bExpanded to false on tablet devices
              // extending and collapsing of side navigation should be done when resizing from
              // desktop to tablet screen sizes)
              this._bExpanded = oDevice.name === 'Desktop'
            }
          }.bind(this)
        )

        this.getRouter().attachRouteMatched(this.onRouteChange.bind(this))
      },

      onRouteChange: function (oEvent) {
        this.getModel('side').setProperty('/selectedKey', oEvent.getParameter('name'))

        if (Device.system.phone) {
          this.onButtonSideNavPress()
        }
      },

      onButtonSideNavPress: function () {
        var oToolPage = this.byId('idToolPage')
        var bSideExpanded = oToolPage.getSideExpanded()
        this._setToggleButtonTooltip(bSideExpanded)
        oToolPage.setSideExpanded(!oToolPage.getSideExpanded())
      },

      _setToggleButtonTooltip: function (bSideExpanded) {
        var oToggleButton = this.byId('idSideNavigationToggleButton')
        this.getBundleText(bSideExpanded ? 'expandMenuButtonText' : 'collpaseMenuButtonText').then(function (
          sTooltipText
        ) {
          oToggleButton.setTooltip(sTooltipText)
        })
      },

      handleThemeSwitch: function (oEvt) {
        // var sTheme = oEvt.getParameters().item.getKey();
        var sTheme = oEvt.getSource().getKey()
        sap.ui.getCore().applyTheme(sTheme)
      },
      /**
       * Returns a promises which resolves with the resource bundle value of the given key <code>sI18nKey</code>
       *
       * @public
       * @param {string} sI18nKey The key
       * @param {string[]} [aPlaceholderValues] The values which will repalce the placeholders in the i18n value
       * @returns {Promise<string>} The promise
       */
      getBundleText: function (sI18nKey, aPlaceholderValues) {
        return this.getBundleTextByModel(sI18nKey, this.getOwnerComponent().getModel('i18n'), aPlaceholderValues)
      },
    })
  }
)
