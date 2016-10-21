'use strict';

var expect = require('chai').expect;

var InvalidMonthError = require('./../src/errors/InvalidMonthError');
var calendar = require('./../index');

var expectedMonths = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

var expectedMonthsAbbr = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

describe('#months()', function() {
  it('has 12 months', function() {
    var months = calendar.months();

    expect(months.length).to.equal(12);
  });

  it('returns all the months names', function() {
    var months = calendar.months();

    expect(months).to.eql(expectedMonths);
  })
});

describe('#monthsAbbr()', function() {
  it('returns all months names abbreviated', function() {
    var monthsAbbr = calendar.monthsAbbr();

    expect(monthsAbbr).to.eql(expectedMonthsAbbr);
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
    var expectedYears = [ '2010', '2011', '2012' ];

    expect(years).to.eql(expectedYears);
  });
});

describe('#yearsAbbr()', function() {
  it('returns [ "99", "00", "01" ] when arguments are (2999, 3001)', function() {
    var years = calendar.yearsAbbr(2999, 3001);
    var expectedYears = [ '99', '00', '01' ];

    expect(years).to.eql(expectedYears);
  });

  it('accepts only one argument', function() {
    var year = calendar.yearsAbbr(2016);
    var expectedYear = '16';

    expect(year).to.equal(expectedYear);
  });
});

describe('#locale()', function() {
  it('returns the default locale at first', function() {
    var locale = calendar.locale();
    var expectedLocale = 'en';

    expect(locale).to.equal(expectedLocale);
  });

  it('updates locale if called with a valid argument', function() {
    var locale = calendar.locale('pt-br').locale();
    var expectedLocale = 'pt-br';

    expect(locale).to.equal(expectedLocale);
  });

  it('resets to default locale if argument is false', function() {
    var locale = calendar.locale(false).locale();
    var expectedLocale = 'en';

    expect(locale).to.equal(expectedLocale);
  });

  it('resets to default locale if argument is an empty string', function() {
    var locale = calendar.locale('').locale();
    var expectedLocale = 'en';

    expect(locale).to.equal(expectedLocale);
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
