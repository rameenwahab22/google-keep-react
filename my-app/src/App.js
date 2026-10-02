import React, { useEffect, useState } from "react";
import Navbar from "./components/Navbar/Navbar";
import Sidebar from "./components/Sidebar/Sidebar";
import Form from "./components/Form/Form";
import Notes from "./components/Notes/Notes";
import Modal from "./components/Modal/Modal";

const NOTES = [];
const NOTES_STORAGE_KEY = "google-keep-notes";

const normalizeNote = (note) => ({
  ...note,
  color: note.color || "#ffffff",
  pinned: note.pinned ?? false,
  reminder: note.reminder ?? null,
});

const App = () => {
  const [notes, setNotes] = useState(() => {
    const savedNotes = localStorage.getItem(NOTES_STORAGE_KEY);
    const parsedNotes = savedNotes ? JSON.parse(savedNotes) : NOTES;
    return parsedNotes.map(normalizeNote);
  });
  const [selectedNote, setSelectedNote] = useState({});
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    localStorage.setItem(NOTES_STORAGE_KEY, JSON.stringify(notes));
  }, [notes]);

  const addNote = (note) => {
    setNotes((prevNotes) => {
      return [...prevNotes, normalizeNote(note)];
    });
  };
  const editNote = (editedNote) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        editedNote.id === note.id
          ? { ...note, title: editedNote.title, text: editedNote.text }
          : note
      )
    );
  };
  const changeNoteColor = (id, color) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, color } : note
      )
    );
  };
  const togglePinNote = (id) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, pinned: !note.pinned } : note
      )
    );
    setSelectedNote((prev) =>
      prev.id === id ? { ...prev, pinned: !prev.pinned } : prev
    );
  };
  const setReminder = (id, reminder) => {
    setNotes((prevNotes) =>
      prevNotes.map((note) =>
        note.id === id ? { ...note, reminder } : note
      )
    );
    setSelectedNote((prev) =>
      prev.id === id ? { ...prev, reminder } : prev
    );
  };
  const deleteNote = (id) => {
    setNotes((prevNotes) => {
      return prevNotes.filter((note) => id !== note.id);
    });
  };
  const toggleModal = () => {
    setIsModalOpen((prevState) => {
      return !prevState;
    });
  };

  return (
    <div className="app">
      <Navbar />
      <Sidebar />
      <main className="main-content">
      <Form addNote={addNote} />
      <Notes
        notes={notes}
        deleteNote={deleteNote}
        changeNoteColor={changeNoteColor}
        togglePinNote={togglePinNote}
        setReminder={setReminder}
        toggleModal={toggleModal}
        setSelectedNote={setSelectedNote}
      />
      </main>
      {isModalOpen && (
        <Modal
          isModalOpen={isModalOpen}
          selectedNote={selectedNote}
          toggleModal={toggleModal}
          editNote={editNote}
          changeNoteColor={changeNoteColor}
          togglePinNote={togglePinNote}
          setReminder={setReminder}
        />
      )}
    </div>
  );
};

export default App;
