import { Add } from "@mui/icons-material"
import { Card, IconButton } from "@mui/material"

export const EmptySlotButton = () => {
    return (
        <Card>
            <IconButton onClick={() => console.log('plus')}>
                <Add></Add>
            </IconButton>
        </Card>
    )
}