import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { noteService } from "../services/note.service.js"
import { animateCSS } from "../services/util.service.js"
// import { NoteDetails } from "./NoteDetails.jsx"

const { useState, useEffect, Fragment } = React

export function NoteIndex() {    
    const [notes, setNotes] = useState(null)
    const [selectedNoteId, setSelectedNoteId] = useState(null)
    // const defaultFilter = React.useMemo(() => noteService.getDefaultFilter(), [])
    // const [filterBy, setFilterBy] = useState(defaultFilter)

    useEffect(() => {
        loadNotes()
    }, [])

    function loadNotes() {
        noteService.query()
            .then(setNotes)
            .catch(err => console.log('err:', err))
    }

    function onRemoveNote(noteId, { target }) {
        const elLi = target.closest('li')

        noteService.remove(noteId)
            .then(() => animateCSS(elLi, 'fadeOut'))
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSelectNoteId(noteId) {
        setSelectedNoteId(noteId)
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index">
            <NoteHeader />
           <NoteList
                notes={notes}
                onRemoveNote={onRemoveNote}
                onSelectNoteId={onSelectNoteId}
            />
        </section>
    )
}