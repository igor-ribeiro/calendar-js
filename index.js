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
  });
}

function createArray(length) {
  var a = [];

  for (var i = 0; i < length; i++) {
    a.push(1);
  }

  return a;
}

function calendar(config) {
  var abbrLengthWeek =
    config && !isNaN(config.abbrWeek) && config.abbrWeek > 0
      ? config.abbrWeek
      : 3;
  var abbrLengthMonth =
    config && !isNaN(config.abbrMonth) && config.abbrMonth > 0
      ? config.abbrMonth
      : 3;

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
    if (
      !Array.isArray(config.weekdaysAbbr) ||
      config.weekdaysAbbr.length !== 7
    ) {
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
        throw new RangeError(
          'The first year argument cannot be greater than the second'
        );
      }

      var years = [from.toString()];
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

      return years.length > 1 ? years : years[0];
    },

    weekdays: function() {
      return _weekdays;
    },

    weekdaysAbbr: function() {
      return _weekdaysAbbr;
    },

    generateCalendar: function(
      year,
      month,
      numberOfDays,
      firstWeekday,
      lastWeekday,
      dayTransformer,
      cbData
    ) {
      var calendar = [];
      var totalWeeks = Math.ceil((numberOfDays + firstWeekday) / 7);
      var totalDaysOnWeek = 7;
      var lastWeek = totalWeeks - 1;
      var execCb = typeof dayTransformer === 'function';

      var lastDay = firstWeekday * -1;
      var weeks = [];

      createArray(totalWeeks).forEach(function(_, week) {
        createArray(totalDaysOnWeek).forEach(function(_, day) {
          lastDay++;

          var date = new Date(year, month, lastDay);

          var data = {
            date: date,
            day: date.getDate(),
            isInPrimaryMonth: date.getMonth() === month,
            isInLastWeekOfPrimaryMonth: week === lastWeek,
            index: {
              day: day,
              week: week,
            },
          };

          if (execCb) {
            var result = dayTransformer(data, cbData);

            if (result !== undefined) {
              data = result;
            }
          }

          weeks.push(data);
        });

        calendar.push(weeks);

        weeks = [];
      });

      return calendar;
    },

    of: function(year, month, transformer) {
      var data = this.detailed(year, month, function(data) {
        return data.isInPrimaryMonth ? data.day : 0;
      });

      if (typeof transformer === 'function') {
        return transformer(data);
      }

      return data;
    },

    detailed: function(year, month, dayTransformer) {
      if (month < 0 || month > 11) {
        throw new InvalidMonthError('Month should be beetwen 0 and 11');
      }

      if (typeof year !== 'number' || typeof month !== 'number') {
        throw new Error('Arguments should be numbers');
      }

      var numberOfDays = new Date(year, month + 1, 0).getDate();
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
      };

      var calendar = this.generateCalendar(
        year,
        month,
        numberOfDays,
        firstWeekday,
        lastWeekday,
        dayTransformer,
        data
      );

      data.calendar = calendar;

      return data;
    },

    validate: function(year, month, day) {
      var date = new Date(year, month, day);

      return (
        date.getFullYear() === year &&
        date.getMonth() === month &&
        date.getDate() === day
      );
    },
  };
}

module.exports = calendar;
