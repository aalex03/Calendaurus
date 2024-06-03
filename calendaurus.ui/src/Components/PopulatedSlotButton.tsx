import { Edit, MoreVert, Remove } from "@mui/icons-material"
import { Box, Card, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { ICalendarEntry } from "../types"
import React from "react";
import { EventModal } from "./EventModal";
export type PopulatedSlotButtonProps = {
    details: ICalendarEntry;
}

export const PopulatedSlotButton = (props: PopulatedSlotButtonProps) => {
    const { details } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = React.useState(false);
    const openMenu = Boolean(anchorEl);
    const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
        
        if (event.currentTarget.textContent === "Edit") {
            console.log("Edit");
            setOpenModal(true);
        }
        if (event.currentTarget.textContent === "Delete") {
            console.log("Delete");
            setOpenModal(true);
        }
        setAnchorEl(null);
    }
    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        setAnchorEl(event.currentTarget);
    }
    return (
        <Card sx={{ justifyContent: "space-around", display: "flex" }}>
            <Box>
                <Typography variant="body2">{details.title}</Typography>
                <Typography variant="caption">{details.description}</Typography>
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
                    <MenuItem onClick={handleCloseMenu}>
                        <ListItemIcon>
                            <Remove fontSize="small"></Remove>
                        </ListItemIcon>
                        <ListItemText primary="Delete"></ListItemText>
                    </MenuItem>
                </Menu>
            </Box>
        </Card>
    )
}