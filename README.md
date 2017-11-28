# Calendar.js [![CircleCI](https://circleci.com/gh/igor-ribeiro/calendar-js.svg?style=shield&circle-token=:circle-token)](https://circleci.com/gh/igor-ribeiro/calendar-js)

Pure JS calendar library

## Motivation

I needed a date-picker component for a VueJS project, and I found it! But, one
has too many dependencies, and the styles of others are too coupled with
Bootstrap or Material Design or whatever.

So I started by doing a simple calendar using MomentJS. By doing it I realized
that a date-picker is a calendar with the option of selecting a date. With that
in mind I realized that we need to calculate some things to render a calendar,
like, the days in that month, in what weekday is the first and the last day,
wich weekdays are empty in that month, etc. Then I concluded:

> We can have a general library that calculates these things so we only need to
> render these information in any framework

That’s my goal.

## API Usage

### config

| Option       | Description                                |
| ------------ | ------------------------------------------ |
| months       | Array with the months names                |
| monthsAbbr   | Array with the months names abbreviation   |
| weekdays     | Array with the weekdays names              |
| weekdaysAbbr | Array with the weekdays names abbreviation |

Usage:

```js
calendar({
  months: [ 'Enero', 'Febrero', 'Marzo', ... ],
  monthsAbbr: [ 'Ene', 'Feb', 'Mar', ... ],
})
```

### .years(from, to)

Returns the years in range

```js
calendar().years(2010, 2015)[('2010', '2011', '2012', '2013', '2014', '2015')];
```

### .yearsAbbr(from, to)

Returns the years in range

```js
calendar().yearsAbbr(2010, 2015)[('10', '11', '12', '13', '14', '15')];
```

### .months()

```js
[ 'January', 'February', 'March', 'April', ... ]
```

### .monthsAbbr()

```js
[ 'Jan', 'Feb', 'Mar', 'Apr', ... ]
```

### .of(year, month[, transformer])

```js
calendar().of(2016, 0)

{
  year: '2016',
  yearAbbr: '16',
  month: 'January',
  monthAbbr: 'Jan',
  weekdays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
  weekdaysAbbr: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
  days: 31,
  firstWeekday: 5,
  lastWeekday:  0,
  calendar: [
    [  0,  0,  0,  0,  0,  1,  2 ],
    [  3,  4,  5,  6,  7,  8,  9 ],
    [ 10, 11, 12, 13, 14, 15, 16 ],
    [ 17, 18, 19, 20, 21, 22, 23 ],
    [ 24, 25, 26, 27, 28, 29, 30 ],
    [ 31,  0,  0,  0,  0,  0,  0 ],
  ],
}
```

The transformer param is a function that receives the result of `.of` method so
you can customize the output.

### .detailed(year, month[, dayTransformer])

Like `.of` but returns a 'date descriptor object' for each date instead of an
integer.

```js
calendar().detailed(2017, 10)

{
  year: '2017',
  yearAbbr: '17',
  month: 'November',
  monthAbbr: 'Nov',
  weekdays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
  weekdaysAbbr: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
  days: 30,
  firstWeekday: 3,
  lastWeekday: 4,
  calendar: [
    [
      {
        date: '2017-10-29T05:00:00.000Z', // native js date object
        day: 29,
        isInPrimaryMonth: false,
        isInLastWeekOfPrimaryMonth: false,
        index: { day: 0, week: 0 }
      },
      {
        date: '2017-10-30T05:00:00.000Z',
        day: 30,
        isInPrimaryMonth: false,
        isInLastWeekOfPrimaryMonth: false,
        index: { day: 1, week: 0 }
      },
      {
        date: '2017-10-31T05:00:00.000Z',
        day: 31,
        isInPrimaryMonth: false,
        isInLastWeekOfPrimaryMonth: false,
        index: { day: 2, week: 0 }
      },
      {
        date: '2017-11-01T05:00:00.000Z',
        day: 1,
        isInPrimaryMonth: true,
        isInLastWeekOfPrimaryMonth: false,
        index: { day: 3, week: 0 }
      },
      {
        date: '2017-11-02T05:00:00.000Z',
        day: 2,
        isInPrimaryMonth: true,
        isInLastWeekOfPrimaryMonth: false,
        index: { day: 4, week: 0 }
      },
      {
        date: '2017-11-03T05:00:00.000Z',
        day: 3,
        isInPrimaryMonth: true,
        isInLastWeekOfPrimaryMonth: false,
        index: { day: 5, week: 0 }
      },
      {
        date: '2017-11-04T05:00:00.000Z',
        day: 4,
        isInPrimaryMonth: true,
        isInLastWeekOfPrimaryMonth: false,
        index: { day: 6, week: 0 }
      }
    ],
    [ /* ... */ ],
    [ /* ... */ ],
    [ /* ... */ ],
    [ /* ... */ ]
  ]
}
```

If you supply a `dayTransformer` callback, whatever is returned will be used in
place of the default date descriptor object. The callback is supplied the
standard date descriptor object as well as the remainder of the `.detailed`
result set.

In this case, we'll add a few custom properties - `customFormat` and `weekday`.
This way, anything that consumes this data can simply read these "pre-computed"
properties.

```js
var month = calendar().detailed(2017, 10, (data, calendar) => {
  return Object.assign(
    {
      customFormat: someCustomFunction(data.date), // preformat date
      weekday: calendar.weekdays[data.index.day], // pre-pluck the weekday
    },
    data
  );
});
```

The resulting date descriptor objects will now look like this:

```js
{
  customFormat: '11/29/2017',
  weekday: 'Wednesday',
  date: '2017-10-29T05:00:00.000Z',
  day: 29,
  isInPrimaryMonth: false,
  isInLastWeekOfPrimaryMonth: false,
  index: { day: 0, week: 0 }
}
```

### .validate(year, month, day)

Returns if the date is valid

```js
calendar().validate(2017, 0, 1); // valid
calendar().validate(2017, 1, 30); // invalid
```
