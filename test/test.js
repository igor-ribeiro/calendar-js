'use strict';

var expect = require('chai').expect;
var calendar = require('./../index');

var expectedMonths = [
  'January', 'February', 'March', 'April', 'May', 'June',
  'July', 'August', 'September', 'October', 'November', 'December',
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
