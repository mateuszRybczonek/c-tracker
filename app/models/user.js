import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  certificates: hasMany('certificate', { async: true }),
  seaservices: hasMany('seaservice', { async: true }),
  email: DS.attr('string'),
});
