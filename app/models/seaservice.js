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
  dpClass: DS.attr('number'),
  dpSystem: DS.attr('string'),
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
  isSignOnValid: computed.match(
    'signOn',
    /(19[5-9]\d|20[0-9]\d|2090)[/\-][0-9]{2}[/\-][0-9]{2}/
  ),
  isSignOffValid: computed.match(
    'signOff',
    /(19[5-9]\d|20[0-9]\d|2090)[/\-][0-9]{2}[/\-][0-9]{2}/
  ),
  isModelValid: computed.and(
    'isEmployerValid',
    'isVesselNameValid',
    'isVesselTypeValid',
    'isVesselGTValid',
    'isPositionValid',
    'isSignOnValid',
    'isSignOffValid'),
});
