import Ember from 'ember';

const { Service, RSVP, inject: { service }, run } = Ember;

const D3_LIBRARY_URL = '//cdnjs.cloudflare.com/ajax/libs/d3/3.5.17/d3.min.js';
const NV_LIBRARY_URL = '//cdnjs.cloudflare.com/ajax/libs/nvd3/1.8.4/nv.d3.min.js';

export default Service.extend({
  ajax: service(),

  loadedScripts: {},
  timeout: 10000, // Time for libraries to load in miliseconds

  loadScript(scriptUrl, loadPredicate) {
    if (this.get('loadedScripts')[scriptUrl]) {
      return RSVP.Promise.resolve(true);
    }

    return this.get('ajax').request(scriptUrl, {
      dataType: 'script',
      timeout: this.get('timeout'),
      cache: true,
    })
    .then(() => {
      if (!loadPredicate) {
        return RSVP.Promise.resolve(true);
      }

      return this._waitForLoadPredicate(loadPredicate);
    })
    .then(() => {
      this.get('loadedScripts')[scriptUrl] = true;
    });
  },
  
  loadD3() {
    return this.loadScript(D3_LIBRARY_URL, () => window.d3);
  },

  loadNv() {
    return this.loadScript(NV_LIBRARY_URL, () => window.nv);
  },

  _waitForLoadPredicate(loadPredicate) {
    return new RSVP.Promise(function(resolve) {
      const checkIfLoaded = function() {
        if (loadPredicate()) {
          resolve();
        } else {
          run.later(this, checkIfLoaded, 500);
        }
      };

      checkIfLoaded();
    });
  },
});
