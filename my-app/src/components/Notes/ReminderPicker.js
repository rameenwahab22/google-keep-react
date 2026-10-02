import React, { useState } from "react";
import "./ReminderPicker.css";

const toDatetimeLocal = (isoString) => {
  if (!isoString) return "";
  const date = new Date(isoString);
  const offset = date.getTimezoneOffset();
  const local = new Date(date.getTime() - offset * 60000);
  return local.toISOString().slice(0, 16);
};

const ReminderPicker = ({ reminder, onReminderChange }) => {
  const [isOpen, setIsOpen] = useState(false);
  const [datetime, setDatetime] = useState(toDatetimeLocal(reminder));

  const handleSave = () => {
    if (datetime) {
      onReminderChange(new Date(datetime).toISOString());
    }
    setIsOpen(false);
  };

  const handleRemove = () => {
    onReminderChange(null);
    setDatetime("");
    setIsOpen(false);
  };

  return (
    <div className="tooltip reminder-picker-control" onClick={(event) => event.stopPropagation()}>
      <button
        type="button"
        className={`material-icons-outlined hover small-icon reminder-picker-trigger${reminder ? " active-reminder" : ""}`}
        aria-label="Remind me"
        aria-expanded={isOpen}
        onClick={() => {
          setDatetime(toDatetimeLocal(reminder));
          setIsOpen((open) => !open);
        }}
      >
        add_alert
      </button>
      <span className="tooltip-text">Remind me</span>
      {isOpen && (
        <div className="reminder-picker" role="dialog" aria-label="Set reminder">
          <label className="reminder-picker-label">
            Date and time
            <input
              type="datetime-local"
              className="reminder-picker-input"
              value={datetime}
              onChange={(event) => setDatetime(event.target.value)}
            />
          </label>
          <div className="reminder-picker-actions">
            {reminder && (
              <button type="button" className="reminder-picker-btn remove" onClick={handleRemove}>
                Remove
              </button>
            )}
            <button
              type="button"
              className="reminder-picker-btn save"
              onClick={handleSave}
              disabled={!datetime}
            >
              Save
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default ReminderPicker;
