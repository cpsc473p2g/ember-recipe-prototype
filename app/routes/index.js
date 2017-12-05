import Route from '@ember/routing/route';
import Ember from 'ember';
import { inject } from '@ember/service';

export default Route.extend({
  yummlyDicts: inject(),
  model() {
    return Ember.RSVP.hash({
      allergens: this.get('yummlyDicts').allergies(),
    });
  }
});
