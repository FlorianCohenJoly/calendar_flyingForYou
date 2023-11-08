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

const DetailCalendar = ({ selectedDate, eventDay }) => {
    const [openModal, setOpenModal] = useState(false);
    const [events, setEvents] = useState([]);
    const calendarRef = useRef(null);

    useEffect(() => {
        const eventsForSelectedDate = eventDay.map((event) => ({
            title: event.title,
            start: event.dateStart,
            end: event.dateEnd,
            backgroundColor: event.color,
        }));

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
                    events={events}
                    slotMinTime="09:00:00"
                    slotMaxTime="21:00:00"
                    allDaySlot={false}
                    slotLabelFormat={{
                        hour: "2-digit",
                        minute: "2-digit",
                        hour12: false,
                    }}
                    slotDuration="01:00:00"
                    ref={calendarRef}
                />
            </Box>
        </Box>
    );
};

export default DetailCalendar;
