import DS from 'ember-data';
import Ember from 'ember';

const { computed } = Ember;

export default DS.Model.extend({
  name: DS.attr('string'),
  number: DS.attr('string'),
  user: DS.attr('string'),
  type: DS.attr('string'),

  issueDate: DS.attr(),
  expiryDate: DS.attr({ defaultValue: 'n/a' }),
  updatedAt: DS.attr('date', { defaultValue: new Date()}),

  comment: DS.attr('string'),

  isNameValid: computed.notEmpty('name'),
  isNumberValid: computed.notEmpty('number'),
  isIssueDateValid: computed.notEmpty('issueDate'),
  isTypeValid: computed.notEmpty('type'),
  isValid: computed.and('isNameValid', 'isNumberValid', 'isIssueDateValid', 'isTypeValid'),
  isInvalid: computed.not('isValid'),
});
