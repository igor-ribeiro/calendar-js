# Calendar.js

This is a fork of [calendar-js](https://github.com/igor-ribeiro/calendar-js) that changes the following:

* The date integers from `calendar.of()` have been replaced with **date descriptor objects**.
* `calendar.of()` now accpets an optional callback that can augment (or entirely replace) the date descriptor objects.
* The main `calendar()` constructor supports a new flag, `useLegacyApi`. Setting that to `true` will cause `calendar.of()` to return what it currently does (an array of integers instead of date descriptor objects).




## Examples

### .of(year, month)
```js
calendar().of(2017, 10)

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

### .of(year, month, modifierCb)

If you supply a modifier callback function, whatever that function returns will be used in place of the default date descriptor object. The callback is supplied the standard date descriptor object as well as the remainder of the `.of()` result set.

In this case, we'll add a few custom properties - `customFormat` and `weekday`. This way, anything that consumes this data can simply read these "pre-computed" properties.

```js
var month = calendar().of(2017, 10, (data, calendar) => {
  return Object.assign({
    customFormat: someCustomFunction(data.date), // preformat date
    weekday: calendar.weekdays[data.index.day] // pre-pluck the weekday
  }, data);
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


## Tests
The existing tests have been updated for all calendar instances to request the legacy api (`calendar({useLegacyApi: true})`). All tests still pass, but I haven't created any additional tests for the other changes.

## Other
I haven't updated the TypeScript declation file. I'm not a TypeScript user, so while it seems the updates would be minor, I don't want to change anything I can't/don't know how to test firsthand.