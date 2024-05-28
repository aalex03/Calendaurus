import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { EmptySlotButton } from "./EmptySlotButton";
type CalendarProps = {
    weekDays: string[];
}
export const Calendar = (props : CalendarProps) => {
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const weekDates = props.weekDays;
    const hoursDay = ["08", "10", "12", "14", "16", "18", "20", "22", "24"];
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {weekDays.map((day,index) => <TableCell key={index} >{day} <Typography>{weekDates[index]}</Typography></TableCell>)}</TableRow>
                </TableHead>
                <TableBody>
                    {hoursDay.map((hour, index) => 
                    <TableRow >
                        <TableCell>{hour}</TableCell>
                        {weekDays.map((day, index) => <TableCell key={`${hour}-${day}-${weekDates[index]}`}><EmptySlotButton/></TableCell>)}
                    </TableRow>)}
                </TableBody>
            </Table>
        </TableContainer>
    )
}