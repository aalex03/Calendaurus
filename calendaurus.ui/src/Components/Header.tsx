import { Box, Button, IconButton, Menu, MenuItem, TextField, Typography } from "@mui/material"
import { ChevronLeft, ChevronRight, Label, Logout } from "@mui/icons-material"
import React, { useEffect } from "react";
import SettingsIcon from '@mui/icons-material/Settings';
import { useNavigate } from "react-router-dom";
import { EventModal } from "./EventModal";
import { ICalendarEntry } from "../types";
import { useMsal } from "@azure/msal-react";
import { getExportedCalendar } from "../Api/getExportedCalendar";
import { getDayHour } from "../utils";

export type HeaderProps = {
    changeWeekDates: (direction: string) => void,
    refetchEntries?: () => void,
    calendarEntries?: ICalendarEntry[]
    setHighlightedEntry: ({ day, hour }: { day: string, hour: number }) => void
}

export const Header = (props: HeaderProps) => {
    const { instance } = useMsal();
    const [userName, setUserName] = React.useState("");
    const [anchorEl, setAnchorEl] = React.useState<null | HTMLElement>(null);
    const [openModal, setOpenModal] = React.useState(false);
    const [searchText, setSearchText] = React.useState("");
    const [searchIndex, setSearchIndex] = React.useState(0);
    const [searchEntries, setSearchEntries] = React.useState<{ day: string, hour: number }[]>([]);
    const [didSearch, setDidSearch] = React.useState(false);
    const open = Boolean(anchorEl);
    const handleClick = (event: React.MouseEvent<HTMLButtonElement>) => {
        setAnchorEl(event.currentTarget);
    };
    const handleExport = () => {
        getExportedCalendar(instance);
    }
    const handleClose = (event: any) => {
        setAnchorEl(null);
        if (event.currentTarget.innerText === "Logout") {
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
    const searchFilter = (entry: ICalendarEntry) => {
        return entry.title.toLowerCase().includes(searchText.toLowerCase())
            || entry.description?.toLowerCase().includes(searchText.toLowerCase())
            || entry.location?.toLowerCase().includes(searchText.toLowerCase());
    }
    function handleSearch(event: React.MouseEvent<HTMLButtonElement>): void {
        setSearchEntries([]);
        setSearchIndex(0);
        if (searchText === "") { setDidSearch(false); return; }
        const entries = props.calendarEntries?.filter(searchFilter);
        if (entries?.length === 0) {
            alert("No entries found");
            return;
        }
        setDidSearch(true);
        if (entries?.length === 1) {
            const date = getDayHour(entries[0].start)
            setSearchEntries([date!]);
            props.setHighlightedEntry(date);
            props.changeWeekDates(date.day!);
            return;
        }
        if (entries?.length! > 1) {
            const dates = entries?.map((entry) => getDayHour(entry.start));
            setSearchEntries(dates!);
            setSearchIndex(0);
            props.setHighlightedEntry(dates![0]);
            props.changeWeekDates(dates![0].day);
        }

    }
    function handleSearchPrevious(event: React.MouseEvent<HTMLButtonElement>): void {
        if (searchIndex > 0) {
            setSearchIndex(searchIndex - 1);

        }
    }
    function handleSearchNext(event: React.MouseEvent<HTMLButtonElement>): void {
        if (searchIndex < searchEntries.length - 1) {
            setSearchIndex(searchIndex + 1);
        }
    }

    useEffect(() => {
        if (searchEntries.length > 0) {
            props.setHighlightedEntry(searchEntries[searchIndex]);
            props.changeWeekDates(searchEntries[searchIndex].day);
        }
    }, [searchIndex, searchEntries]);

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
                    <TextField
                        id="search-bar"
                        label="Search"
                        variant="outlined"
                        size="small"
                        sx={{ marginRight: "auto" }}
                        onChange={(e) => setSearchText(e.target.value)}
                    />
                    <Button sx={{ marginRight: "1.5rem" }} variant="outlined" onClick={handleSearch}>Go</Button>
                    {didSearch && <><Button variant="outlined" onClick={handleSearchPrevious}><ChevronLeft /></Button>
                        <Button variant="outlined" onClick={handleSearchNext}><ChevronRight /></Button>
                        <Typography variant="caption">{searchEntries.length} matches.</Typography> </>}
                    <Button variant="outlined" onClick={() => props.changeWeekDates("today")}>Today</Button>
                    <Button variant="contained" onClick={handleOpenModal}>New event</Button>
                    <EventModal refetechEntries={props.refetchEntries} open={openModal} handleClose={handleCloseModal} />
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
                            <MenuItem onClick={handleExport}><Typography>Export calendar</Typography></MenuItem>
                            <MenuItem onClick={handleClose}><Logout />Logout</MenuItem>

                        </Menu>
                    </div>
                </Box>
            </Box>

        </Box>
    )
}