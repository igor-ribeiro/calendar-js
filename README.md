# Calendar.js
Pure JS calendar library
## Motivation
I needed a date-picker component for a VueJS project, and I found it! But, one has too many dependencies, and the styles of others are too coupled with Bootstrap or Material Design or whatever.

So I started by doing a simple calendar using MomentJS. By doing it I realized that a date-picker is a calendar with the option of selecting a date. With that in mind I realized that we need to calculate some things to render a calendar, like, the days in that month, in what weekday is the first and the last day, wich weekdays are empty in that month, etc. Then I concluded:

> We can have a general library that calculates these things so we only need to render these information in any framework

That’s my goal.

## API Usage
### .locale(locale)
Sets or returns the locale

### .years(from, to)
Returns the years in range
```js
calendar.years(2010, 2015)

[ 2010, 2011, 2012, 2013, 2014, 2015 ]
```

### .yearsAbbr(from, to)
Returns the years in range
```js
calendar.years(2010, 2015)

[ 10, 11, 12, 13, 14, 15 ]
```

### .months()
```js
[ 'January', 'February', 'March', 'April', ... ]
```

### .monthsAbbr()
```js
[ 'Jan', 'Feb', 'Mar', 'Apr', ... ]
```

### .of(year, month)
```js
calendar.of(2016, 0)

{
  year: 2016,
  yearAbbr: 16,
  month: 'January',
  monthAbbr: 'Jan',
  weekdays: [ 'Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday' ],
  weekdaysAbbr: [ 'Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat' ],
  days: 31,
  startsAtWeekday: 5,
  endsAtWeekday:  0,
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
