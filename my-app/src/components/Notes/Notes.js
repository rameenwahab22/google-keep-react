import "./Notes.css";
import Note from "./Note";

const Notes = (props) => {
  const { notes, deleteNote, changeNoteColor, togglePinNote, setReminder, toggleModal, setSelectedNote } = props;

  const sortedNotes = [...notes].sort((a, b) => {
    if (a.pinned && !b.pinned) return -1;
    if (!a.pinned && b.pinned) return 1;
    return 0;
  });

  return (
    <div className="notes">
      {notes.length === 0 ? (
        <p>Notes you add appear here.</p>
      ) : (
        sortedNotes.map((note) => (
          <Note
            key={note.id}
            note={note}
            deleteNote={deleteNote}
            changeNoteColor={changeNoteColor}
            togglePinNote={togglePinNote}
            setReminder={setReminder}
            toggleModal={toggleModal}
            setSelectedNote={setSelectedNote}
          />
        ))
      )}
    </div>
  );
};

export default Notes;
