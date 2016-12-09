import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  category: DS.attr('string'),
  description: DS.attr('string'),
  title: DS.attr('string'),

  created_at: DS.attr('date', { defaultValue: new Date()}),
  updated_at: DS.attr('date', { defaultValue: new Date()}),

  isTitleValid: computed.notEmpty('title'),
  isDescriptionValid: computed.notEmpty('description'),
  isCategoryValid: computed.notEmpty('category'),
  isValid: computed.and('isTitleValid', 'isDescriptionValid', 'isCategoryValid'),
  isInvalid: computed.not('isValid'),
});
