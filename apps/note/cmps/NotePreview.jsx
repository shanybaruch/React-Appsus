import { NotePreviewIcon } from "../cmps/NotePreviewIcon.jsx"

export function NotePreview({ note, onClick, onRemoveNote  }) {
    const { type, info, style } = note

    console.log(note);
    
    
   return (
        <article className="note-preview" style={style} onClick={onClick}>
            {type === 'NoteTxt' && <p class="NoteTxt" style={style}>{info.txt}</p>}
            {type === 'NoteImg' && (
                <div class="NoteImg" style={style}>
                    <h4>{info.title}</h4>
                    <img src={info.url} alt={info.title} />
                </div>
            )}
            {type === 'NoteTodos' && (
                <div class="NoteTodos" style={style}>
                    <h4>{info.title}</h4>
                    <ul>
                        {info.todos.map((todo, idx) => (
                            <li key={idx}>
                                <input type="checkbox" checked={!!todo.doneAt} readOnly />
                                {todo.txt}
                            </li>
                        ))}
                    </ul>
                </div>
            )}
            <NotePreviewIcon 
            note={note} 
            onClick={onClick}
            onRemoveNote={onRemoveNote} />
        </article>
    )
}