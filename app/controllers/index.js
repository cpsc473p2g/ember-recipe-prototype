import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    search: function(qValue){
      var results = this.get('store').query('recipe',{
        q: qValue
      });
      this.transitionToRoute('results', results)
    }
    
  }
});
