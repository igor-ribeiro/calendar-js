interface ConfigType {
  months?: string[];
  monthsAbbr?: string[];
}

interface CalendarType {
  year: string;
  yearAbbr: string;
  month: string;
  monthAbbr: string;
  weekdays: string;
  weekdaysAbbr: string;
  days: number;
  firstWeekday: number;
  lastWeekday: number;
  calendar: CalendarType[][];
}

type CalendarItem = {
  date: Date;
  day: number;
  isInPrimaryMonth: boolean;
  isInLastWeekOfPrimaryMonth: boolean;
  index: {
    day: number;
    week: number;
  };
};

interface CalendarJsType {
  (config?: ConfigType): CalendarJsType;
  months(): string[];
  monthsAbbr(): string[];
  weekdays(): string[];
  weekdaysAbbr(): string[];
  years(from: number, to: number): string[];
  yearsAbbr(from: number, to: number): string[];
  generateCalendar(
    year: number,
    month: number,
    numberOfDays: number,
    firstWeekday: number,
    lastWeekday: number,
    dayTransformer: (item: CalendarItem, callback: any) => CalendarItem,
    defaultItem: CalendarType
  ): CalendarType[][];
  of(year: number, month: number): CalendarType;
}

declare module 'calendar-js' {
  const CalendarJs: CalendarJsType;
  export default CalendarJs;
}
