import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { DatePicker } from "@mui/x-date-pickers/DatePicker";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";

const CustomDatePicker = props => {
    return (
        <LocalizationProvider dateAdapter={AdapterDateFns}>
            <DatePicker
                label={props.label}
                // value={value}
                // onChange={(newValue) => {
                // setValue(newValue);
                // }}
                renderInput={params => (
                    <>
                        {/* <InputLabel>{props.label}</InputLabel> */}
                        <TextField
                            {...params}
                            sx={{
                                "& .MuiInputBase-input": {
                                    p: ".5rem .75rem",
                                    color: "#6D7382",
                                    fontSize: "1rem",
                                    borderColor: "#E5EBF0",
                                    ...props.styles,
                                },
                            }}
                        />
                    </>
                )}
            />
        </LocalizationProvider>
    );
};

CustomDatePicker.propTypes = {
    label: PropTypes.string,
    styles: PropTypes.object,
};

export default CustomDatePicker;
