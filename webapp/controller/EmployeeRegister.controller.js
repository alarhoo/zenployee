sap.ui.define([
	'sap/ui/core/mvc/Controller',
	'sap/ui/model/json/JSONModel',
	'sap/ui/model/SimpleType',
	'sap/ui/model/ValidateException',
	'sap/ui/core/Core',
	'sap/m/MessageBox',
	'sap/m/MessageToast',
	'zenployee/model/Validator',
], function (Controller, JSONModel, SimpleType, ValidateException, Core, MessageBox, MessageToast, Validator) {

	return Controller.extend('zenployee.controller.EmployeeRegister', {
		onInit: function () {
			this._wizard = this.byId('idCreateEmployeeWizard')
			this._chkAddress = this.byId('chkAddress')
			// Create new validator instance
			this._validator = new Validator()

			const oView = this.getView(),
				oMM = Core.getMessageManager()
			oView.setModel(
				new JSONModel({
					name: '',
					email: '',
				})
			)
			// JSON model for employee details
			const oEmpModel = new JSONModel({
				empID: '',
				empMail: '',
				empDOJ: '',
				empFirstName: '',
				empMidName: '',
				empLastName: '',
				empDOB: '',
				empDesignation: '',
				empProcLead: '',
				empContact: '',
				empEmergencyContact: '',
				empAddress: {
					local: {
						address: 'ok',
						region: '',
						state: '',
						country: '',
						postalCode: '',
					},
					permanent: {
						address: 'dsad',
						region: '',
						state: '',
						country: '',
						postalCode: '',
					},
				},
			})
			this.getView().setModel(oEmpModel, 'emp')

			// attach handlers for validation errors
			oMM.registerObject(oView.byId('inpEmpID'), true)
			oMM.registerObject(oView.byId('inpEmpEmail'), true)
			oMM.registerObject(oView.byId('inpEmpDoJ'), true)

			oMM.registerObject(oView.byId('inpEmpFName'), true)
			oMM.registerObject(oView.byId('inpEmpLName'), true)
		},

		_validateInput: function (oInput) {
			let sValueState = 'None'
			let bValidationError = false
			const oBinding = oInput.getBinding('value')
			try {
				oBinding.getType().validateValue(oInput.getValue())
			} catch (oException) {
				sValueState = 'Error'
				bValidationError = true
				console.error('validation error: ' + oException.message)
			}

			oInput.setValueState(sValueState)

			return bValidationError
		},

		onNameChange: function (oEvent) {
			const oInput = oEvent.getSource()
			this._validateInput(oInput)
		},

		onValidate: function () {
			const bValidated = this._validator.validate(this.byId('formPrimary'))
			if (bValidated) {
				this._wizard.validateStep(this.byId('PrimaryStep'))
			} else {
				this._wizard.invalidateStep(this.byId('PrimaryStep'))
			}
		},

		onSubmit: function () {
			// collect input controls
			const oView = this.getView(),
				aInputs = [oView.byId('nameInput'), oView.byId('emailInput')]
			let	bValidationError = false

			// Check that inputs are not empty.
			// Validation does not happen during data binding as this is only triggered by user actions.
			aInputs.forEach(function (oInput) {
				bValidationError = this._validateInput(oInput) || bValidationError
			}, this)

			if (!bValidationError) {
				MessageToast.show('The input is validated. Your form has been submitted.')
			} else {
				MessageBox.alert('A validation error has occurred. Complete your input first.')
			}
		},

		handleChkAddressSelect: function () {
			const bSelected = this._chkAddress.getSelected()
			if (bSelected) {
				this.byId('txtAreaPermAddress').setEditable(false).bindProperty('value', 'emp>/empAddress/local/address')
				this.byId('inpPermRegion').setEditable(false).bindProperty('value', 'emp>/empAddress/local/region')
				this.byId('inpPermState').setEditable(false).bindProperty('value', 'emp>/empAddress/local/state')
				this.byId('inpPermCountry').setEditable(false).bindProperty('value', 'emp>/empAddress/local/country')
				this.byId('inpPermPostCode').setEditable(false).bindProperty('value', 'emp>/empAddress/local/postalCode')
			} else {
				const oAddress = this.byId('txtAreaPermAddress')
				oAddress.setEditable(true)
				oAddress.bindProperty('value', 'emp>/empAddress/permanent/address')
				const oRegion = this.byId('inpPermRegion')
				oRegion.setEditable(true)
				oRegion.bindProperty('value', 'emp>/empAddress/permanent/region')
				const oState = this.byId('inpPermState')
				oState.setEditable(true)
				oState.bindProperty('value', 'emp>/empAddress/permanent/state')
				const oCountry = this.byId('inpPermCountry')
				oCountry.setEditable(true)
				oCountry.bindProperty('value', 'emp>/empAddress/permanent/country')
				const oPostalCode = this.byId('inpPermPostCode')
				oPostalCode.setEditable(true)
				oPostalCode.bindProperty('value', 'emp>/empAddress/permanent/postalCode')
			}
		},

		/**
       * Custom model type for validating an E-Mail address
       * @class
       * @extends sap.ui.model.SimpleType
       */
		customEMailType: SimpleType.extend('email', {
			formatValue: function (oValue) {
				return oValue
			},

			parseValue: function (oValue) {
				//parsing step takes place before validating step, value could be altered here
				return oValue
			},

			validateValue: function (oValue) {
				// The following Regex is only used for demonstration purposes and does not cover all variations of email addresses.
				// It's always better to validate an address by simply sending an e-mail to it.
				const rexMail = /^\w+[\w-+\.]*\@utegration.com$/
				if (!oValue.match(rexMail)) {
					throw new ValidateException('\'' + oValue + '\' is not a valid e-mail address')
				}
			},
		}),
	})
})
