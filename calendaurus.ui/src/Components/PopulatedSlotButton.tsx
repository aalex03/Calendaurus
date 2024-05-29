import { Edit, MoreVert, Remove } from "@mui/icons-material"
import { Box, Card, IconButton, ListItemIcon, ListItemText, Menu, MenuItem, Typography } from "@mui/material"
import { ICalendarEntry } from "../types"
import React from "react";
export type PopulatedSlotButtonProps = {
    details: ICalendarEntry;
}

export const PopulatedSlotButton = (props: PopulatedSlotButtonProps) => {
    const { details } = props;
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const openMenu = Boolean(anchorEl);
    const handleType = (type: number | string) => {
        switch (type) {
            case 1:
                return "Course";
            case 2:
                return "Laboratory";
            case 3:
                return "Seminar";
            case 4:
                return "Project";
            case 5:
                return "Exam";
            default:
                return "Unknown";
        }
    }
    const handleCloseMenu = (event: React.MouseEvent<HTMLElement>) => {
        if (event.currentTarget.textContent === "Edit") {
            console.log("Edit");
        }
        if (event.currentTarget.textContent === "Delete") {
            console.log("Delete");
        }
        setAnchorEl(null);
    }
    const handleClickMenu = (event: React.MouseEvent<HTMLElement>) => {
        console.log(event.currentTarget);
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
                <Menu open={openMenu} anchorEl={anchorEl}>
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