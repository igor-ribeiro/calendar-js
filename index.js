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

  years: function(from, to) {
    if (from > to) {
      throw new RangeError('The first year argument cannot be greater than the second');
    }

    var years = [ from ];
    var totalYears = to - from + 1;

    while (years.length < totalYears) {
      var last = years[years.length - 1];

      years.push(last + 1);
    }

    return years;
  },

  yearsAbbr: function (from, to) {
    return this.years(from, to).map(function(year) {
      return year.toString().substring(2);
    });
  },
};
