import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:yummly', 'Unit | Adapter | yummly', {
  // Specify the other units that are required for this test.
  // needs: ['serializer:foo']
});

test('can retrieve recipe', function(assert) {
  let adapter = this.subject();
  const ID = 'Hot-Turkey-Salad-Sandwiches-Allrecipes';
  let recipePromise = adapter.findRecord(null, null, ID, null);
  return recipePromise.then(function(recipeData) {
    assert.equal(recipeData.data.id, ID);
  })
  .catch(function(error) {
    assert.ok(false, 'Could not retrieve recipe: ' + error);
  });
});
