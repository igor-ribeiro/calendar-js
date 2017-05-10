interface ConfigType {
  months?: string[]
  monthsAbbr?: string[]
}

interface CalendarType {
  year: string
  yearAbbr: string
  month: string
  monthAbbr: string
  weekdays: string
  weekdaysAbbr: string
  days: number
  firstWeekday: number
  lastWeekday: number
  calendar: number[][]
}

interface CalendarJsType {
  (config?: ConfigType): CalendarJsType
  months(): string[]
  monthsAbbr(): string[]
  weekdays(): string[]
  weekdaysAbbr(): string[]
  years(from: number, to: number): string[]
  yearsAbbr(from: number, to: number): string[]
  generateCalendar(numberOfDays: number, firstWeekday: number, lastWeekday: number): number[][]
  of(year: number, month: number): CalendarType
}

declare module 'calendar-js' {
  const CalendarJs: CalendarJsType
  export default CalendarJs
}
