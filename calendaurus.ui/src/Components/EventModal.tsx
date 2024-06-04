import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { ICalendarEntry } from "../types";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
export type EventModalProps = {
    open: boolean;
    handleClose: () => void,
    calendarEntry?: ICalendarEntry
    calendarEntryChanged?: (updatedEntry: ICalendarEntry) => void;
    weekdate?: string,
    hour?: number
}

export const EventModal = (props: EventModalProps) => {

    const [title, setTitle] = useState(props.calendarEntry?.title || "");
    const [description, setDescription] = useState(props.calendarEntry?.description || "");
    const [type, setType] = useState(props.calendarEntry?.type || 1);
    const [location, setLocation] = useState(props.calendarEntry?.location || "");
    const [start, setStart] = useState<Dayjs | null>(dayjs());
    useEffect(() => {
        if (props.calendarEntry) {
            setStart(dayjs(props.calendarEntry.start));
        }
        else if (props.weekdate && props.hour) {
            setStart(dayjs(props.weekdate, "Do MMMM").hour(props.hour));
        }
    }, [props.calendarEntry, props.weekdate, props.hour]);
    const onSubmit = () => { 
            const updatedEntry: ICalendarEntry = {
                id: props.calendarEntry?.id || Math.random().toString(36).substring(7),
                title: title,
                description: description,
                type: type,
                location: location,
                start: start?.toDate() || new Date(),
                created: new Date(),
                updated: new Date()
            }
            props.calendarEntryChanged!(updatedEntry);
        

        props.handleClose();
    }
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                Add a new event
            </DialogTitle>
            <DialogContent>
                <Box sx={{ display: "flex", flexDirection: "column", gap: "2" }}>
                    <TextField label="Title" variant="standard" value={title} onChange={e => setTitle(e.target.value)} />
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select label="Type" value={type} onChange={e => setType(e.target.value)}>
                            <MenuItem value={1}>Course</MenuItem>
                            <MenuItem value={2}>Laboratory</MenuItem>
                            <MenuItem value={3}>Seminar</MenuItem>
                            <MenuItem value={4}>Project</MenuItem>
                            <MenuItem value={5}>Exam</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Description" variant="standard" value={description} onChange={e => setDescription(e.target.value)} />
                    <TextField label="Location" variant="standard" value={location} onChange={e => setLocation(e.target.value)} />
                    <StaticDateTimePicker ampm={false} views={["day", "hours"]} defaultValue={start} onChange={value => setStart(value)} slotProps={{ toolbar: { hidden: true }, actionBar: () => ({ actions: [] }) }}></StaticDateTimePicker>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={props.handleClose}>Cancel</Button>
                <Button variant="contained" color="success" onClick={onSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}