import Ember from 'ember';
import DS from 'ember-data';

const YUMMLY_APP_ID = '0fd0fbe1';
const YUMMLY_APP_KEY = '92cf22bd5cc8e3ed8ae241e43d52832c';

export default DS.RESTAdapter.extend({
	findRecord(store, type, id, snapshot) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			const url = 'http://api.yummly.com/v1/api/recipe/' + id;
			Ember.$.getJSON(url, {
				_app_id: YUMMLY_APP_ID,
				_app_key: YUMMLY_APP_KEY,
			}).then(function(data) {
				let attributes = {
					'name': data.name,
					'yield': data.yield,
					'ingredientLines': data.ingredientLines,
					'imageUrl': data.images.hostedLargeUrl,
					'sourceUrl': data.source.sourceRecipeUrl,
					'sourceSiteName': data.source.sourceDisplayName,
					'sourceSiteUrl': data.source.sourceSiteUrl,
					'attributionHtml': data.attribution.html,
				};
				resolve({
					'data': {
						'type': 'recipe',
						'id': id,
						'attributes': attributes,
					}
				});
			},
			function(jqXhr, textStatus, errorThrown) {
				reject(errorThrown);
			});
		});
	},

	createRecord() {
		Ember.RSVP.reject('Cannot create recipes in Yummly');
	},

	updateRecord() {
		Ember.RSVP.reject('Cannot update recipes in Yummly');
	},

	deleteRecord() {
		Ember.RSVP.reject('Cannot delete recipes in Yummly');
	},

	findAll() {
		Ember.RSVP.reject('Find all not supported in Yummly');
	},

	query(store, type, query, recordArray) {
		Ember.RSVP.reject('TODO: query()');
	},
});
