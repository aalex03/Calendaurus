import { Edit, MoreVert, Remove } from "@mui/icons-material"
import { Box, Card, Dialog, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { ICalendarEntry } from "../types"
import React from "react";
import { EventModal } from "./EventModal";
export type PopulatedSlotButtonProps = {
    calendarEntry: ICalendarEntry;
    refetchEntries?: () => void;
}

export const PopulatedSlotButton = (props: PopulatedSlotButtonProps) => {
    const { calendarEntry } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const openMenu = Boolean(anchorEl);
    const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {

        if (event.currentTarget.textContent === "Edit") {
            console.log("Edit");
            setOpenEditModal(true);
        }
        if (event.currentTarget.textContent === "Delete") {
            console.log("Delete");
            setOpenDeleteModal(true);
        }
    }
    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    const getBackgroundColor = (type: number) => {
        switch (type) {
            case 1:
                return "#FFD700";
            case 2:
                return "#FFA500";
            case 3:
                return "#FF6347";
            case 4:
                return "#4682B4";
            case 5:
                return "#8A2BE2";
            default:
                return "#FFD700";
        }
    }
    return (
        <Card sx={{ justifyContent: "space-around", display: "flex", backgroundColor: getBackgroundColor(props.calendarEntry.type)}}>
            <Box>
                <Typography variant="body2">{calendarEntry.title}</Typography>
                <Typography variant="caption">{calendarEntry.description}</Typography>
            </Box>
            <Box>
                <IconButton onClick={handleClickMenu}>
                    <MoreVert />
                </IconButton>

                <Menu open={openMenu} anchorEl={anchorEl} onClose={handleCloseMenu}>
                    <MenuItem onClick={handleCloseMenu}>
                        <ListItemIcon>
                            <Edit fontSize="small"></Edit>
                        </ListItemIcon>
                        <ListItemText primary="Edit"></ListItemText>
                    </MenuItem>
                    <EventModal refetechEntries={props.refetchEntries} edit={true} calendarEntry = {calendarEntry} open={openEditModal} handleClose={() => { setOpenEditModal(false); setAnchorEl(null); }} />
                    <MenuItem onClick={handleCloseMenu}>
                        <ListItemIcon>
                            <Remove fontSize="small"></Remove>
                        </ListItemIcon>
                        <ListItemText primary="Delete"></ListItemText>
                    </MenuItem>
                    <Dialog open={openDeleteModal} onClose={() => { setOpenDeleteModal(false); setAnchorEl(null); }}>
                        <Typography sx={{padding: "1rem"}}>Are you sure you want to delete this event?</Typography>
                        <Box sx={{ display: "flex", justifyContent: "space-around", padding: "1rem" }}>
                            <IconButton onClick={() => { setOpenDeleteModal(false); setAnchorEl(null); }}>No</IconButton>
                            <IconButton onClick={() => { setOpenDeleteModal(false); setAnchorEl(null); }}>Yes</IconButton>
                        </Box>
                    </Dialog>
                </Menu>
            </Box>
        </Card>
    )
}