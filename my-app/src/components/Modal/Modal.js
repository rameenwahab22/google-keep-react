import React, { useState } from "react";
import "./Modal.css";
import Form from "../Form/Form";

const Modal = (props) => {
  const { isModalOpen, selectedNote, toggleModal, editNote, changeNoteColor, togglePinNote, setReminder } = props;

  const [hasCursor, setHasCursor] = useState(false);
  
    const handleCloseModal = () => !hasCursor && toggleModal();
    const handleMouseOverModal = () => setHasCursor(true);
    const handleMouseOutModal = () => setHasCursor(false);

  return (
    <div className={`modal ${isModalOpen ? "open-modal" : ""}`} onClick={handleCloseModal}>
      <div className="modal-content" onMouseOver={handleMouseOverModal} onMouseOut={handleMouseOutModal}>
        <Form
          selectedNote={selectedNote}
          toggleModal={toggleModal}
          editNote={editNote}
          changeNoteColor={changeNoteColor}
          togglePinNote={togglePinNote}
          setReminder={setReminder}
          edit
        />
      </div>
    </div>
  );
};

export default Modal;