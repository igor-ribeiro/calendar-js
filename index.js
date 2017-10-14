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

var WEEKDAYS = [
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
    _monthsAbbr = generateMonthsAbbr(config.months);
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
      return WEEKDAYS;
    },

    weekdaysAbbr: function() {
      return this.weekdays().map(function(weekday) {
        return weekday.slice(0, 3);
      });
    },

    generateCalendar: function(year, month, numberOfDays, firstWeekday, lastWeekday, dayTransformer, cbData) {
      var calendar = [];
      var weeks = [];
      var totalWeeks = Math.ceil((numberOfDays + firstWeekday) / 7);
      var totalDaysOnWeek = 7;
      var lastDay = firstWeekday * -1;
      var lastWeek = totalWeeks - 1;
      var execCb = typeof dayTransformer === 'function';
      
      Array.from({ length: totalWeeks }).forEach(function (_, week) {
        Array.from({ length: totalDaysOnWeek }).forEach(function (_, day) {
          lastDay++;

          var date = new Date(year, month, lastDay);

          var data = {
            date: date,
            day: date.getDate(),
            isInPrimaryMonth: date.getMonth() === month,
            isInLastWeekOfPrimaryMonth: week === lastWeek,
            index: {
              day: day,
              week: week
            }
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
      const data = this.detailed(year, month, function(data) {
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

      var numberOfDays =  new Date(year, month + 1, 0).getDate();
      var firstWeekday = new Date(year, month, 1).getDay();
      var lastWeekday = new Date(year, month, numberOfDays).getDay();

      const data = {
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

      var calendar = this.generateCalendar(year, month, numberOfDays, firstWeekday, lastWeekday, dayTransformer, data);

      data.calendar = calendar;

      return data;
    },
  };
};
