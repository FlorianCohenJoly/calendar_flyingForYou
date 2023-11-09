import { createSlice } from '@reduxjs/toolkit';

export const calendarSlice = createSlice({
    name: 'calendar',
    initialState: {
        events: [],
    },
    reducers: {
        addEvent: (state, action) => {
            state.events = [...state.events, action.payload];
        },
        deleteEvent: (state, action) => {
            state.events = state.events.filter((event) => event.id !== action.payload);
        },
    },
});

export const { addEvent, deleteEvent } = calendarSlice.actions;

export const selectEvents = (state) => state.calendar.events;

export default calendarSlice.reducer;
