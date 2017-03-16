import Ember from 'ember';

const { Component, computed, inject: { service }, $ } = Ember;

export default Component.extend({

  firebaseApp: service(),
  storageRef: '',
  file: '',

  classNames: ['new-form'],

  types: ['STCW', 'Passport', 'Medical', 'Endorsement', 'Other'],

  progress: 0,
  progressBarValue: computed.alias('progress'),

  actions: {
    saveCertificate(certificate) {
      this.sendAction('action', certificate);
    },

    didSelectImage(files) {
      const certificate = this.get('certificate');
      const certificateId = certificate.get('id');
      const userId = this.get('session.currentUser.uid');
      const reader = new FileReader();

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
        this.set('progress', (snapshot.bytesTransferred / snapshot.totalBytes) * 100);
      }, function(error) {
      }, function() {
        $('.upload-successful').show(1000);
      });
    },
  },
});
