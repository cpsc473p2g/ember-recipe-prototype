import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    deleteTask: function(id){
      this.store.findRecord('favorite',id).then(function(favorite){
        favorite.deleteRecord();

        favorite.save();
      });
    }
  }
});
