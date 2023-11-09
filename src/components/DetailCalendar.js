import React, { useState, useEffect, useRef } from "react";
import { Box, Stack, Typography, Button } from "@mui/material";
import { Fab } from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import FullCalendar from "@fullcalendar/react";
import dayjs from "dayjs";
import timeGridPlugin from "@fullcalendar/timegrid";
import Divider from "@mui/material/Divider";
import ModalForm from "./ModalForm";
import Backdrop from "@mui/material/Backdrop";

const DetailCalendar = ({ selectedDate, eventDay }) => {
    const [openModal, setOpenModal] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    // Chargement des événements depuis le localStorage au démarrage
    useEffect(() => {
        const storedEvents = JSON.parse(localStorage.getItem("events")) || [];
        setEvents(storedEvents);
    }, []);

    useEffect(() => {
        const eventsForSelectedDate = eventDay.map((event) => ({
            id: event.id, // Assurez-vous que chaque événement a un identifiant unique
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
            <Box>
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
                            <p>{arg.event.title}</p>
                            <Button
                                variant="outlined"
                                color="error"
                                onClick={() => deleteEvent(arg.event.id)}
                            >
                                Supprimer
                            </Button>
                        </div>
                    )}
                />
            </Box>
        </Box>
    );
};


export default DetailCalendar;
