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
  it('should have length of 12', function() {
    var monthsAbbr = calendar.monthsAbbr();

    expect(monthsAbbr.length).to.equal(12);
  });

  it('should return all months names abbreviated', function() {
    var monthsAbbr = calendar.monthsAbbr();

    expect(monthsAbbr).to.eql(expectedMonthsAbbr);
  });
});

describe('#years', function() {
  it('should throw an error if the first year is greater than the second', function() {
    var years = calendar.years.bind(null, 2016, 2014);

    expect(years).to.throw(RangeError);
  });

  it('should return 6 years when called with (2010, 2015)', function() {
    var years = calendar.years(2010, 2015);

    expect(years.length).to.equal(6);
  });

  it('should return [ 2010, 2011, 2012 ] when called with (2010, 2012)', function() {
    var years = calendar.years(2010, 2012);
    var expectedYears = [ 2010, 2011, 2012 ];

    expect(years).to.eql(expectedYears);
  });
});
