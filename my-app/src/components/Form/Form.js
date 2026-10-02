import React, { useState } from "react";
import "./Form.css";
import { uid } from 'uid';
import ColorPicker from "../Notes/ColorPicker";
import ReminderPicker from "../Notes/ReminderPicker";

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

const Form = (props) => {
  const { edit, selectedNote, toggleModal, changeNoteColor, togglePinNote, setReminder } = props;
  const [title, setTitle] = useState((edit && selectedNote.title) || "");
  const [text, setText] = useState((edit && selectedNote.text) || "");
  const [noteColor, setNoteColor] = useState((edit && selectedNote.color) || "#ffffff");
  const [isActiveForm, setIsActiveForm] = useState(edit);

  const titleChangeHandler = (event) => setTitle(event.target.value);
  const textChangeHandler = (event) => {
    setText(event.target.value)
    setIsActiveForm(true);
  };

  const submitFormHandler = (event) => {
    event.preventDefault();

    if(!edit) {
      props.addNote({
        id: uid(),
        title,
        text,
        color: noteColor,
        pinned: false,
        reminder: null,
      });
      setIsActiveForm(false);
    } else {
      props.editNote({
        id: selectedNote.id,
        title,
        text
      })
      toggleModal()
    }

    setTitle("");
    setText("");
    if (!edit) setNoteColor("#ffffff");
    
  };

  const formClickHandler = () => {
    setIsActiveForm(true);
  };

  return (
    <div>
      <div className="form-container active-form" style={{ backgroundColor: noteColor }} onClick={formClickHandler}>
        <form onSubmit={submitFormHandler} className={isActiveForm ? "form" : ""}>
          {isActiveForm && (
            <input
              onChange={titleChangeHandler}
              value={title}
              type="text"
              className="note-title"
              placeholder="Title"
            />
          )}
          <input
            onChange={textChangeHandler}
            value={text}
            className="note-text"
            type="text"
            placeholder="Take a note..."
          />
          {edit && selectedNote.reminder && (
            <div className="form-reminder">
              <span className="material-icons-outlined reminder-icon">schedule</span>
              <span>{formatReminder(selectedNote.reminder)}</span>
            </div>
          )}
          {isActiveForm ? (
            <div className="form-actions">
              <div className="icons">
                {edit ? (
                  <ReminderPicker
                    reminder={selectedNote.reminder}
                    onReminderChange={(reminder) => setReminder(selectedNote.id, reminder)}
                  />
                ) : (
                  <div className="tooltip">
                    <span className="material-icons-outlined hover small-icon">
                      add_alert
                    </span>
                    <span className="tooltip-text">Remind me</span>
                  </div>
                )}
                {edit && (
                  <div
                    className="tooltip"
                    onClick={(event) => {
                      event.stopPropagation();
                      togglePinNote(selectedNote.id);
                    }}
                  >
                    <span
                      className={`${selectedNote.pinned ? "material-icons" : "material-icons-outlined"} hover small-icon`}
                    >
                      push_pin
                    </span>
                    <span className="tooltip-text">{selectedNote.pinned ? "Unpin note" : "Pin note"}</span>
                  </div>
                )}
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    person_add
                  </span>
                  <span className="tooltip-text">Collaborator</span>
                </div>
                <ColorPicker
                  color={noteColor}
                  onColorChange={(color) => {
                    setNoteColor(color);
                    if (edit) changeNoteColor(selectedNote.id, color);
                  }}
                />
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    image
                  </span>
                  <span className="tooltip-text">Add Image</span>
                </div>
                <div className="tooltip">
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
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    undo
                  </span>
                  <span className="tooltip-text">Undo</span>
                </div>
                <div className="tooltip">
                  <span className="material-icons-outlined hover small-icon">
                    redo
                  </span>
                  <span className="tooltip-text">Redo</span>
                </div>
              </div>
              <button type="submit" className="close-btn">
                Close
              </button>
            </div>
          ) : (
            <div className="form-actions">
              <div className="tooltip">
                <span className="material-icons-outlined hover">check_box</span>
                <span className="tooltip-text">New List</span>
              </div>
              <div className="tooltip">
                <span className="material-icons-outlined hover">brush</span>
                <span className="tooltip-text">New Drawing</span>
              </div>
              <div className="tooltip">
                <span className="material-icons-outlined hover">image</span>
                <span className="tooltip-text">New Image</span>
              </div>
            </div>
          )}
        </form>
      </div>
    </div>
  );
};

export default Form;