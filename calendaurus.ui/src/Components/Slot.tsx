import React from "react";
import { ICalendarEntry } from "../types"
import { EmptySlotButton } from "./EmptySlotButton";
import { PopulatedSlotButton } from "./PopulatedSlotButton";

type SlotProps = {
    calendarEntry? : ICalendarEntry
    CalendarEntryChanged?: (updatedEntry: ICalendarEntry) => void,
}
export const Slot = (props: SlotProps) => {
    const [open, setOpen] = React.useState(false);
    const {calendarEntry} = props;
    return calendarEntry ? <PopulatedSlotButton calendarEntry={calendarEntry} CalendarEntryChanged={props.CalendarEntryChanged!}/> : <EmptySlotButton openModal={open} onClose={function (): void {
        setOpen(false);
    } } handleOpenModal={function (): void {
        setOpen(true);
    } }/>
}