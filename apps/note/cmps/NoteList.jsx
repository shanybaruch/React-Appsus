import { NotePreview } from "./NotePreview.jsx"
import { NoteIndex } from "../pages/NoteIndex.jsx"


export function NoteList({ notes, onRemoveNote, onSelectNoteId, onSetColorNote, onSetTxtNote }) {
    if (!notes || !notes.length) return <div>No Notes To Show...</div>

    return (
        <ul className="notes-list">
            {notes.map(note => (
                <li key={note.id} className="note-item">
                    <NotePreview 
                        note={note} 
                        onClick={() => onSelectNoteId(note.id)}
                        onRemoveNote={onRemoveNote} 
                        onSetColorNote={onSetColorNote}
                        onSetTxtNote={onSetTxtNote}
                    />
                </li>
            ))}
        </ul>
    )
}