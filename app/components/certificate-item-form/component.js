import Ember from 'ember';

const { Component, inject: { service }, run } = Ember;

export default Component.extend({

  firebaseApp: service(),
  storageRef: '',
  file: '',

  classNames: ['new-form'],

  types: ['STCW', 'Passport', 'Medical', 'Endorsement', 'Other'],

  progress: 0,

  actions: {
    saveCertificate(certificate) {
      this.sendAction('action', certificate);
    },

    didSelectImage(files) {
      const certificate = this.get('certificate');

      const reader = new FileReader();

      reader.onloadend = () => {
        $('.upload-successful').show(1000);
      };
      reader.readAsDataURL(files[0]);
      this.set('file', files[0]);
      const file = this.get('file');
      const fileExtension = file.name.split('.')[1];
      const metadata = {
        contentType: file.type,
      };
      const storageRef = this.get('firebaseApp').storage().ref();
      const path = 'images/certificates/' + certificate.get('id') + '.' + fileExtension;

      const uploadTask = storageRef.child(path).put(file, metadata);

      uploadTask.on('state_changed', function(snapshot) {
        let progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      }, function(error) {
      }, function() {
        const downloadURL = uploadTask.snapshot.downloadURL;
        certificate.set('imageUrl', downloadURL);
      });
    }
  },
});
