import { NotePreview } from "./NotePreview.jsx"


export function NoteList({ notes, onRemoveNote, onSelectNoteId, onSetColorNote, onSetTxtNote, updatedInfo, onUpdateNote }) {
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
                        updatedInfo={updatedInfo}
                        onUpdateNote={onUpdateNote}
                    />
                </li>
            ))}
        </ul>
    )
}