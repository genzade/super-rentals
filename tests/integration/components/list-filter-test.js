import { moduleForComponent, test } from 'ember-qunit';
import hbs from 'htmlbars-inline-precompile';
import wait from 'ember-test-helpers/wait';
import RSVP from 'rsvp';

moduleForComponent('list-filter', 'Integration | Component | list filter', {
  integration: true
});

const ITEMS = [{city: 'San Francisco'}, {city: 'Portland'}, {city: 'Seattle'}];
const FILTERED_ITEMS = [{city: 'San Francisco'}];

test('should initially load all listings', function(assert) {
  // action to return a promise
  this.on('filterByCity', (val) => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

  // set up and use your component in the same way your application will use it.
  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
        {{#each results as |items|}}
          <li class="city">
            {{item.city}}
          </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // wait function will return a promise that will wait for all promises and xhr requests to resolve before running the contents of the then block.
  return wait().then(() => {
    assert.equal(this.$('.city').length, 3);
    assert.equal(this.$('.city').first().text().trim(), 'San Francisco');
  });
});

test('should update with matching listings', function(assert) {
  // action to return a promise
  this.on('filterByCity', (val) => {
    if (val === '') {
      return RSVP.resolve(ITEMS);
    } else {
      return RSVP.resolve(FILTERED_ITEMS);
    }
  });

   // set up and use your component in the same way your application will use it.
  this.render(hbs`
    {{#list-filter filter=(action 'filterByCity') as |results|}}
      <ul>
        {{#each results as |items|}}
          <li class="city">
            {{item.city}}
          </li>
        {{/each}}
      </ul>
    {{/list-filter}}
  `);

  // keyup event here should invoke an action that will cause the list to be filtered
  this.$('.list-filter input').val('San').keyUp();

  return wait().then(() => {
    assert.equal(this.$('.city').length, 1);
    assert.equal(this.$('.city').text().trim(), 'San Francisco');
  });
});



