import React, { useState } from "react";
import ColorPicker from "./ColorPicker";
import ReminderPicker from "./ReminderPicker";

const formatReminder = (isoString) => {
  const date = new Date(isoString);
  return date.toLocaleString(undefined, {
    month: "short",
    day: "numeric",
    year: "numeric",
    hour: "numeric",
    minute: "2-digit",
  });
};

const Note = (props) => {
  const { toggleModal, note, setSelectedNote, changeNoteColor, togglePinNote, setReminder } = props;
  const [isHover, setIsHover] = useState(false);

  const noteClickHandler = () => {
    toggleModal();
    setSelectedNote(note);
  };

  const hoverOverHandler = () => {
    setIsHover(true);
  };
  const hoverOutHandler = () => {
    setIsHover(false);
  };
  const deleteHandler = (event) => {
    event.stopPropagation();
    props.deleteNote(note.id);
  };
  const pinHandler = (event) => {
    event.stopPropagation();
    togglePinNote(note.id);
  };

  return (
    <div
      className="note"
      id={props.id}
      style={{ backgroundColor: note.color || "#ffffff" }}
      onClick={noteClickHandler}
      onMouseOver={hoverOverHandler}
      onMouseOut={hoverOutHandler}
    >
      {isHover && (
        <span className="material-icons check-circle">check_circle</span>
      )}
      {(note.pinned || isHover) && (
        <div className="tooltip pin-icon" onClick={pinHandler}>
          <span
            className={`${note.pinned ? "material-icons" : "material-icons-outlined"} hover small-icon`}
          >
            push_pin
          </span>
          <span className="tooltip-text">{note.pinned ? "Unpin note" : "Pin note"}</span>
        </div>
      )}
      <div className="title">{note.title}</div>
      <div className="text">{note.text}</div>
      {note.reminder && (
        <div className="note-reminder">
          <span className="material-icons-outlined reminder-icon">schedule</span>
          <span>{formatReminder(note.reminder)}</span>
        </div>
      )}

      <div
        className="note-footer"
        style={{ visibility: isHover ? "visible" : "hidden" }}
      >
        <ReminderPicker
          reminder={note.reminder}
          onReminderChange={(reminder) => setReminder(note.id, reminder)}
        />
        <div className="tooltip">
          <span className="material-icons-outlined hover small-icon">
            person_add
          </span>
          <span className="tooltip-text">Collaborator</span>
        </div>
        <ColorPicker
          color={note.color || "#ffffff"}
          onColorChange={(color) => changeNoteColor(note.id, color)}
        />
        <div className="tooltip">
          <span className="material-icons-outlined hover small-icon">
            image
          </span>
          <span className="tooltip-text">Add Image</span>
        </div>
        <div className="tooltip archive" onClick={deleteHandler}>
          <span className="material-icons-outlined hover small-icon">
            archive
          </span>
          <span className="tooltip-text">Archive</span>
        </div>
        <div className="tooltip">
          <span className="material-icons-outlined hover small-icon">
            more_vert
          </span>
          <span className="tooltip-text">More</span>
        </div>
      </div>
    </div>
  );
};

export default Note;
