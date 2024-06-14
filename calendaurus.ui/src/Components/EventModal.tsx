import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { ICalendarEntry } from "../types";
import { useEffect, useState } from "react";
import dayjs, { Dayjs } from "dayjs";
import { useMutation } from "react-query";
import { postCalendarEntryMutation } from "../Api/postCalendarEntry";
import { useMsal } from "@azure/msal-react";
import { putCalendarEntryMutation } from "../Api/putCalendarEntry";
export type EventModalProps = {
    open: boolean,
    handleClose: () => void,
    calendarEntry?: ICalendarEntry
    refetechEntries?: () => void,
    weekdate?: string,
    hour?: number,
    edit?: boolean
}

export const EventModal = (props: EventModalProps) => {
    const { instance } = useMsal();
    const [title, setTitle] = useState(props.calendarEntry?.title || "");
    const [description, setDescription] = useState(props.calendarEntry?.description || "");
    const [type, setType] = useState(props.calendarEntry?.type || 1);
    const [location, setLocation] = useState(props.calendarEntry?.location || "");
    const [start, setStart] = useState<Dayjs | null>(dayjs());
    const { data, mutate: onPost } = useMutation({
        mutationFn: (entry: ICalendarEntry) => props.edit ? putCalendarEntryMutation(instance, entry) : postCalendarEntryMutation(instance, entry)
    })
    const handleTimeChange = (value: Dayjs | null) => {
        if (value) {
            const newDate = dayjs(value).minute(0).second(0).millisecond(0);
            setStart(newDate);
        }
    }
    const handleSubmit = () => {
        const newEntry: ICalendarEntry = {
            title,
            description,
            type,
            location,
            start: start!.add(3, "hour").utc(),
            id: props.calendarEntry?.id ?? "",
            created: dayjs(),
            updated: dayjs()
        }
        onPost(newEntry, {
            onSuccess: () => {
                props.refetechEntries && props.refetechEntries();
                props.handleClose();
            }
        })
    }
    useEffect(() => {
        if (props.calendarEntry) {
            setStart(dayjs(props.calendarEntry.start));
        }
        else if (props.weekdate && props.hour) {
            setStart(dayjs(props.weekdate, "Do MMMM").hour(props.hour));
        }
    }, [props.calendarEntry, props.weekdate, props.hour]);
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
                            <MenuItem value={0}>Course</MenuItem>
                            <MenuItem value={1}>Laboratory</MenuItem>
                            <MenuItem value={2}>Seminar</MenuItem>
                            <MenuItem value={3}>Project</MenuItem>
                            <MenuItem value={4}>Exam</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Description" variant="standard" value={description} onChange={e => setDescription(e.target.value)} />
                    <TextField label="Location" variant="standard" value={location} onChange={e => setLocation(e.target.value)} />
                    <StaticDateTimePicker maxTime={start?.set("hour", 22)} minTime= {start?.set("hour",8)} minutesStep={60} ampm={false} views={["day", "hours"]} defaultValue={start} onChange={handleTimeChange} slotProps={{ toolbar: { hidden: true }, actionBar: () => ({ actions: [] }) }}></StaticDateTimePicker>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={props.handleClose}>Cancel</Button>
                <Button variant="contained" color="success" onClick={handleSubmit}>Submit</Button>
            </DialogActions>
        </Dialog>
    )
}