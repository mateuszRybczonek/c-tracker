import DS from 'ember-data';
import { hasMany } from 'ember-data/relationships';

export default DS.Model.extend({
  certificates: hasMany('certificate', { embedded: 'always' }),
  seaservices: hasMany('seaservice', { embedded: 'always' }),
  email: DS.attr('string'),
});
