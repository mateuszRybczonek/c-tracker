import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  category: DS.attr('string'),
  description: DS.attr('string'),
  user: DS.attr('string'),

  created_at: DS.attr('date', { defaultValue: new Date()}),
  updated_at: DS.attr('date', { defaultValue: new Date()}),

  isDescriptionValid: computed.notEmpty('description'),
  isCategoryValid: computed.notEmpty('category'),
  isValid: computed.and('isDescriptionValid', 'isCategoryValid'),
  isInvalid: computed.not('isValid'),
});
