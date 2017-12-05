import Ember from 'ember';
import DS from 'ember-data';
import ENV from 'ember-quickstart/config/environment';

function getRecipe(id) {
	const url = 'https://api.yummly.com/v1/api/recipe/' + encodeURIComponent(id);
	return ajaxDeferredToPromise(Ember.$.getJSON(url, ENV.APP.yummlyCredentials));
}

function queryRecipes(queryParams) {
	const url = 'https://api.yummly.com/v1/api/recipes';
	let parameters = {};
	addProperties(parameters, ENV.APP.yummlyCredentials);
	addProperties(parameters, queryParams);
	return ajaxDeferredToPromise(Ember.$.getJSON(url, parameters));
}

function addProperties(target, source) {
	Object.keys(source).forEach(function(key) {
		target[key] = source[key];
	});
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

function recipeDataToJsonApiResource(id, data) {
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
		'type': 'recipes',
		'id': id,
		'attributes': attributes,
	};
}

function queryResultsToJsonApiResources(results) {
	const matches = results.matches;
	return Ember.RSVP.all(matches.map(function(match) {
		return getRecipe(match.id)
		.then(function(recipeData) {
			return recipeDataToJsonApiResource(match.id, recipeData);
		});
	}));
}

export default DS.Adapter.extend({
	findRecord(store, type, id) {
		return getRecipe(id).then(function(data) {
			return {
				"data": recipeDataToJsonApiResource(id, data)
			};
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

	query(store, type, query) {
		return queryRecipes(query)
		.then(queryResultsToJsonApiResources)
		.then(function(resources) {
			return {
				'data': resources
			}
		});
	},
});
