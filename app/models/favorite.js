import DS from 'ember-data';

export default DS.Model.extend({
  title: DS.attr('string'),
  sitename: DS.attr('string'),
  source: DS.attr('string'),
  image: DS.attr('string'),
  uid: DS.attr('string')
});
