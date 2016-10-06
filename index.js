'use strict';

var months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

var monthsAbbr = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

module.exports = {
  months: function() {
    return months;
  },

  monthsAbbr: function() {
    return monthsAbbr;
  },
};
