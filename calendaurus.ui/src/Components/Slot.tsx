import React from "react";
import { ICalendarEntry } from "../types"
import { EmptySlotButton } from "./EmptySlotButton";
import { PopulatedSlotButton } from "./PopulatedSlotButton";

type SlotProps = {
    calendarEntry? : ICalendarEntry
}
export const Slot = (props: SlotProps) => {
    const [open, setOpen] = React.useState(false);
    const {calendarEntry} = props;
    return calendarEntry ? <PopulatedSlotButton calendarEntry={calendarEntry}/> : <EmptySlotButton openModal={open} onClose={function (): void {
        setOpen(false);
    } } handleOpenModal={function (): void {
        setOpen(true);
    } }/>
}