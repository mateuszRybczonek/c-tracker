import DS from 'ember-data';
import Ember from 'ember';
import { belongsTo } from 'ember-data/relationships';

const { computed } = Ember;

export default DS.Model.extend({
  user: belongsTo('user'),

  employer: DS.attr('string'),
  vesselName: DS.attr('string'),
  vesselType: DS.attr('string'),
  vesselGT: DS.attr('number'),
  vesselDetails: DS.attr('string'),
  vesselActivities: DS.attr('string'),
  timeOnDP: DS.attr('number'),
  position: DS.attr('string'),
  signOn: DS.attr(),
  signOff: DS.attr(),

  updatedAt: DS.attr('date', { defaultValue: new Date()}),

  isEmployerValid: computed.notEmpty('employer'),
  isVesselNameValid: computed.notEmpty('vesselName'),
  isVesselTypeValid: computed.notEmpty('vesselType'),
  isVesselGTValid: computed.notEmpty('vesselGT'),
  isPositionValid: computed.notEmpty('position'),
  isSignOnValid: computed.notEmpty('signOn'),
  isSignOffValid: computed.notEmpty('signOff'),
  isValid: computed.and(
    'isEmployerValid',
    'isVesselNameValid',
    'isVesselTypeValid',
    'isVesselGTValid',
    'isPositionValid',
    'isSignOnValid',
    'isSignOffValid'),
  isInvalid: computed.not('isValid'),
});
