import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    addTask: function(){
      var recipe = this.get('title');

      alert(recipe);
    }
  }
});
