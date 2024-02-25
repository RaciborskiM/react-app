import React, { useState } from "react";

import TextField from "@mui/material/TextField";

interface NumberInputProps {
  onChange: (value: string) => void;
  productIndex?: string | null;
}

const NumberInput: React.FC<NumberInputProps> = ({
  onChange,
  productIndex,
}) => {
  const [inputValue, setInputValue] = useState(
    productIndex ? productIndex.toString() : "",
  );

  const handleChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    const newValue = event.target.value.replace(/\D/g, "");
    if (/^\d*\.?\d*$/.test(newValue)) {
      setInputValue(newValue);
      onChange(newValue);
    }
  };

  return (
    <TextField
      type="text"
      value={inputValue}
      onChange={handleChange}
      inputProps={{ min: 0, step: "any" }}
    />
  );
};

export default NumberInput;
