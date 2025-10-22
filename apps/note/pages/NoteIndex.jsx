import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { animateCSS } from "../services/util.service.js"

const { useState, useEffect } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [selectedNoteId, setSelectedNoteId] = useState(null)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }

    function onRemoveNote(noteId, { target }) {
        const elLi = target.closest('div')
        noteService.remove(noteId)
            .then(() => animateCSS(elLi, 'fadeOut'))
            .then(() => setNotes(prev => prev.filter(note => note.id !== noteId)))
            .catch(err => console.log('err:', err))
    }

    function onSetColorNote(noteId, color) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === noteId
                    ? { ...note, style: { ...(note.style || {}), backgroundColor: color } }
                    : note
            )
        )

        const noteToSave = notes.find(note => note.id === noteId)
        if (!noteToSave) return

        const updatedNote = { ...noteToSave, style: { ...(noteToSave.style || {}), backgroundColor: color } }
        noteService.save(updatedNote).catch(err => console.log('Failed to save color change', err))
    }

    function onSelectNoteId(noteId) {
        setSelectedNoteId(noteId)
    }

    function onUpdateNote(noteId, updatedInfo) {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note =>
                note.id === noteId
                    ? { ...note, info: { ...note.info, ...updatedInfo } }
                    : note
            )

            const noteToSave = updatedNotes.find(note => note.id === noteId)
            if (noteToSave) noteService.save(noteToSave).catch(err => console.log('Failed to save note', err))

            return updatedNotes
        })
    }

    function onAddNote(type, inputTxt, url) {
        if (!inputTxt && !url) return

        const newNote = noteService.getEmptyNote(type)
        if (type === 'NoteTxt') newNote.info.txt = inputTxt
        if (type === 'NoteImg') newNote.info.url = url

        setNotes(prev => [newNote, ...prev])
        noteService.save(newNote).catch(err => console.log('Failed to save note', err))
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index">
            <NoteHeader />
            <NoteAdd onAddNote={onAddNote} />
            <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onSelectNoteId={onSelectNoteId}
                onSetColorNote={onSetColorNote}
                onUpdateNote={onUpdateNote}
            />
        </section>
    )
}
