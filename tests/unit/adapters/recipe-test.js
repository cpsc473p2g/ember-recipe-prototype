import { moduleFor, test } from 'ember-qunit';

moduleFor('adapter:recipe', 'Unit | Adapter | recipe', {
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

test('can query recipes', function(assert) {
  let adapter = this.subject();
  const QUERY = {
    q: 'pumpkin pie',
    maxResult: 3,
  };
  let queryPromise = adapter.query(null, null, QUERY);
  return queryPromise.then(function(resultData) {
    assert.ok(Array.isArray(resultData.data), 'Query result data is not an array');
    resultData.data.forEach(function(recipe) {
      assert.ok(recipe.id, 'Recipe does not contain id');
    });
  })
  .catch(function(error) {
    assert.ok(false, 'Could not query recipes: ' + error);
  });
});
