import { NotePreview } from "./NotePreview.jsx"
// import { NoteIndex } from "../pages/NoteIndex.jsx"


export function NoteList({ notes, onRemoveNote, onSelectNoteId }) {
    if (!notes || !notes.length) return <div>No Notes To Show...</div>

    return (
        <ul className="notes-list">
            {notes.map(note => (
                <li key={note.id} className="note-item">
                    <NotePreview 
                        note={note} 
                        onClick={() => onSelectNoteId(note.id)} 
                    />
                    <button onClick={(ev) => onRemoveNote(note.id, ev)}>x</button>
                </li>
            ))}
        </ul>
    )
}