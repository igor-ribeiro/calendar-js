'use strict';

var InvalidMonthError = require('./src/errors/InvalidMonthError');
var InvalidMonthsError = require('./src/errors/InvalidMonthsError');
var InvalidMonthsAbbrError = require('./src/errors/InvalidMonthsAbbrError');

var MONTHS = [
  'January',
  'February',
  'March',
  'April',
  'May',
  'June',
  'July',
  'August',
  'September',
  'October',
  'November',
  'December',
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

function generateMonthsAbbr(months) {
  return months.map(function(month) {
    return month.slice(0, 3);
  });
}

module.exports = function(config) {
  var _months = MONTHS;
  var _monthsAbbr = generateMonthsAbbr(MONTHS);

  if (config && config.months) {
    if (! Array.isArray(config.months)) {
      throw new InvalidMonthsError('Months array must have 12 values');
    }

    if (config.months.length !== 12) {
      throw new InvalidMonthsError('Months array must have 12 values');
    }

    _months = config.months;
  }

  if (config && config.monthsAbbr) {
    if (! Array.isArray(config.monthsAbbr)) {
      throw new InvalidMonthsAbbrError('Months array must have 12 values');
    }

    if (config.monthsAbbr.length !== 12) {
      throw new InvalidMonthsAbbrError('Months array must have 12 values');
    }

    _monthsAbbr = config.monthsAbbr;
  }

  return {
    months: function() {
      return _months;
    },

    monthsAbbr: function() {
      return _monthsAbbr;
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

    weekdaysAbbr: function() {
      return this.weekdays().map(function(weekday) {
        return weekday.slice(0, 3);
      });
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
};
