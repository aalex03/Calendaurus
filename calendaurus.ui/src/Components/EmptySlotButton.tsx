import { Add } from "@mui/icons-material"
import { Card, IconButton } from "@mui/material"
import { EventModal } from "./EventModal"
type EmptySlotButtonProps = {
    openModal:boolean,
    onClose: () => void,
    handleOpenModal: () => void
}
export const EmptySlotButton = (props : EmptySlotButtonProps) => {
    const {openModal, onClose, handleOpenModal} = props;
    return (
        <Card>
            <IconButton onClick={handleOpenModal}>
                <Add></Add>
            </IconButton>
            <EventModal open={openModal} handleClose={onClose}/>
        </Card>
    )
}