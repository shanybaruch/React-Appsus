import { NoteImg } from "../cmps/NoteImg.jsx"
import { NoteText } from "../cmps/NoteText.jsx"
import { NoteTodos } from "../cmps/NoteTodos.jsx"

const { useState, useEffect } = React

export function NotePreviewIcon({ note, onRemoveNote, onSetTxtNote, onSetColorNote, onUpdateNote  }) {
    const { type, info, style, id } = note
    const [showColorMenu, setShowColorMenu] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({ ...info })

    function toggleColors() {
        setShowColorMenu(prev => !prev)
    }

    function handleColorClick(color) {
        onSetColorNote(id, color)
    }

    function openModal() {
        setFormData({ ...info })
        setIsModalOpen(true)
    }

    function closeModal() {
        setIsModalOpen(false);
    }

    function handleChange(ev) {
        const { name, value } = ev.target;
        setFormData(prev => ({ ...prev, [name]: value }))
    }

    function handleTodoChange(index, value) {
        setFormData(prev => {
            const todos = [...prev.todos]
            todos[index].txt = value;
            return { ...prev, todos }
        })
    }

    function handleSubmit(ev) {
        ev.preventDefault()
        onUpdateNote(id, formData)
        closeModal()
    }

    return (
        <section className="nav-note-icons">
            <div className="icon">
                <i onClick={toggleColors} className="fa-solid fa-palette"></i>
                {showColorMenu && (
                    <div style={{ marginTop: "10px" }}>
                        <button onClick={() => handleColorClick("red")}>🔴</button>
                        <button onClick={() => handleColorClick("blue")}>🔵</button>
                        <button onClick={() => handleColorClick("green")}>🟢</button>
                        <button onClick={() => handleColorClick("yellow")}>🟡</button>
                    </div>
                )}
            </div>
            <div className="icon" ><i className="fa-solid fa-thumbtack"></i></div>
            <div className="icon-trash" onClick={ev => onRemoveNote(note.id, ev)}>
                <i className="fa-solid fa-trash-can"></i>
            </div>
            <div className="icon">
                <i className="fa-regular fa-pen-to-square" onClick={openModal}></i>
            </div>

            {isModalOpen && (
                <div className="modal-overlay" onClick={closeModal}>
                    <div className="modal-content" onClick={ev => ev.stopPropagation()}>
                        <form onSubmit={handleSubmit}>
                            {formData.title && (
                                <input
                                    type="text"
                                    name="title"
                                    value={formData.title}
                                    onChange={handleChange}
                                    placeholder="Edit title"
                                    autoFocus
                                />
                            )}

                            {formData.txt && (
                                <textarea
                                    name="txt"
                                    value={formData.txt}
                                    onChange={handleChange}
                                    placeholder="Edit text"
                                />
                            )}

                            {formData.todos && formData.todos.map((todo, idx) => (
                                <input
                                    key={idx}
                                    type="text"
                                    value={todo.txt}
                                    onChange={ev => handleTodoChange(idx, ev.target.value)}
                                    placeholder={`Todo ${idx + 1}`}
                                />
                            ))}

                            <button type="submit">Save</button>
                            <button type="button" onClick={closeModal}>X</button>
                        </form>
                    </div>
                </div>
            )}
        </section>
    );
}