import { NoteHeader } from "../cmps/NoteHeader.jsx"
import { NoteAdd } from "../cmps/NoteAdd.jsx"
import { NoteList } from "../cmps/NoteList.jsx"
import { NotePreviewIcon } from "../cmps/NotePreviewIcon.jsx"
import { noteService } from "../services/note.service.js"
import { animateCSS } from "../services/util.service.js"

// import { NoteDetails } from "./NoteDetails.jsx"

const { useState, useEffect, Fragment } = React

export function NoteIndex() {
    const [notes, setNotes] = useState(null)
    const [selectedNoteId, setSelectedNoteId] = useState(null)
    const [inputValue, setInputValue] = useState('')
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
        const elLi = target.closest('div')

        noteService.remove(noteId)
            .then(() => animateCSS(elLi, 'fadeOut'))
            .then(() => {
                setNotes(notes => notes.filter(note => note.id !== noteId))
            })
            .catch(err => console.log('err:', err))
    }

    function onSetColorNote(noteId, color) {
        setNotes(prevNotes =>
            prevNotes.map(note =>
                note.id === noteId
                    ? {
                        ...note,
                        style: { ...(note.style || {}), backgroundColor: color }
                    }
                    : note
            )
        )

        const noteToSave = notes.find(note => note.id === noteId)
        if (!noteToSave) return

        const updatedNote = {
            ...noteToSave,
            style: { ...(noteToSave.style || {}), backgroundColor: color }
        }

        noteService.save(updatedNote)
            .catch(err => console.log('Failed to save color change', err))
    }

    function onSelectNoteId(noteId) {
        setSelectedNoteId(noteId)
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }

    function onUpdateNote(noteId, updatedInfo) {
        setNotes(prevNotes => {
            const updatedNotes = prevNotes.map(note =>
                note.id === noteId
                    ? { ...note, info: { ...note.info, ...updatedInfo } }
                    : note
            )

            const noteToSave = updatedNotes.find(note => note.id === noteId)
            if (noteToSave) {
                noteService.save(noteToSave)
                    .catch(err => console.log('Failed to save note', err))
            }

            return updatedNotes
        })
    }
    function onAddNote(type, inputValueTxt, inputValueImg, inputValueTodo) {
        if (!inputValueTxt) return

        const newNote = noteService.getEmptyNote(type)

        if (type === 'NoteTxt') {
            newNote.info.txt = inputValueTxt;
        }
        else if (type === 'NoteTodos') {
            console.log(inputValueTodo);
            
            newNote.info.todos.push(inputValueTodo)
            newNote.info = inputValueTxt
            console.log(newNote);
            
        }
        else if (type === 'NoteImg') {
            console.log(inputValueTxt, inputValueImg)
            
            newNote.info.title = inputValueTxt
            newNote.info.url = inputValueImg
            console.log(newNote)
            
        }

        const updatedNotes = [newNote, ...notes]
        setNotes(updatedNotes);
        noteService.save(newNote).catch(err => console.log('Failed to save note', err))

    }

    if (!notes) return <div>Loading...</div>

    return (
        <section className="note-index">
            <NoteHeader />
            <NoteAdd
                notes={notes}
                onAddNote={onAddNote} />
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