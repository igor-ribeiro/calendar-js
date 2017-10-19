'use strict';

var InvalidMonthError = require('./src/errors/InvalidMonthError');
var InvalidMonthsError = require('./src/errors/InvalidMonthsError');
var InvalidMonthsAbbrError = require('./src/errors/InvalidMonthsAbbrError');

var InvalidWeekdayError = require('./src/errors/InvalidWeekdayError');
var InvalidWeekdaysError = require('./src/errors/InvalidWeekdaysError');
var InvalidWeekdaysAbbrError = require('./src/errors/InvalidWeekdaysAbbrError');

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

var WEEKDAYS = [
  'Sunday',
  'Monday',
  'Tuesday',
  'Wednesday',
  'Thursday',
  'Friday',
  'Saturday',
];

function generateAbbr(arr, len) {
  return arr.map(function(item) {
    return item.slice(0, len || 3);
  })
}

function createArray(length) {
  return (new Array(length)).fill(1);
}

module.exports = function(config) {
  var abbrLengthWeek = (config && !isNaN(config.abbrWeek) && config.abbrWeek > 0) ? config.abbrWeek : 3;
  var abbrLengthMonth = (config && !isNaN(config.abbrMonth) && config.abbrMonth > 0) ? config.abbrMonth : 3;
  var _months = MONTHS;
  var _monthsAbbr = generateAbbr(MONTHS, abbrLengthMonth);
  var _weekdays = WEEKDAYS;
  var _weekdaysAbbr = generateAbbr(WEEKDAYS, abbrLengthWeek);

  if (config && config.months) {
    if (!Array.isArray(config.months) || config.months.length !== 12) {
      throw new InvalidMonthsError('Months array must have 12 values');
    }

    _months = config.months;
    _monthsAbbr = generateAbbr(config.months, abbrLengthMonth);
  }

  if (config && config.monthsAbbr) {
    if (!Array.isArray(config.monthsAbbr) || config.monthsAbbr.length !== 12) {
      throw new InvalidMonthsAbbrError('Months array must have 12 values');
    }

    _monthsAbbr = config.monthsAbbr;
  }

  if (config && config.weekdays) {
    if (!Array.isArray(config.weekdays) || config.weekdays.length !== 7) {
      throw new InvalidWeekdaysError('Weekdays array must have 7 values');
    }

    _weekdays = config.weekdays;
    _weekdaysAbbr = generateAbbr(config.weekdays, abbrLengthWeek);
  }

  if (config && config.weekdaysAbbr) {
    if (!Array.isArray(config.weekdaysAbbr) || config.weekdaysAbbr.length !== 7) {
      throw new InvalidWeekdaysAbbrError('Weekdays array must have 7 values');
    }

    _weekdaysAbbr = config.weekdaysAbbr;
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
      return _weekdaysAbbr;
    },

    generateCalendar: function(numberOfDays, firstWeekday, lastWeekday) {
      var calendar = [];
      var weeks = [];
      var totalWeeks = Math.ceil((numberOfDays + firstWeekday) / 7);
      var totalDaysOnWeek = 7;
      var lastDay = 0;

      createArray(totalWeeks).forEach(function (_, week) {
        createArray(totalDaysOnWeek).forEach(function (_, day) {
          var dayToAdd = 0;

          if (week === 0) {
            // if it is the first week fill with '0' until the firstWeekday
            if (day >= firstWeekday) {
              lastDay++;
              dayToAdd = lastDay;
            }
          } else if (week === totalWeeks.length - 1) {
            // if it is the first week fill with '0' after the lastWeekday
            if (day <= lastWeekday && lastDay < numberOfDays) {
              lastDay++;
              dayToAdd = lastDay;
            }
          } else if (lastDay < numberOfDays) {
            lastDay++;
            dayToAdd = lastDay;
          }

          weeks.push(dayToAdd);
        });

        calendar.push(weeks);
        weeks = [];
      });

      return calendar;
    },

    of: function(year, month, transformer) {
      if (month < 0 || month > 11) {
        throw new InvalidMonthError('Month should be beetwen 0 and 11');
      }

      if (typeof year !== 'number' || typeof month !== 'number') {
        throw new Error('Arguments should be numbers');
      }

      var numberOfDays =  new Date(year, month + 1, 0).getDate();
      var firstWeekday = new Date(year, month, 1).getDay();
      var lastWeekday = new Date(year, month, numberOfDays).getDay();

      var data = {
        year: year.toString(),
        yearAbbr: this.yearsAbbr(year),
        month: this.months()[month],
        monthAbbr: this.monthsAbbr()[month],
        weekdays: this.weekdays(),
        weekdaysAbbr: this.weekdaysAbbr(),
        days: numberOfDays,
        firstWeekday: firstWeekday,
        lastWeekday: lastWeekday,
        calendar: this.generateCalendar(numberOfDays, firstWeekday, lastWeekday),
      };

      if (typeof transformer === 'function') {
        return transformer(data);
      }

      return data;
    },
  };
};
