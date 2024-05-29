import { Box, Button, Dialog, DialogActions, DialogContent, DialogTitle, FormControl, InputLabel, MenuItem, Select, TextField } from "@mui/material"
import { StaticDateTimePicker } from "@mui/x-date-pickers";
import { on } from "events";
export type EventModalProps = {
    open: boolean;
    handleClose: () => void;
}

export const EventModal = (props : EventModalProps) => {
    return (
        <Dialog open={props.open} onClose={props.handleClose}>
            <DialogTitle>
                Add a new event
            </DialogTitle>
            <DialogContent>
                <Box sx={{display: "flex", flexDirection: "column", gap: "2"}}>
                    <TextField label="Title" variant="standard"/>
                    <FormControl>
                        <InputLabel>Type</InputLabel>
                        <Select label="Type">
                            <MenuItem value={1}>Course</MenuItem>
                            <MenuItem value={2}>Laboratory</MenuItem>
                            <MenuItem value={3}>Seminar</MenuItem>
                            <MenuItem value={4}>Exam</MenuItem>
                        </Select>
                    </FormControl>
                    <TextField label="Description" variant="standard"/>
                    <TextField label="Location" variant="standard"/>
                    <StaticDateTimePicker views={["day","hours"]} slotProps={{toolbar: {hidden: true}, actionBar: () => ({actions: []})}}></StaticDateTimePicker>
                </Box>
            </DialogContent>
            <DialogActions>
                <Button variant="outlined" color="error" onClick={props.handleClose}>Cancel</Button>
                <Button variant="contained" color="success">Submit</Button>
            </DialogActions>
        </Dialog>
    )
}