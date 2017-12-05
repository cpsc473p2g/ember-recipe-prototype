import Route from '@ember/routing/route';

export default Route.extend({
  model: function(){
    return this.store.findAll('favorite');
    //return this.store.query('favorite', { filter: { uid: 'asfsa' } })
  }
});
