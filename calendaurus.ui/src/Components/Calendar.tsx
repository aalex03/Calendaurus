import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { ICalendarEntry } from "../types";
import { Slot } from "./Slot";
import { getDayHour } from "../utils";
type CalendarProps = {
    weekDates: string[];
    calendarEntries?: ICalendarEntry[];
    refetchEntries?: () => void;
}
export const Calendar = (props: CalendarProps) => {
    const {calendarEntries, weekDates} = props;
    const weekDays = ["Monday", "Tuesday", "Wednesday", "Thursday", "Friday", "Saturday", "Sunday"];
    const hoursDay = ["08", "10", "12", "14", "16", "18", "20", "22", "24"];
    return (
        <TableContainer>
            <Table>
                <TableHead>
                    <TableRow>
                        <TableCell></TableCell>
                        {weekDays.map((day, index) => <TableCell key={index} >{day} <Typography>{weekDates[index]}</Typography></TableCell>)}</TableRow>
                </TableHead>
                <TableBody>
                    {hoursDay.map((hour, index) =>
                        <TableRow key={index}>
                            <TableCell>{hour}</TableCell>
                            {weekDays.map((day, index) => (
                                <TableCell key={`${hour}-${day}-${weekDates[index]}`}>
                                    {(() => {
                                        let slotAdded = false;
                                        const slots = calendarEntries?.map((entry) => {
                                            const entryDate = getDayHour(entry.start);
                                            if (entryDate.day === weekDates[index] && entryDate.hour === parseInt(hour)) {
                                                slotAdded = true;
                                                return (<Slot refetchEntries={props.refetchEntries} key={entry.id} calendarEntry={entry} weekDate={weekDates[index]} hour={Number.parseInt(hour)}/>);
                                            }
                                            else return null;
                                        });
                                        if (!slotAdded) {
                                            slots?.push(<Slot refetchEntries={props.refetchEntries} key={`${hour}-${day}-${weekDates[index]}`} weekDate={weekDates[index]} hour={Number.parseInt(hour)}/>);
                                        }
                                        return slots;
                                    })()}
                                </TableCell>
                            ))}
                        </TableRow>
                    )}
                </TableBody>
            </Table>
        </TableContainer>
    )
}