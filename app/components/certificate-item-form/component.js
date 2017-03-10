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
      console.log(files);

      let reader = new FileReader();

      reader.onloadend = run.bind(this, function(){
        let dataURL = reader.result;
        let output = document.getElementById('output');
        output.src = dataURL;
        this.set('file', files[0]);
      });
      reader.readAsDataURL(files[0]);

      // const storageRef = this.get('firebaseApp').storage().ref();
      // let file = data;
      // let uploadTask = storageRef.child('images/' + file[0].name).put(file[0]);
      // uploadTask.on(this.get('firebaseApp').storage.TaskEvent.STATE_CHANGED,
      //   (snapshot) => {
      //     var progress = (snapshot.bytesTransferred / snapshot.totalBytes) * 100;
      //     console.log('Upload is ' + progress + '% done');
      //     this.set('progressText', `Upload is ${Math.round(progress * 100) / 100} % done`);
      //     this.set('progress', progress);
      //     switch (snapshot.state) {
      //       case this.get('firebaseApp').storage.TaskState.PAUSED:
      //         this.set('status', 'Upload is paused');
      //         break;
      //       case this.get('firebaseApp').storage.TaskState.RUNNING:
      //         this.set('status', 'Upload is running');
      //         break;
      //     }
      //   }, (error) => {
      //     switch (error.code) {
      //       case 'storage/unauthorized':
      //         break;
      //       case 'storage/canceled':
      //         break;
      //       case 'storage/unknown':
      //         break;
      //     }
      //   }, () => {
      //     this.set('downloadURL', uploadTask.snapshot.downloadURL);
      //   }
      // );
    }
  },
});
