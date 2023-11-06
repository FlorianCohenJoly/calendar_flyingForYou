import React, { useState } from 'react';
import { LocalizationProvider } from '@mui/x-date-pickers/LocalizationProvider';
import { AdapterDayjs } from '@mui/x-date-pickers/AdapterDayjs';
import TextField from '@mui/material/TextField';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import { DateCalendar } from '@mui/x-date-pickers/DateCalendar';
import dayjs from 'dayjs';
import { Stack } from '@mui/system';
import Fab from '@mui/material/Fab';
import AddIcon from '@mui/icons-material/Add';
import '../styles/Calendar.scss';


const Calendar = () => {
    const [selectedDate, setSelectedDate] = useState(null);

    const handleDateChange = (newDate) => {
        setSelectedDate(newDate);
    };

    const getEventsForSelectedDate = () => {
        if (selectedDate) {
            const events = [
                { date: '2023-11-06', title: 'Événement 1' },

            ];

            const eventsForSelectedDate = events.filter(event => dayjs(event.date).isSame(selectedDate, 'day'));

            return `${eventsForSelectedDate.map(event => event.title)}`;
        }

        return '';
    };

    return (
        <div>
            {/* display selected date*/}
            <div className='info'>
                <Stack spacing={2} direction="row">
                    {selectedDate && (
                        <Typography variant="h5">
                            {dayjs(selectedDate).format('D MMMM')}
                        </Typography>
                    )}
                    <Fab color="primary" aria-label="add">
                        <AddIcon />
                    </Fab>
                </Stack>
            </div>

            {/* display calendar */}
            <Box display="flex">
                <Box flex="1">
                    <TextField
                        label="Horaires et événements"
                        multiline
                        fullWidth
                        variant="outlined"
                        rows={10}
                        value={getEventsForSelectedDate()}
                        InputProps={{ readOnly: true }}
                    />
                </Box>

                <div className='calendar'>
                    <Box flex="2" >
                        <LocalizationProvider dateAdapter={AdapterDayjs} >
                            <DateCalendar
                                value={selectedDate}
                                onChange={handleDateChange}
                                showFooter={false}
                            />
                        </LocalizationProvider>
                    </Box>
                </div>
            </Box>
        </div>
    );
};

export default Calendar;
