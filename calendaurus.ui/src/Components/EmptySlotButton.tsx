import { Add } from "@mui/icons-material"
import { Card, IconButton } from "@mui/material"
import { EventModal } from "./EventModal"
import dayjs from "dayjs"
import { ICalendarEntry } from "../types"
type EmptySlotButtonProps = {
    openModal:boolean,
    onClose: () => void,
    handleOpenModal: () => void,
    weekdate?: string,
    hour?: number
    calendarEntryChanged?: (updatedEntry: ICalendarEntry) => void
}
export const EmptySlotButton = (props : EmptySlotButtonProps) => {
    const {openModal, onClose, handleOpenModal} = props;
    return (
        <Card>
            <IconButton onClick={handleOpenModal}>
                <Add></Add>
            </IconButton>
            <EventModal calendarEntryChanged = {props.calendarEntryChanged} open={openModal} handleClose={onClose} weekdate={props.weekdate} hour={props.hour}/>
        </Card>
    )
}