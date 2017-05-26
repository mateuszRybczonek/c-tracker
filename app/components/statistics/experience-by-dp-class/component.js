import Ember from 'ember';

const { Component, computed, inject: { service } } = Ember;

export default Component.extend({
  classNames: ['common-table'],

  statsGenerator: service(),
  
  experienceByDPClass: computed('seaservices', 'statsGenerator', function() {
    const seaservices = this.get('seaservices');
    return this.get('statsGenerator').generateExperienceByDPClass(seaservices);
  }),
});
