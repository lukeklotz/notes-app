import './App.css';

import { useState } from 'react';

interface Note {
  id: number;
  title: string;
  content: string;
}

const App = () => {

  function changeBodyColor() {
    document.body.style.backgroundColor = '#' + Math.floor(Math.random()*16777215).toString(16);;
  }
  
  const [notes, setNotes] = useState<Note[]>([
    {
      id: 1,
      title: "new note",
      content: "im a new note!",
    }
    ]);

  const [title, setTitle] = useState("");
  const [content, setContent] = useState("");
  const [selectedNote, setSelectedNote] = useState<Note | null>(null);
  const [noteSwitches, setNoteSwitches] = useState<{ [key: number]: boolean }>({});

  const newNote: Note = {
    id: notes.length + 1,
    title: title,
    content: content,
  };

  const handleNoteClick = (note: Note) => {
    setSelectedNote(note);
    setTitle(note.title);
    setContent(note.content);
  };

  const handleAddNote = (event: React.FormEvent) => {
    event.preventDefault();
    setNotes([newNote, ...notes]);
  };


const handleUpdateNote = (event: React.FormEvent) => {
  event.preventDefault();

  if (!selectedNote) {
    return;
  }

  const updatedNote: Note = {
    id: selectedNote.id,
    title: title,
    content: content,
  };

  const updatedNotesList = notes.map((note) => (note.id === selectedNote.id ? updatedNote : note));

  setNotes(updatedNotesList);
  setTitle("");
  setContent("");
  setSelectedNote(null);
};

const handleCancel = () => {
  setTitle("");
  setContent("");
  setSelectedNote(null);
};

const deleteNote = (event: React.MouseEvent, noteId: number) => {
  event.stopPropagation();

  const updatedNotes = notes.filter((note) => note.id !== noteId);

  setNotes(updatedNotes);
};

const toggleView = (event: React.MouseEvent, noteId: number) => {
  event.stopPropagation();

    // Toggle the state for the specific note
    setNoteSwitches((prevSwitches) => ({
      ...prevSwitches,
      [noteId]: !prevSwitches[noteId],
    }));

    // Additional logic can be added here based on the function's purpose
    console.log(`Switch for Note ${noteId} is now:`, noteSwitches[noteId] ? 'On' : 'Off');
}
  
  return (
    <div className="app-container">
      
      
      <form 
        className="note-form" 
        onSubmit={(event) => (selectedNote ? handleUpdateNote(event) : handleAddNote(event))}
      >
        {selectedNote ? (
          <div className="edit-buttons">
            <button type="submit">Save</button>
            <button onClick={handleCancel}>Cancel</button>
          </div>
        ) : (
          <button type="submit">Add Note</button>
        )}
        <input 
            
            value = {title}
            onChange = {(event) => 
            setTitle(event.target.value)
          }
          placeholder="Title" required 

        />
        
        <textarea 
          
          value = {content}
          onChange={(event) => 
          setContent(event.target.value)}
          placeholder="Content" rows={10} required 
        
        />

        <button type="submit">Add Note</button>
      </form>

      
      <div className="notes-grid">
      {notes.map((note)=>
        <div key={note.id} className={`note-item ${noteSwitches[note.id] ? 'visible' : 'hidden'}`}>
          {noteSwitches[note.id] ? (
              <div className="note-item">
              <div key={note.id} className="note-item" onClick={() => handleNoteClick(note)}>
                <div className="notes-header">
                  <button
                   key={note.id} onClick={(event) => deleteNote(event, note.id)}>x</button>
                </div>
                <h2>{note.title}</h2>
                <p>{note.content}</p>
              </div>
            </div>
          ) : (
            <div>empty</div>
          )}
          
        </div>
        )}
      </div>

      <div className="side-panel">
        {notes.map((note)=>
          <div key={note.id} className="hide-note" onClick={(event) => toggleView(event, note.id)}>
            {note.title}
          </div>
        )}
      </div>

      <div className="footer">
        <button type="button" onClick={() => changeBodyColor()} id="change-backgrond-color"> random-background-color </button>
      </div>
    </div>

    
  );
}

export default App;
