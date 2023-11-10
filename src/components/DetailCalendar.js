import React, { useState, useEffect, useRef } from "react";
import { Box, Stack, Typography } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";
import timeGridPlugin from "@fullcalendar/timegrid";
import Divider from "@mui/material/Divider";
import ModalForm from "./ModalForm";
import Backdrop from "@mui/material/Backdrop";
import IconButton from "@mui/material/IconButton";
import DisabledByDefaultRoundedIcon from '@mui/icons-material/DisabledByDefaultRounded';

const DetailCalendar = ({ selectedDate, eventDay }) => {
    const [openModal, setOpenModal] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        const eventsForSelectedDate = eventDay.map((event) => ({
            id: event.id,
            title: event.title,
            start: event.dateStart,
            end: event.dateEnd,
            backgroundColor: event.color,
            description: event.description,
        }));
        console.log("eventsForSelectedDate", eventsForSelectedDate);

        setEvents(eventsForSelectedDate);
    }, [eventDay]);

    useEffect(() => {
        if (calendarRef.current) {
            calendarRef.current.getApi().gotoDate(selectedDate.format());
        }
    }, [selectedDate]);


    const handleOpenModal = () => {
        setOpenModal(true);
    };

    const handleCloseModal = () => {
        setOpenModal(false);
    };

    const deleteEvent = (eventID) => {
        const eventsFromLocalStorage = JSON.parse(localStorage.getItem("events")) || [];
        const updatedEvents = eventsFromLocalStorage.filter((event) => event.id != eventID);
        localStorage.setItem("events", JSON.stringify(updatedEvents));
        window.location.reload();
    };

    return (
        <Box height={100} sx={{ padding: 4 }}>
            <Stack
                spacing={2}
                direction="row"
                sx={{
                    width: "100%",
                    display: "flex",
                    justifyContent: "space-between",
                }}
            >
                {selectedDate && (
                    <Typography variant="h5">
                        {dayjs(selectedDate).format("D MMMM")}
                    </Typography>
                )}
                <Fab
                    color="primary"
                    aria-label="add"
                    size="small"
                    onClick={handleOpenModal}
                >
                    <AddIcon />
                </Fab>
                <ModalForm open={openModal} onClose={handleCloseModal} />
                <Backdrop className="backdrop" open={openModal} />
            </Stack>
            <Divider sx={{ my: 2 }} />
            <Box sx={{ marginRight: "50px", marginLeft: "50px" }}>
                <FullCalendar
                    plugins={[timeGridPlugin]}
                    initialView="timeGridDay"
                    slotMinTime="09:00:00"
                    slotMaxTime="23:00:00"
                    headerToolbar={false}
                    allDaySlot={false}
                    slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }}
                    slotDuration="01:00:00"
                    ref={calendarRef}
                    events={events}
                    eventContent={(arg) => (
                        <div>
                            <p className="title">{arg.event.title}</p>
                            <IconButton
                                style={{
                                    position: 'absolute',
                                    top: '50%',
                                    transform: 'translateY(-50%)',
                                    right: '10px',
                                }}
                                color="black"
                                onClick={() => deleteEvent(arg.event.id)}
                                size="small"
                            >
                                <DisabledByDefaultRoundedIcon color="error" />
                            </IconButton>
                        </div>
                    )}
                />
            </Box>
        </Box>
    );
};


export default DetailCalendar;
