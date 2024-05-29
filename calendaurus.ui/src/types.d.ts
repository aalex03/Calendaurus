export interface ICalendarEntry {
    id: string,
    title: string,
    description: string,
    start: Date,
    end: Date,
    created: Date,
    updated: Date,
    type: int,
    location: string,
}