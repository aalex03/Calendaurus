import { Box, Button, IconButton, Menu, MenuItem } from "@mui/material"
import { ChevronLeft, ChevronRight, Logout } from "@mui/icons-material"
import React, { useEffect } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { EventModal } from "./EventModal";
import { ICalendarEntry } from "../types";
import { useMsal } from "@azure/msal-react";

export type HeaderProps = {
    changeWeekDates: (direction: string) => void,
    refetchAllEntries?: () => void;
}

export const Header = (props : HeaderProps) => {
    const {instance} = useMsal();
    const navigator = useNavigate();
    const [userName, setUserName] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleClose = (event: any) => {
        setAnchorEl(null);
        if(event.currentTarget.innerText === "Logout"){
            instance.logoutPopup({
                postLogoutRedirectUri: "/",
                mainWindowRedirectUri: "/"
            })
            sessionStorage.clear();
        }
    };
    const handleOpenModal = () => {
        setOpenModal(true);
    }
    const handleCloseModal = () => {
        setOpenModal(false);
    }
    useEffect(() => {
        const user = sessionStorage.getItem("user");
        const parsedUser = user ? JSON.parse(user) : null;
        if (parsedUser) {
            setUserName(parsedUser.name);
        }
    }, []);
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
                    <Button variant="contained" onClick={handleOpenModal}>New event</Button>
                    <EventModal open={openModal} handleClose={handleCloseModal}/>
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
                            <MenuItem onClick={handleClose}>{userName}</MenuItem>
                            <MenuItem onClick={handleClose}><Logout />Logout</MenuItem>
                        </Menu>
                    </div>
                </Box>
            </Box>

        </Box>
    )
}