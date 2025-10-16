export function NotePreview({ note, onClick }) {
    const { type, info, style } = note

    console.log(type);
    
    
   return (
        <article className="note-preview" style={style} onClick={onClick}>
            {type === 'NoteTxt' && <p>{info.txt}</p>}
            {type === 'NoteImg' && (
                <div>
                    <h4>{info.title}</h4>
                    <img src={info.url} alt={info.title} />
                </div>
            )}
            {type === 'NoteTodos' && (
                <div>
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
        </article>
    )
}