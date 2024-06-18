import { Edit, MoreVert, Remove } from "@mui/icons-material"
import { Box, Button, Card, Dialog, DialogActions, DialogContent, DialogContentText, DialogTitle, Grow, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { ICalendarEntry } from "../types"
import React from "react";
import { EventModal } from "./EventModal";
import { deleteCalendarEntry } from "../Api/deleteCalendarEntry";
import { useMsal } from "@azure/msal-react";
export type PopulatedSlotButtonProps = {
    calendarEntry: ICalendarEntry;
    refetchEntries?: () => void;
}

export const PopulatedSlotButton = (props: PopulatedSlotButtonProps) => {
    const { instance } = useMsal();
    const { calendarEntry } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openEditModal, setOpenEditModal] = React.useState(false);
    const [openDeleteModal, setOpenDeleteModal] = React.useState(false);
    const [openInfoDialog, setOpenInfoDialog] = React.useState(false);
    const openMenu = Boolean(anchorEl);
    const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        if (event.currentTarget.textContent === "Edit") {
            console.log("Edit");
            setOpenEditModal(true);
        }
        if (event.currentTarget.textContent === "Delete") {
            console.log("Delete");
            setOpenDeleteModal(true);
        }
        setAnchorEl(null);
    }
    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        event.stopPropagation();
        setAnchorEl(event.currentTarget);
    }
    const handleDelete = async () => {
        await deleteCalendarEntry(instance, calendarEntry);
        props.refetchEntries && props.refetchEntries();
    }
    const getBackgroundColor = (type: number) => {
        switch (type) {
            case 0:
                return "#FFA500"; // orange
            case 1:
                return "#ADD8E6"; // light blue
            case 2:
                return "#008000"; // green
            case 3:
                return "#00008B"; // dark blue
            case 4:
                return "#FF0000"; // red
            default:
                return "#FFA500";
        }
    }
    const getTypeToString = (type: number) => {
        switch (type) {
            case 0: return "Course";
            case 1: return "Laboratory";
            case 2: return "Seminar";
            case 3: return "Project";
            case 4: return "Exam";
            default: return "";
        }
    }
    function handleCardBodyClicked(): void {
        setOpenInfoDialog(true);
    }

    return (
        <>
            <Card onClick={() => handleCardBodyClicked()} sx={{
                justifyContent: "space-around", display: "flex", backgroundColor: getBackgroundColor(props.calendarEntry.type), transition: 'transform 0.3s ease-in-out', // Smooth transform transition
                '&:hover': {
                    transform: 'scale(1.03)', // Slightly grow on hover
                },
                '&:active': {
                    transform: 'scale(0.97)', // Slightly shrink on click
                }
            }}>
                <Box>
                    <Typography variant="caption">{getTypeToString(calendarEntry.type)}</Typography>
                    <Box display="flex" justifyContent="space-between" width="100%" gap={2}>
                        <Typography variant="body2" style={{ textAlign: 'left' }}>{calendarEntry.title}</Typography>
                        <Typography variant="body2" style={{ textAlign: 'right' }}>{calendarEntry.location}</Typography>
                    </Box>
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
                        <EventModal refetechEntries={props.refetchEntries} edit={true} calendarEntry={calendarEntry} open={openEditModal} handleClose={() => { setOpenEditModal(false); setAnchorEl(null); }} />
                        <MenuItem onClick={handleCloseMenu}>
                            <ListItemIcon>
                                <Remove fontSize="small"></Remove>
                            </ListItemIcon>
                            <ListItemText primary="Delete"></ListItemText>
                        </MenuItem>
                        <Dialog open={openDeleteModal} onClose={() => { setOpenDeleteModal(false); setAnchorEl(null); }}>
                            <Typography sx={{ padding: "1rem" }}>Are you sure you want to delete this event?</Typography>
                            <Box sx={{ display: "flex", justifyContent: "space-around", padding: "1rem" }}>
                                <IconButton onClick={() => { setOpenDeleteModal(false); setAnchorEl(null); }}>No</IconButton>
                                <IconButton onClick={handleDelete}>Yes</IconButton>
                            </Box>
                        </Dialog>
                    </Menu>
                </Box>
            </Card>
            <Dialog open={openInfoDialog} onClose={() => setOpenInfoDialog(false)} sx={{ '& .MuiPaper-root': { backgroundColor: getBackgroundColor(calendarEntry.type), color: '#fff' }, '& .MuiTypography-root': { color: '#fff' } } }>
                <DialogTitle>Event Details</DialogTitle>
                <DialogContent>
                    <DialogContentText>
                        {`${calendarEntry.title} ${getTypeToString(calendarEntry.type)}, at ${calendarEntry.location}`}
                    </DialogContentText>
                    <DialogContentText>
                        Description: {calendarEntry.description?.length! > 0 ? calendarEntry.description : "No description"}
                    </DialogContentText>
                    <DialogContentText>
                        Start: {calendarEntry.start.format("dddd, MMMM Do YYYY, h:mm a")}
                    </DialogContentText>
                    <DialogContentText>
                        Duration: 2 hours
                    </DialogContentText>
                </DialogContent>
                <DialogActions>
                    <Button sx={{color: "#fff"}} onClick={() => setOpenInfoDialog(false)}>Close</Button>
                </DialogActions>
            </Dialog>
        </>
    )
}