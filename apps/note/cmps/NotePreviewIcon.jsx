const { useState, useEffect, useRef  } = React

export function NotePreviewIcon({ note, onRemoveNote, onSetTxtNote }) {
    const { type, info, style, id } = note
    // const [bgColor, setBgColor] = useState(style?.backgroundColor || "white");

    const colorsRef = useRef(null);      // ref לפאנל הצבעים
    const noteRef = useRef(null);        // ref ל-div של ה-note

    function handleColorClick(color) {
        if (noteRef.current) {
            noteRef.current.style.backgroundColor = color; // משנה את הצבע מיידית
        }
        if (colorsRef.current) {
            colorsRef.current.style.display = "none";      // סוגר את הפאנל
        }
    }

    function showColors() {
        if (colorsRef.current) {
            colorsRef.current.style.display = "block";
        }
    }


    return (
        <section  ref={noteRef} className="nav-note-icons">
            <div className="icon">
                <i onClick={showColors} className="fa-solid fa-palette"></i>
                <div  ref={colorsRef}id={`colors-${id}`} style={{ display: "none", marginTop: "10px" }}>
                    <button onClick={() => handleColorClick("red")}>🔴</button>
                    <button onClick={() => handleColorClick("blue")}>🔵</button>
                    <button onClick={() => handleColorClick("green")}>🟢</button>
                    <button onClick={() => handleColorClick("yellow")}>🟡</button>
                </div>
            </div>
            <div className="icon" ><i className="fa-solid fa-thumbtack"></i></div>
            <div className="icon-trash" onClick={ev => onRemoveNote(note.id, ev)}>
                <i className="fa-solid fa-trash-can"></i>
            </div>
            <div className="icon" onClick={ev => onSetTxtNote(ev)}>
                <i className="fa-regular fa-pen-to-square"></i>
                {/* <input type="text" /> */}
            </div>
        </section>
    )
}