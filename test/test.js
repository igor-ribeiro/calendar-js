'use strict';

var expect = require('chai').expect;

var InvalidMonthError = require('./../src/errors/InvalidMonthError');
var calendar = require('./../index');

describe('#months()', function() {
  it('has 12 months', function() {
    var months = calendar.months();

    expect(months.length).to.equal(12);
  });

  it('returns all the months names', function() {
    var months = calendar.months();

    expect(months).to.eql([
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
    ]);
  })
});

describe('#monthsAbbr()', function() {
  it('returns all months names abbreviated', function() {
    var monthsAbbr = calendar.monthsAbbr();

    expect(monthsAbbr).to.eql([
      'Jan',
      'Feb',
      'Mar',
      'Apr',
      'May',
      'Jun',
      'Jul',
      'Aug',
      'Sep',
      'Oct',
      'Nov',
      'Dec',
    ]);
  });
});

describe('#years()', function() {
  it('throws a RangeError if the first argument is greater than the second', function() {
    var years = calendar.years.bind(null, 2016, 2014);

    expect(years).to.throw(RangeError);
  });

  it('returns an array with 6 items when arguments are (2010, 2015)', function() {
    var years = calendar.years(2010, 2015);

    expect(years.length).to.equal(6);
  });

  it('returns [ "2010", "2011", "2012" ] when arguments are (2010, 2012)', function() {
    var years = calendar.years(2010, 2012);

    expect(years).to.eql([
      '2010',
      '2011',
      '2012',
    ]);
  });
});

describe('#yearsAbbr()', function() {
  it('returns [ "99", "00", "01" ] when arguments are (2999, 3001)', function() {
    var years = calendar.yearsAbbr(2999, 3001);

    expect(years).to.eql([
      '99',
      '00',
      '01',
    ]);
  });

  it('accepts only one argument', function() {
    var year = calendar.yearsAbbr(2016);

    expect(year).to.equal('16');
  });
});

describe('#locale()', function() {
  it('returns the default locale at first', function() {
    var locale = calendar.locale();

    expect(locale).to.equal('en');
  });

  it('updates locale if called with a valid argument', function() {
    var locale = calendar.locale('pt-br').locale();

    expect(locale).to.equal('pt-br');
  });

  it('resets to default locale if argument is false', function() {
    var locale = calendar.locale(false).locale();

    expect(locale).to.equal('en');
  });

  it('resets to default locale if argument is an empty string', function() {
    var locale = calendar.locale('').locale();

    expect(locale).to.equal('en');
  });

  it('throws TypeError if an invalid argument is passed', function() {
    var locale1 = function () { calendar.locale(1) };
    var locale2 = function () { calendar.locale(null) };
    var locale3 = function () { calendar.locale(true) };

    expect(locale1).to.throw(TypeError);
    expect(locale2).to.throw(TypeError);
    expect(locale3).to.throw(TypeError);
  });
});

describe('#weekdays', function() {
  it('has 7 weekdays', function () {
    var weekdays = calendar.weekdays();

    expect(weekdays.length).to.equal(7);
  });

  it('returns all weekdays names', function() {
    var weekdays = calendar.weekdays();

    expect(weekdays).to.eql([
      'Sunday',
      'Monday',
      'Tuesday',
      'Wednesday',
      'Thursday',
      'Friday',
      'Saturday',
    ]);
  });
});

describe('#weekdaysAbbr', function() {
  it('returns all months names abbreviated', function() {
    var weekdaysAbbr = calendar.weekdaysAbbr();

    expect(weekdaysAbbr).to.eql([
      'Sun',
      'Mon',
      'Tue',
      'Wed',
      'Thu',
      'Fri',
      'Sat',
    ]);
  });
});

describe('#of()', function() {
  it('throws InvalidMonthError when an invalid month is passed', function() {
    var calendar1 = function () { calendar.of(2016, 12) };

    expect(calendar1).to.throw(InvalidMonthError);
  });

  it('accepts only numbers as arguments', function() {
    var calendar1 = function() { calendar.of('2016', '11') };

    expect(calendar1).to.throw(Error);
  });

  it('returns the year and the yearAbbr', function() {
    var calendar1 = calendar.of(2016, 0);

    expect(calendar1).to.have.property('year', '2016');
    expect(calendar1).to.have.property('yearAbbr', '16');
  });

  it('returns the month and the monthAbbr', function() {
    var calendar1 = calendar.of(2016, 0);

    expect(calendar1).to.have.property('month', 'January');
    expect(calendar1).to.have.property('monthAbbr', 'Jan');
  });
});
