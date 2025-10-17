

const { useState, useEffect } = React
export function NotePreviewIcon({ note, onRemoveNote }) {
    const { type, info, style, id } = note

    return(
        <section className="nav-note-icons">
            <div className="icon"><i className="fa-solid fa-palette"></i></div>
            <div className="icon"><i className="fa-solid fa-thumbtack"></i></div>
            <div className="icon" onClick={ev => onRemoveNote(note.id, ev)}><i className="fa-solid fa-trash-can"></i></div>
            <div className="icon"><i className="fa-regular fa-pen-to-square"></i></div>
        </section>
    )
}