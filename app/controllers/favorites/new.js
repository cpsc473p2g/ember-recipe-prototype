import Controller from '@ember/controller';

export default Controller.extend({
  actions:{
    addTask: function(){
      var title = this.get('title');

      //create new favorite
      var newFavorite = this.store.createRecord('favorite',{
        title: title
      });

      //save favorite to database
      newFavorite.save();

      //clear form
      this.setProperties({
        title: 'test: cleared'
      });
      alert("created:" + title);
    }
  }
});
