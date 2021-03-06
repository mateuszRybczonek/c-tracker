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
  expiryDate: DS.attr(),
  updatedAt: DS.attr('date', { defaultValue: new Date()}),

  comment: DS.attr('string'),

  isNameValid: computed.notEmpty('name'),
  isNumberValid: computed.notEmpty('number'),
  isIssueDateValid: computed.match(
    'issueDate',
    /(19[5-9]\d|20[0-9]\d|2090)[/\-][0-1][1-2][/\-][0-2]?[0-9]|[3]?[0-1]/
  ),
  isTypeValid: computed.notEmpty('type'),
  isValid: computed.and('isNameValid', 'isNumberValid', 'isIssueDateValid', 'isTypeValid'),
});
