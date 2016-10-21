'use strict';

var InvalidMonthError = require('./src/errors/InvalidMonthError');

var months = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

var _weekdays = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

var DEFAULT_LOCALE = 'en';

module.exports = {
  _locale: DEFAULT_LOCALE,

  locale: function(locale) {
    if (typeof locale === 'string') {
      this._locale = locale ? locale : DEFAULT_LOCALE;

      return this;
    }

    if (typeof locale === 'boolean' && ! locale) {
      this._locale = DEFAULT_LOCALE;

      return this;
    }

    if (locale === undefined) {
      return this._locale;
    }

    throw new TypeError('Invalid locale argument');
  },

  months: function() {
    return months;
  },

  monthsAbbr: function() {
    return this.months().map(function(month) {
      return month.slice(0, 3);
    });
  },

  years: function(from, to) {
    if (from > to) {
      throw new RangeError('The first year argument cannot be greater than the second');
    }

    var years = [ from.toString() ];
    var totalYears = to - from + 1;

    while (years.length < totalYears) {
      var year = parseInt(years[years.length - 1], 10) + 1;

      years.push(year.toString());
    }

    return years;
  },

  yearsAbbr: function(from, to) {
    var years = this.years(from, to).map(function(year) {
      return year.toString().substring(2);
    });

    return (years.length > 1)
      ? years
      : years[0];
  },

  weekdays: function() {
    return _weekdays;
  },

  of: function(year, month) {
    if (month < 0 || month > 11) {
      throw new InvalidMonthError('Month should be beetwen 0 and 11');
    }

    if (typeof year !== 'number' || typeof month !== 'number') {
      throw new Error('Arguments should be numbers');
    }

    return {
      year: year.toString(),
      yearAbbr: this.yearsAbbr(year),
      month: this.months()[month],
      monthAbbr: this.monthsAbbr()[month],
    };
  },
};
