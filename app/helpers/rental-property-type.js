import Ember from 'ember';

const communityPropertyTypes = [
  'Condo',
  'Townhouse',
  'Apartment'
];

export function rentalPropertyType([type]/*, hash*/) {
  if (communityPropertyTypes.contains(type)) {
    return 'Comminity';
  }
  return 'Standalone';
}

export default Ember.Helper.helper(rentalPropertyType);
