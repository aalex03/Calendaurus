import { Dayjs } from "dayjs";

export interface ICalendarEntry {
    id: string,
    title: string,
    description?: string,
    start: Dayjs,
    created?: Dayjs,
    updated?: Dayjs,
    type?: int,
    location?: string,
}