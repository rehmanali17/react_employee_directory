import React from "react";
import { AdapterDateFns } from "@mui/x-date-pickers/AdapterDateFns";
import { LocalizationProvider } from "@mui/x-date-pickers/LocalizationProvider";
import { TextField } from "@mui/material";
import PropTypes from "prop-types";
import { TimePicker } from "@mui/x-date-pickers";

const CustomTimePicker = props => {
  return (
    <LocalizationProvider dateAdapter={AdapterDateFns}>
      <TimePicker
        label={props.label}
        value={props.value}
        onChange={value => {
          props.onChange(value);
        }}
        renderInput={params => (
          <>
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

CustomTimePicker.propTypes = {
  label: PropTypes.string,
  styles: PropTypes.object,
  value: PropTypes.date,
  onChange: PropTypes.func,
};

export default CustomTimePicker;
