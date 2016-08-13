import { test } from 'qunit';
import moduleForAcceptance from 'super-rentals/tests/helpers/module-for-acceptance';

moduleForAcceptance('Acceptance | homepage');

test('should list available rentals', function(assert) {
  visit('/');

  andThen(function() {
    assert.equal(find('.listing').length, 3, 'should see three listings');
  });
});

test('should link to information about the company', function(assert) {
  visit('/');
  click('a:contains("About")');

  andThen(function() {
    assert.equal(currentURL(), '/about', 'should navigate to about');
  });
});

test('should link to contact information', function(assert) {
  visit('/');
  click('a:contains("Contact")');

  andThen(function() {
    assert.equal(currentURL(), '/contact', 'should navigate to contact');
  });
});

test('should filter the list of rentals by city', function(assert) {
  visit('/');
  fillIn('.list-filter input', 'keyup', 69);
  keyEvent();

  andThen(function() {
    assert.equal(find('.listing').length, 1, 'should show one listing');

    assert.equal(find('.listing .location:contains("Seattle")')
      .length, 1, 'should one listing with location Seattle');
  });
});
