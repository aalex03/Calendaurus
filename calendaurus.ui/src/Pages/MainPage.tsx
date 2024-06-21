import { useEffect, useState } from "react";
import { Calendar } from "../Components/Calendar";
import { Header } from "../Components/Header";
import dayjs from "dayjs";
import { mocks } from "../mocks";
import { ICalendarEntry } from "../types";
import { useCalendarQuery } from "../Api/getCalendarData";
import { IPublicClientApplication, PublicClientApplication } from "@azure/msal-browser";
export type MainPageProps = {
    instance : IPublicClientApplication
}
export const MainPage = (props : MainPageProps) => {
    const [weekDates, setWeekDates] = useState<string[]>([]);
    const {data: calendarData, isLoading, isError, refetch} = useCalendarQuery(props.instance);
    const [highlightedDate, setHighlightedDate] = useState<{day: string, hour: number}>({day: "", hour: 0});
    const changeWeek = (direction: string) => {
        let newWeekDates: string[] = [];
        if (direction === "next") {
            newWeekDates = weekDates.map((date) => dayjs(date, "Do MMMM").add(1, "week").format("Do MMMM"));
        } else if (direction === "previous") {
            newWeekDates = weekDates.map((date) => dayjs(date, "Do MMMM").subtract(1, "week").format("Do MMMM"));
        } else if (direction === "today") {
            const startOfWeek = dayjs().startOf("week").add(1, "day");
            newWeekDates = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day").format("Do MMMM"));
        } else{
            try{
            const startofWeek = dayjs(direction, "Do MMMM").startOf("week").add(1, "day");
            newWeekDates = Array.from({ length: 7 }, (_, i) => startofWeek.add(i, "day").format("Do MMMM"));
            }catch(e){
                console.log(e);
                alert("Could not find entry");
           }
        }
        setWeekDates(newWeekDates);
    }
    useEffect(() => {
        const startOfWeek = dayjs().startOf("week").add(1, "day");
        const dateOfWeek = Array.from({ length: 7 }, (_, i) => startOfWeek.add(i, "day").format("Do MMMM"));
        setWeekDates(dateOfWeek);
    }, []);

    if (isLoading) {
        return <div>Loading...</div>
    }

    if (isError) {
        return <div>Error...</div>
    }
    return (
        <div>
            <Header setHighlightedEntry = {setHighlightedDate}refetchEntries = {refetch}changeWeekDates={changeWeek} calendarEntries={calendarData}/>
            <Calendar highlightedDate={highlightedDate} refetchEntries = {refetch} weekDates={weekDates} calendarEntries={calendarData}/>
        </div>
    );
}