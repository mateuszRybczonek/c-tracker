import Ember from 'ember';
import momentComputed from 'ember-moment/computeds/moment';
import format from 'ember-moment/computeds/format';
import { calculateDaysLeft } from 'library-app/utils/date-utils';

const { Component, computed, inject: { service }, $ } = Ember;

export default Component.extend({

  tagName: 'tr',
  classNames: ['certificate'],
  classNameBindings: ['closeToExpiry', 'expired'],

  firebaseApp: service(),
  storageRef: '',
  file: '',

  moment: service(),

  showPromptDialog: false,
  createdAtFormatted: format((momentComputed('certificate.createdAt')), 'YYYY-MM-DD'),
  issueDateFormatted: format((momentComputed('certificate.issueDate')), 'YYYY-MM-DD'),
  expiryDateFormatted: format((momentComputed('certificate.expiryDate')), 'YYYY-MM-DD'),

  closeToExpiry: computed.lt('daysToExpiry', 60),

  expired: computed.equal('daysToExpiry', 'Expired'),

  noScanPresent: computed.not('imageUrl'),

  daysToExpiry: computed('certificate.expiryDate', function() {
    if (this.get('certificate.expiryDate')) {
      return calculateDaysLeft(this.get('certificate.expiryDate'));
    }
  }),

  expiryDate: computed('certificate.expiryDate', function() {
    if (this.get('certificate.expiryDate') === 'n/a') {
      return 'n/a';
    } else {
      return this.get('expiryDateFormatted');
    }
  }),

  imagePath: computed('certificate', 'userId', function() {
    const certificateId = this.get('certificate.id');
    const userId = this.get('userId');
    return `${userId}/certificates/${certificateId}.jpg`;
  }),

  imageUrl: computed('imagePath', function() {
    const storageRef = this.get('firebaseApp').storage().ref();
    storageRef.child(this.get('imagePath')).getDownloadURL().then((url) => {
      this.set('imageUrl', url);
    }).catch((error) => {
      switch (error.code) {
        case 'storage/object_not_found':
          console.log("File doesn't exist");
          break;
        case 'storage/unauthorized':
          break;
        case 'storage/canceled':
          break;
        case 'storage/unknown':
          break;
      }
    });
  }),

  actions: {
    showModal() {
      let certificateName = this.get('certificate.name');
      let imagePath = this.get('imageUrl');
      $('.image-preview').attr('src', imagePath);
      $('.certificate-title')[0].innerText = `${certificateName}`;
      $('#previewModal').modal('show');
    }
  }
});
