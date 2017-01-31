import DS from 'ember-data';
import Ember from 'ember';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;

export default DS.Model.extend({
  user: belongsTo('user'),

  name: DS.attr('string'),
  number: DS.attr('string'),
  type: DS.attr('string'),
  renewedBasedOnSeaservice: DS.attr('boolean', { defaultValue: false }),
  daysOfServiceToRenew: DS.attr('number', { defaultValue: null}),

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
