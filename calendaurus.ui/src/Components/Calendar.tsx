import { Table, TableBody, TableCell, TableContainer, TableHead, TableRow, Typography } from "@mui/material"
import { ICalendarEntry } from "../types";
import { Slot } from "./Slot";
import { getDayHour } from "../utils";
type CalendarProps = {
    weekDates: string[];
    data: ICalendarEntry[] | undefined;
}
export const Calendar = (props: CalendarProps) => {
    const {data, weekDates} = props;
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
                                        const slots = data?.map((item) => {
                                            const itemDate = getDayHour(item.start.toISOString());
                                            console.log("itemDate", itemDate);
                                            if (itemDate.day === weekDates[index] && itemDate.hour === parseInt(hour)) {
                                                slotAdded = true;
                                                console.log("item", item);
                                                return (<Slot key={item.id} details={item} />);
                                            }
                                            else return null;
                                        });
                                        if (!slotAdded) {
                                            slots?.push(<Slot key={`${hour}-${day}-${weekDates[index]}`} />);
                                        }
                                        console.log("slots", slots);
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