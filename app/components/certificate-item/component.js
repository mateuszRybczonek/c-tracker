import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['certificate'],
  classNameBindings: ['closeToExpiry'],

  firebaseApp: service(),
  storageRef: '',
  file: '',

  moment: service(),

  showPromptDialog: false,
  createdAtFormatted: format((momentComputed('certificate.createdAt')), 'YYYY-MM-DD'),
  issueDateFormatted: format((momentComputed('certificate.issueDate')), 'YYYY-MM-DD'),
  expiryDateFormatted: format((momentComputed('certificate.expiryDate')), 'YYYY-MM-DD'),

  closeToExpiry: computed.lt('daysToExpiry', 60),

  daysToExpiry: computed('certificate.expiryDate', function() {
    return Math.floor((new Date(this.get('certificate.expiryDate')) - new Date()) / (1000 * 3600 * 24));
  }),

  expiryDate: computed('certificate.expiryDate', function() {
    if (this.get('certificate.expiryDate') === 'n/a') {
      return 'n/a';
    } else {
      return this.get('expiryDateFormatted');
    }
  }),

  imageUrl: computed('certificate', 'userId', function() {
    const certificate = this.get('certificate');
    const certificateId = certificate.get('id');
    const userId = this.get('session.currentUser.uid');
    const storageRef = this.get('firebaseApp').storage().ref();
    const path = `${userId}/certificates/${certificateId}.jpg`;
    storageRef.child(path).getDownloadURL().then((url) => {
      this.set('imageUrl', url);
    }).catch(function (error) {
      // Handle any errors
    });
  }),

  actions: {

    showPrompt() {
      this.set('showPromptDialog', true);
    },

    deleteCertificate(certificate) {
      certificate.destroyRecord();
    },

    closePromptDialog() {
      this.set('showPromptDialog', false);
    },

    showModal() {
      let imagePath = this.get('imageUrl');
      $('.image-preview').attr('src', imagePath);
      $('#previewModal').modal('show');
    }
  }
});
