import dayjs, { Dayjs } from "dayjs";
import timezone from "dayjs/plugin/timezone";
import utc from "dayjs/plugin/utc";
dayjs.extend(utc);
dayjs.extend(timezone);
export const getDayHour = (date: Dayjs) => {
    const day = date.format("Do MMMM");
    const hour = date.hour();
    return { day, hour };
} 