import DS from 'ember-data';

export default DS.Model.extend({
	id: DS.attr(),
	name: DS.attr(),
	yield: DS.attr(),
	ingredientLines: DS.attr(),
	imageUrl: DS.attr(),
	sourceUrl: DS.attr(),
	sourceSiteName: DS.attr(),
	sourceSiteUrl: DS.attr(),
	attributionHtml: DS.attr(),
});
