import Controller from '@ember/controller';

export default Controller.extend({
  query: null,
  allergens: [],
  actions:{
    search: function(){
      this.transitionToRoute('results', {
        queryParams: {
          'q': this.get('query'),
          'allowedAllergy[]': this.get('allergens').mapBy('value'),
        }
      });
    }
  }
});
