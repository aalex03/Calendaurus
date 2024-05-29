import React from "react";
import { ICalendarEntry } from "../types"
import { EmptySlotButton } from "./EmptySlotButton";
import { PopulatedSlotButton } from "./PopulatedSlotButton";

type SlotProps = {
    details? : ICalendarEntry
}
export const Slot = (props: SlotProps) => {
    const [open, setOpen] = React.useState(false);
    const details = props.details;
    return details ? <PopulatedSlotButton details={details}/> : <EmptySlotButton openModal={open} onClose={function (): void {
        setOpen(false);
    } } handleOpenModal={function (): void {
        setOpen(true);
    } }/>
}