import { useEffect, useState } from "react";
import { Calendar } from "../Components/Calendar";
import { Header } from "../Components/Header";
import dayjs from "dayjs";
import { mocks } from "../mocks";
import { ICalendarEntry } from "../types";

export const MainPage = () => {
    const [weekDates, setWeekDates] = useState<string[]>([]);
    const [calendarData, setCalendarEntries] = useState(mocks);
    const changeWeek = (direction: string) => {
        let newWeekDates: string[] = [];
        if (direction === "next") {
            newWeekDates = weekDates.map((date) => dayjs(date, "Do MMMM").add(1, "week").format("Do MMMM"));
        } else if (direction === "previous") {
            newWeekDates = weekDates.map((date) => dayjs(date, "Do MMMM").subtract(1, "week").format("Do MMMM"));
        } else if (direction === "today") {
            const startOfWeek = dayjs().startOf("week").add(1, "day");
            newWeekDates = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day").format("Do MMMM"));
        }
        setWeekDates(newWeekDates);
    }

    useEffect(() => {
        const startOfWeek = dayjs().startOf("week").add(1, "day");
        const dateOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day").format("Do MMMM"));
        setWeekDates(dateOfWeek);
    }, []);

    const handleCalendarEntryChange = (updatedEntry: ICalendarEntry) => {
        console.log("updatedEntry", updatedEntry)
        let added = false;
        const updatedCalendarEntries = calendarData.map((entry) => {
            if (entry.id === updatedEntry.id) {
                added = true;
                return updatedEntry;
            }
            else return entry;
        });
        if (!added) {
            updatedCalendarEntries.push(updatedEntry);
        }
        setCalendarEntries(updatedCalendarEntries);
    };
    return (
        <div>
            <Header changeWeekDates={changeWeek} calendarEntryChanged={handleCalendarEntryChange}/>
            <Calendar weekDates={weekDates} calendarEntries={calendarData} calendarEntryChanged={handleCalendarEntryChange} />
        </div>
    );
}