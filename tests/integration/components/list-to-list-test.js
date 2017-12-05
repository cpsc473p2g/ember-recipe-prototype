import { moduleForComponent, test, skip } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';

moduleForComponent('list-to-list', 'Integration | Component | list to list', {
  integration: true
});

const ITEMS = [
  { value: 'test1', text: 'Test 1' },
  { value: 'test2', text: 'Test 2' },
];

test('can render items', function(assert) {
  this.set('items', ITEMS);

  this.render(hbs`{{list-to-list items=items}}`);

  assert.equal(this.$('select').length, 1, 'should have only one select');
  assert.equal(this.$('ul').length, 1, 'should have only one list');

  const $options = this.$('option');
  assert.equal($options.length, ITEMS.length + 1, 'number of options should be one more than number of items');

  assert.equal($options[0].value, '', 'placeholder option should have empty value');
  ITEMS.forEach(function(item, index) {
    const $optionForItem = $options[index + 1];
    assert.equal($optionForItem.value, item.value, 'option value should match item value');
    assert.equal($optionForItem.text, item.text, 'option text should match item text');
  });
});

test('can render placeholder', function(assert) {
  this.set('items', ITEMS);
  const PLACEHOLDER = 'My custom placeholder...';
  this.set('placeholder', PLACEHOLDER);

  this.render(hbs`{{list-to-list items=items placeholder=placeholder}}`);

  const $options = this.$('option');
  assert.equal($options[0].text, PLACEHOLDER, 'placeholder text should match');
});

//Skip this test because setting selectedIndex doesn't trigger the change event
skip('can add elements', function(assert) {
  this.set('items', ITEMS);
  this.set('addedItems', []);

  this.render(hbs`{{list-to-list items=items addedItems=addedItems}}`);

  const $select = this.$('select');
  const $list = this.$('ul');
  const $addButton = this.$('button').first();
  ITEMS.forEach((item, index) => {
    $select.prop('selectedIndex', index + 1);
    $addButton.click();

    assert.equal($list.find('li').last().text(), item.text, 'list item text should match');
    assert.equal(this.get('addedItems').get('lastObject').value, item.value, 'addedItems should have the item');
  });
});

//Skip this test because setting selectedIndex doesn't trigger the change event
skip('does not add duplicates', function(assert) {
  this.set('items', ITEMS);
  this.set('addedItems', []);

  this.render(hbs`{{list-to-list items=items addedItems=addedItems}}`);

  const $select = this.$('select');
  const $list = this.$('ul');
  const $addButton = this.$('button').first();
  ITEMS.forEach(function(item, index) {
    $select.prop('selectedIndex', index + 1);
    $addButton.click();
    $addButton.click();
  });
  assert.equal($list.find('li').length, ITEMS.length, 'list should have the same number of items');
  assert.equal(this.get('addedItems').get('length'), ITEMS.length, 'addedItems should have the same number of items');
});
