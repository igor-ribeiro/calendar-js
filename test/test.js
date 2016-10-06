'use strict';

var expect = require('chai').expect;
var calendar = require('./../index');

var expectedMonths = [
  'January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December',
];

var expectedMonthsAbbr = [
  'Jan', 'Feb', 'Mar', 'Apr', 'May', 'Jun', 'Jul', 'Aug', 'Sep', 'Oct', 'Nov', 'Dec',
];

describe('#months', function() {
  it('should have 12 months', function() {
    var months = calendar.months();

    expect(months.length).to.equal(12);
  });

  it('should return all the months names', function() {
    var months = calendar.months();

    expect(months).to.eql(expectedMonths);
  })
});

describe('#monthsAbbr', function() {
  it('should return all months names abbreviated', function() {
    var monthsAbbr = calendar.monthsAbbr();

    expect(monthsAbbr).to.eql(expectedMonthsAbbr);
  });
});

describe('#years', function() {
  it('should throw a RangeError if the first argument is greater than the second', function() {
    var years = calendar.years.bind(null, 2016, 2014);

    expect(years).to.throw(RangeError);
  });

  it('should return an array with 6 items when arguments are (2010, 2015)', function() {
    var years = calendar.years(2010, 2015);

    expect(years.length).to.equal(6);
  });

  it('should return [ "2010", "2011", "2012" ] when arguments are (2010, 2012)', function() {
    var years = calendar.years(2010, 2012);
    var expectedYears = [ '2010', '2011', '2012' ];

    expect(years).to.eql(expectedYears);
  });
});

describe('#yearsAbbr', function() {
  it('should return [ "99", "00", "01" ] when arguments are (2999, 3001)', function() {
    var years = calendar.yearsAbbr(2999, 3001);
    var expectedYears = [ '99', '00', '01' ];

    expect(years).to.eql(expectedYears);
  });
});

describe('#locale', function() {
  it('should return the default locale at first', function() {
    var locale = calendar.locale();
    var expectedLocale = 'en';

    expect(locale).to.equal(expectedLocale);
  });

  it('should update locale if called with a valid argument', function() {
    var locale = calendar.locale('pt-br').locale();
    var expectedLocale = 'pt-br';

    expect(locale).to.equal(expectedLocale);
  });

  it('should reset to default locale if argument is false', function() {
    var locale = calendar.locale(false).locale();
    var expectedLocale = 'en';

    expect(locale).to.equal(expectedLocale);
  });

  it('should reset to default locale if argument is an empty string', function() {
    var locale = calendar.locale('').locale();
    var expectedLocale = 'en';

    expect(locale).to.equal(expectedLocale);
  });

  it('should throw TypeError if an invalid argument is passed', function() {
    var locale1 = function () { calendar.locale(1) };
    var locale2 = function () { calendar.locale(null) };
    var locale3 = function () { calendar.locale(true) };

    expect(locale1).to.throw(TypeError);
    expect(locale2).to.throw(TypeError);
    expect(locale3).to.throw(TypeError);
  });
});
