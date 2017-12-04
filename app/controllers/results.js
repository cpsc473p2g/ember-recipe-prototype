import Controller from '@ember/controller';

export default Controller.extend({
	queryParams: ['q'],
	actions:{
    add: function(r_name, r_sitename, r_yield, r_source,r_image,r_ingredient,r_attr){
      var r_name1 = r_name
			var r_sitename1 = r_sitename
			var r_yield1 = r_yield
			var r_source1 = r_source
			var r_image1 = r_image
			var r_ingredient1 = r_ingredient
			var r_attr1 = r_attr

			alert(r_name)
			alert(r_yield)
      //create new favorite
      var newFavorite = this.store.createRecord('favorite',{
        title: r_name1,
				sitename: r_sitename1,
				source: r_source1,
				image: r_image1
      });

      //save favorite to database
      newFavorite.save();


    }
  }
});

/*
recipe.name recipe.yield recipe.sourceUrl recipe.imageUrl recipe.ingredientLines recipe.attributionHtml
name: DS.attr(),
yield: DS.attr(),
ingredientLines: DS.attr(),
imageUrl: DS.attr(),
sourceUrl: DS.attr(),
sourceSiteName: DS.attr(),
sourceSiteUrl: DS.attr(),
attributionHtml: DS.attr(),
*/
