import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material"
import { ChevronLeft, ChevronRight, Logout } from "@mui/icons-material"
import React from "react";
import SettingsIcon from '@mui/icons-material/Settings';

export type HeaderProps = {
    changeWeekDates: (direction: string) => void;
}

export const Header = (props : HeaderProps) => {
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: any) => {
        setAnchorEl(null);
        console.log(event);
        if(event.currentTarget.innerText === "Logout"){
            console.log("clicked logout");
            
        }
    };
    return (
        <Box sx={{ gap: 1 }}>
            <Box sx={{ display: "flex", justifyContent: "space-between", gap: 10, padding: "1rem" }}>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" onClick={() => props.changeWeekDates("previous")}>
                        <ChevronLeft />
                    </Button>
                    <Button variant="outlined" onClick={() => props.changeWeekDates("next")}>
                        <ChevronRight />
                    </Button>
                </Box>
                <Box sx={{ display: "flex", gap: 1 }}>
                    <Button variant="outlined" onClick={() => props.changeWeekDates("today")}>Today</Button>
                    <Button variant="contained">New event</Button>
                    <div>
                        <IconButton
                            aria-label="more"
                            id="long-button"
                            aria-controls={open ? 'long-menu' : undefined}
                            aria-expanded={open ? 'true' : undefined}
                            aria-haspopup="true"
                            onClick={handleClick}
                        >
                            <SettingsIcon />
                        </IconButton>
                        <Menu
                            id="basic-menu"
                            anchorEl={anchorEl}
                            open={open}
                            onClose={handleClose}
                            MenuListProps={{
                                'aria-labelledby': 'basic-button',
                            }}
                        >
                            <MenuItem onClick={handleClose}>UserName</MenuItem>
                            <MenuItem onClick={handleClose}><Logout />Logout</MenuItem>
                        </Menu>
                    </div>
                </Box>
            </Box>

        </Box>
    )
}