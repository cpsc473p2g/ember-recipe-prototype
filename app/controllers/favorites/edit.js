import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    editTask: function(id){
      var self = this;

      var note = this.get('model.comment');

      //Update task
      this.store.findRecord('favorite',id).then(function(favorite){
        favorite.set('comment', note);

        //save favorite to database
        favorite.save();

        self.transitionToRoute('favorites');
      });

    }
  }
});
