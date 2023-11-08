import React, { useState } from "react";
import Dialog from "@mui/material/Dialog";
import DialogContent from "@mui/material/DialogContent";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { SketchPicker } from "react-color";
import { Stack } from "@mui/material";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DemoContainer } from "@mui/x-date-pickers/internals/demo";
import { AdapterDayjs } from "@mui/x-date-pickers/AdapterDayjs";
import { MobileTimePicker } from "@mui/x-date-pickers/MobileTimePicker";

const ModalForm = ({ open, onClose }) => {
    const [selectedColor, setSelectedColor] = useState("#000");
    const [showColorPicker, setShowColorPicker] = useState(false);

    const handleColorChange = (color) => {
        setSelectedColor(color.hex);
    };

    const handleOpenColorPicker = () => {
        setShowColorPicker(true);
    };

    const handleCloseColorPicker = () => {
        setShowColorPicker(false);
    };

    return (
        <Dialog open={open} onClose={onClose} className="modal">
            <DialogContent>
                <Stack direction="row" spacing={2}>
                    <TextField
                        fullWidth
                        margin="dense"
                        id="name"
                        label="Add Title"
                        type="text"
                        variant="standard"
                    />

                    <div
                        style={{
                            width: "20px",
                            height: "20px",
                            backgroundColor: selectedColor,
                            cursor: "pointer",
                        }}
                        onClick={handleOpenColorPicker}
                    ></div>
                    {showColorPicker && (
                        <SketchPicker
                            color={selectedColor}
                            onChange={handleColorChange}
                            onChangeComplete={handleCloseColorPicker}
                        />
                    )}
                </Stack>

                <Stack direction="row" spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label={'"month" and "year"'}
                                views={["day", "month"]}
                            />
                        </DemoContainer>
                    </LocalizationProvider>

                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer components={["DatePicker"]}>
                            <DatePicker
                                label={'"month" and "year"'}
                                views={["month", "day"]}
                            />
                        </DemoContainer>
                    </LocalizationProvider>
                </Stack>

                <Stack direction="row" spacing={2}>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={["MobileDateTimePicker", "MobileDateTimePicker"]}
                        >
                            <MobileTimePicker label={'"hours"'} openTo="hours" />
                        </DemoContainer>
                    </LocalizationProvider>
                    <LocalizationProvider dateAdapter={AdapterDayjs}>
                        <DemoContainer
                            components={["MobileDateTimePicker", "MobileDateTimePicker"]}
                        >
                            <MobileTimePicker label={'"hours"'} openTo="hours" />
                        </DemoContainer>
                    </LocalizationProvider>
                </Stack>
                <TextField
                    label="Description"
                    multiline
                    rows={4}
                    fullWidth
                    variant="standard"
                    margin="normal"
                />
                <Button
                    variant="contained"
                    color="primary"
                    type="submit"
                    style={{ backgroundColor: selectedColor }}
                >
                    Add
                </Button>
            </DialogContent>
        </Dialog>
    );
};

export default ModalForm;
