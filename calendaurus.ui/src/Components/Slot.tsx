import React from "react";
import { ICalendarEntry } from "../types"
import { EmptySlotButton } from "./EmptySlotButton";
import { PopulatedSlotButton } from "./PopulatedSlotButton";

type SlotProps = {
    calendarEntry? : ICalendarEntry,
    refetchEntries?: () => void,
    weekDate : string,
    hour : number,
    highlight?: boolean
}
export const Slot = (props: SlotProps) => {
    const [open, setOpen] = React.useState(false);
    const {calendarEntry} = props;
    return calendarEntry ? <PopulatedSlotButton highlight={props.highlight}refetchEntries={props.refetchEntries}calendarEntry={calendarEntry}/> : <EmptySlotButton refetchEntries={props.refetchEntries} weekdate= {props.weekDate} hour = {props.hour} openModal={open} onClose={function (): void {
        setOpen(false);
    } } handleOpenModal={function (): void {
        setOpen(true);
    } }/>
}