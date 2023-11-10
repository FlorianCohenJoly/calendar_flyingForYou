import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import DetailCalendar from "./DetailCalendar";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());
    const [allEvents, setAllEvents] = useState([]);

    useEffect(() => {
        console.log("selectedDate", selectedDate.format());
        const storedEvents = JSON.parse(localStorage.getItem("events"));
        if (storedEvents) {
            setAllEvents(storedEvents);
        }
    }, [selectedDate]);


    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    return (
        <Grid container>
            <Grid item xs={9}>
                <DetailCalendar selectedDate={selectedDate} eventDay={allEvents} />
            </Grid>
            <Grid item xs={3}>
                <div className="calendar">
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DateCalendar
                            value={selectedDate}
                            onChange={handleDateChange}
                            showFooter={false}
                            views={["day"]}
                        />
                    </LocalizationProvider>
                </div>
            </Grid>
        </Grid>
    );
};

export default Calendar;