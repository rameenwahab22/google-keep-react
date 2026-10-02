import React, { useState } from "react";
import "./ColorPicker.css";

const colors = [
  { name: "White", value: "#ffffff" },
  { name: "Red", value: "#f28b82" },
  { name: "Orange", value: "#fbbc04" },
  { name: "Yellow", value: "#fff475" },
  { name: "Green", value: "#ccff90" },
  { name: "Teal", value: "#a7ffeb" },
  { name: "Blue", value: "#cbf0f8" },
  { name: "Purple", value: "#d7aefb" },
  { name: "Pink", value: "#fdcfe8" },
];

const ColorPicker = ({ color, onColorChange }) => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <div className="tooltip color-picker-control" onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        className="material-icons-outlined hover small-icon color-picker-trigger"
        aria-label="Change color"
        aria-expanded={isOpen}
        onClick={() => setIsOpen((open) => !open)}
      >
        palette
      </button>
      <span className="tooltip-text">Change Color</span>
      {isOpen && (
        <div className="color-picker" role="group" aria-label="Choose note color">
          {colors.map((option) => (
            <button
              key={option.value}
              type="button"
              className="color-swatch"
              style={{ backgroundColor: option.value }}
              aria-label={option.name}
              aria-pressed={color === option.value}
              title={option.name}
              onClick={() => {
                onColorChange(option.value);
                setIsOpen(false);
              }}
            />
          ))}
        </div>
      )}
    </div>
  );
};

export default ColorPicker;