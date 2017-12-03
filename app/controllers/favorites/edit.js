import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    editTask: function(id){
      var self = this;

      var title = this.get('model.title');

      //Update task
      this.store.findRecord('favorite',id).then(function(favorite){
        favorite.set('title',title);

        //save favorite to database
        favorite.save();

        self.transitionToRoute('favorites');
      });

    }
  }
});
