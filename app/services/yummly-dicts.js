import Service from '@ember/service';
import Ember from 'ember';

export default Service.extend({
  allergies() {
    return Ember.RSVP.resolve([
      { value: "393^Gluten-Free", text: "Gluten" },
      { value: "394^Peanut-Free", text: "Peanuts" },
      { value: "398^Seafood-Free", text: "Seafood" },
      { value: "399^Sesame-Free", text: "Sesame" },
      { value: "400^Soy-Free", text: "Soy" },
      { value: "396^Dairy-Free", text: "Dairy" },
      { value: "397^Egg-Free", text: "Eggs" },
      { value: "401^Sulfite-Free", text: "Sulfites" },
      { value: "395^Tree Nut-Free", text: "Tree Nuts" },
      { value: "392^Wheat-Free", text: "Wheat" },
    ]);
  },
});
