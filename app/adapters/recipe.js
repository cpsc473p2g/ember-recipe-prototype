import Ember from 'ember';
import DS from 'ember-data';

const YUMMLY_APP_ID = '0fd0fbe1';
const YUMMLY_APP_KEY = '92cf22bd5cc8e3ed8ae241e43d52832c';

function getRecipe(id) {
	const url = 'http://api.yummly.com/v1/api/recipe/' + id;
	return Ember.$.getJSON(url, {
		_app_id: YUMMLY_APP_ID,
		_app_key: YUMMLY_APP_KEY,
	});
}

function recipeDataToJsonApi(id, data) {
	const attributes = {
		'name': data.name,
		'yield': data.yield,
		'ingredientLines': data.ingredientLines,
		'imageUrl': data.images.hostedLargeUrl,
		'sourceUrl': data.source.sourceRecipeUrl,
		'sourceSiteName': data.source.sourceDisplayName,
		'sourceSiteUrl': data.source.sourceSiteUrl,
		'attributionHtml': data.attribution.html,
	};
	return {
		'data': {
			'type': 'recipe',
			'id': id,
			'attributes': attributes,
		}
	};
}

export default DS.Adapter.extend({
	findRecord(store, type, id) {
		return new Ember.RSVP.Promise(function(resolve, reject) {
			getRecipe(id).then(function(data) {
				resolve(recipeDataToJsonApi(id, data));
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

	query() {
		Ember.RSVP.reject('TODO: query()');
	},
});
