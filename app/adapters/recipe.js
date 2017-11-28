import Ember from 'ember';
import DS from 'ember-data';

const YUMMLY_APP_ID = '0fd0fbe1';
const YUMMLY_APP_KEY = '92cf22bd5cc8e3ed8ae241e43d52832c';

function getRecipe(id) {
	const url = 'https://api.yummly.com/v1/api/recipe/' + encodeURIComponent(id);
	return ajaxDeferredToPromise(Ember.$.getJSON(url, {
		_app_id: YUMMLY_APP_ID,
		_app_key: YUMMLY_APP_KEY,
	}));
}

function ajaxDeferredToPromise(ajaxDeferred) {
	return new Ember.RSVP.Promise(function(resolve, reject) {
		ajaxDeferred.then(function(data) {
			resolve(data);
		},
		function(jqXhr, textStatus, errorThrown) {
			reject(errorThrown);
		});
	});
}

function recipeDataToJsonApi(id, data) {
	const attributes = {
		'name': data.name,
		'yield': data.yield,
		'ingredient-lines': data.ingredientLines,
		'image-url': data.images[0].hostedLargeUrl,
		'source-url': data.source.sourceRecipeUrl,
		'source-site-name': data.source.sourceDisplayName,
		'source-site-url': data.source.sourceSiteUrl,
		'attribution-html': data.attribution.html,
	};
	return {
		'data': {
			'type': 'recipes',
			'id': id,
			'attributes': attributes,
		}
	};
}

export default DS.Adapter.extend({
	findRecord(store, type, id) {
		return getRecipe(id).then(function(data) {
			return recipeDataToJsonApi(id, data);
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
