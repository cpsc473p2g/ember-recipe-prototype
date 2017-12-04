import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    search: function(qValue){
      this.transitionToRoute('results', {
        queryParams: {
          q: qValue
        }
      });
    }
  }
});
