/* jshint unused: false */

import Ember from 'ember';

const { Component, computed, inject: { service }, $ } = Ember;

export default Component.extend({

  firebaseApp: service(),
  storageRef: '',
  file: '',

  classNames: ['new-form'],

  types: ['STCW', 'Passport', 'Medical', 'Endorsement', 'Other'],

  progress: 0,

  progressValue: computed.alias('progress'),

  formattedProgressValue: computed('progressValue', function() {
    return `${(this.get('progressValue') * 100).toFixed(0)}%`;
  }),

  expiryDateAfterIssueDate: computed('certificate.issueDate', 'certificate.expiryDate', function() {
    if (this.get('certificate.expiryDate') === '' || this.get('certificate.expiryDate') === 'n/a') {
      return true;
    } else {
      return (this._toJSDate(this.get('certificate.issueDate')) <
      this._toJSDate(this.get('certificate.expiryDate')));
    }
  }),

  correctDates: computed('certificate.issueDate', 'certificate.expiryDate', function() {
    const issueDateYear = this.get('certificate.issueDate').split("-")[0];

    if (this.get('certificate.expiryDate') === '' || this.get('certificate.expiryDate') === 'n/a') {
      return this._yearWithinRange(issueDateYear);
    } else {
      const expiryDateYear = this.get('certificate.expiryDate').split("-")[0];
      return (this._yearWithinRange(issueDateYear) && this._yearWithinRange(expiryDateYear));
    }
  }),

  datesValid: computed.and('expiryDateAfterIssueDate', 'correctDates'),

  dateValidation: [{
    message: 'Please provide date in a valid format (years range 1950-2099)',
    validate: (inputValue) => {
      let datePattern = /(19[5-9]\d|20[0-9]\d|2090)[/\-][0-1][1-2][/\-][0-2]?[0-9]|[3]?[0-1]/;
      return datePattern.test(inputValue);
    }
  }],

  isValid: computed.and('certificate.isValid', 'datesValid'),

  isInvalid: computed.not('isValid'),

  actions: {
    saveCertificate(certificate) {
      if (this.get('certificate.expiryDate') === '') {
        this.set('certificate.expiryDate', 'n/a');
      }
      this.sendAction('action', certificate);
    },

    didSelectImage(files) {
      const certificate = this.get('certificate');
      const certificateId = certificate.get('id');
      const userId = this.get('session.currentUser.uid');
      const reader = new FileReader();
      const component = this;
      component.set('uploadInProgress', true);

      reader.readAsDataURL(files[0]);
      this.set('file', files[0]);
      const file = this.get('file');
      const fileExtension = file.name.slice(file.name.lastIndexOf('.') + 1).toLowerCase();
      const metadata = {
        contentType: file.type,
      };
      const storageRef = this.get('firebaseApp').storage().ref();
      const path = `${userId}/certificates/${certificateId}.${fileExtension}`;

      const uploadTask = storageRef.child(path).put(file, metadata);

      uploadTask.on('state_changed', (snapshot) => {
        component.set('progress', (snapshot.bytesTransferred / snapshot.totalBytes));
      }, function(error) {
      }, function() {
        component.set('uploadInProgress', false);
        $('.upload-successful').show(1000);
      });
    },
  },

  _toJSDate(dateString) {
    const [year, month, day] = dateString.split("-");
    return new Date(year, month - 1, day);
  },

  _yearWithinRange(year) {
    return (year <= 2100 && year >= 1950);
  }
});
