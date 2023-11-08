import React, { useState, useEffect } from "react";
import { Grid } from "@mui/material";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { DateCalendar } from "@mui/x-date-pickers/DateCalendar";
import dayjs from "dayjs";
import "dayjs/locale/fr";
import DetailCalendar from "./DetailCalendar";
import "../styles/Calendar.scss";

const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(dayjs());

    const [events] = useState([
        { date: "2023-11-06T09:00:00", title: "Événement 1" },
    ]);
    const [eventDay, setEventDay] = useState([]);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    //uSE EFFECT POUR AFFICHER LES EVENEMENTS DU JOUR
    useEffect(() => {
        const eventsForSelectedDate = events.filter((event) =>
            dayjs(event.date).isSame(selectedDate, "day")
        );
        console.log(eventsForSelectedDate);
        setEventDay(eventsForSelectedDate);
    }, [selectedDate, events]);

    return (
        <Grid container>
            <Grid item xs={9}>
                <DetailCalendar
                    selectedDate={selectedDate.format()}
                    eventDay={eventDay}
                />
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
