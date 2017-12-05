import Component from '@ember/component';

export default Component.extend({
  classNames: ['list-to-list'],
  addedItems: [],
  actions: {
    addItem(value) {
      if(value) {
        const item = this.get('items').findBy('value', value);
        if(!this.get('addedItems').findBy('value', value)) {
          this.get('addedItems').pushObject(item);
        }
      }
    },

    removeItem(value) {
      const item = this.get('addedItems').findBy('value', value);
      this.get('addedItems').removeObject(item);
    },
  }
});
