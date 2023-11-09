import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SketchPicker } from "react-color";
import { Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const ModalForm = ({ open, onClose }) => {
    const [selectedColor, setSelectedColor] = useState("#000");
    const [showColorPicker, setShowColorPicker] = useState(false);
    const [title, setTitle] = useState("");
    const [dateStart, setDateStart] = useState("");
    const [dateEnd, setDateEnd] = useState("");
    const [timeStart, setTimeStart] = useState("");
    const [timeEnd, setTimeEnd] = useState("");
    const [description, setDescription] = useState("");


    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    const handleOpenColorPicker = () => {
        setShowColorPicker(true);
    };

    const handleCloseColorPicker = () => {
        setShowColorPicker(false);
    };

    const onSubmit = (formData) => {
        console.log(formData);
    }


    const handleAddEvent = () => {
        if (!title || !dateStart || !dateEnd || !timeStart) {
            alert("Veuillez remplir tous les champs requis.");
        } else {
            const eventId = Math.floor(Math.random() * 1000); // Générez un identifiant unique
            const formData = {
                id: eventId,
                title: title,
                color: selectedColor,
                dateStart: new Date(
                    dateStart.getFullYear(),
                    dateStart.getMonth(),
                    dateStart.getDate(),
                    timeStart.getHours(),
                    timeStart.getMinutes(),
                    timeStart.getSeconds()
                ),
                dateEnd: new Date(
                    dateEnd.getFullYear(),
                    dateEnd.getMonth(),
                    dateEnd.getDate(),
                    timeEnd.getHours(),
                    timeEnd.getMinutes(),
                    timeEnd.getSeconds()
                ),
                description: description,
            };
            const eventsFromLocalStorage = JSON.parse(localStorage.getItem("events")) || [];
            localStorage.setItem("events", JSON.stringify([...eventsFromLocalStorage, formData]));

            onClose();
        }
    };


    return (
        <Dialog open={open} onClose={onClose} className="modal">
            <DialogContent>
                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        margin="dense"
                        id="title"
                        label="Add Title"
                        type="text"
                        variant="standard"
                        onChange={(e) => setTitle(e.target.value)}
                    />
                    <div
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: selectedColor,
                            cursor: "pointer",
                            marginTop: "29px",

                        }}
                        onClick={handleOpenColorPicker}
                    ></div>
                    {showColorPicker && (
                        <SketchPicker
                            className="color-picker"
                            color={selectedColor}
                            onChange={handleColorChange}
                            onChangeComplete={handleCloseColorPicker}
                        />
                    )}
                </Stack>

                <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            onChange={(newValue) => { setDateStart(newValue.$d) }}
                            label={'"month" and "year"'}
                            views={["day", "month"]}
                        />
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DatePicker
                            onChange={(newValue) => { setDateEnd(newValue.$d) }}
                            label={'"month" and "year"'}
                            views={["month", "day"]}
                        />
                    </LocalizationProvider>
                </Stack>

                <Stack direction="row" spacing={2} sx={{ marginTop: "20px" }}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker label={'"hours"'} openTo="hours"
                            onChange={(newValue) => { setTimeStart(newValue.$d) }} />
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <MobileTimePicker label={'"hours"'} openTo="hours" onChange={(newValue) => { setTimeEnd(newValue.$d) }} />
                    </LocalizationProvider>
                </Stack>
                <TextField
                    id="description"
                    label="Comment"
                    multiline
                    rows={2}
                    fullWidth
                    variant="standard"
                    margin="normal"
                    onChange={(e) => setDescription(e.target.value)}
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ backgroundColor: selectedColor, float: "right", }}
                    onClick={handleAddEvent}

                >
                    Add
                </Button>
            </DialogContent>
        </Dialog >
    );
};

export default ModalForm;
