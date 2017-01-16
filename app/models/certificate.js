import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  number: DS.attr('string'),
  user: DS.attr('string'),
  type: DS.attr('string'),

  issueDate: DS.attr(),
  expiryDate: DS.attr(),
  updatedAt: DS.attr('date', { defaultValue: new Date()}),

  comment: DS.attr('string'),

  isNameValid: computed.notEmpty('name'),
  isNumberValid: computed.notEmpty('number'),
  isIssueDateValid: computed.notEmpty('issueDate'),
  isValid: computed.and('isNameValid', 'isNumberValid', 'isIssueDateValid'),
  isInvalid: computed.not('isValid'),
});
