

const { useState, useEffect } = React

export function NoteAdd({ notes, setNotes, onAddNote }) {
    const [inputValueTxt, setInputTxt] = useState('');
    const [inputValueImg, setInputImg] = useState('');
    const [placeholder, setPlaceholder] = useState('New Note');
    const [placeholderImg, setPlaceholderImg] = useState('add link');
    const [inputValueTodo, setInputTodo] = useState('');
    const [placeholderTodo, setPlaceholderTodo] = useState('add todo');
    const [noteType, setNoteType] = useState('NoteTxt');
    const [imgInputVisible, setImgInputVisible] = useState(false);
    const [todoInputVisible, setTodoInputVisible] = useState(false);

    // const [notes, setNotes] = useState(null)

    function addNote(type, inputValueTxt, inputValueImg) {
        setImgInputVisible(false)
        setTodoInputVisible(false)
        setInputTxt('')
        setInputImg('')
        setPlaceholder('New Note')

        if (type === 'NoteTxt') onAddNote(type, inputValueTxt)
        if (type === 'NoteImg') {
            if (inputValueTxt || inputValueImg) {
                return
            }
            else {
                setImgInputVisible(true)
                setNoteType('NoteImg')
                setPlaceholderImg('Add image link')
                setPlaceholder('Add Text')
                setInputTxt('')
            }
        }
        if (type === 'NoteTodos') {onAddNote(type,inputValueTxt,'', inputValueTodo)
            console.log(inputValueTodo);
            
        }

        if (!inputValueTxt) return
    }

    return (
        <section className="add-note">
            <form action="">
                <input type="text"
                    value={inputValueTxt}
                    onChange={(e) => setInputTxt(e.target.value)}
                    placeholder={placeholder} />

                <button type="button" onClick={() => addNote('NoteTxt', inputValueTxt)}>txt</button>
                <button type="button" onClick={() => setTodoInputVisible(true)}>checkbox</button>
                <div className={todoInputVisible ? 'container-todo visible' : 'container-todo hidden'}>
                    <input type="text"
                        className="input-todo"
                        value={inputValueTodo}
                        onChange={(e) => setInputTodo(e.target.value)}
                        placeholder={placeholderTodo} />

                </div>
                <div className={todoInputVisible ? 'input-todo visible' : 'input-todo hidden'}>
                    <button type="button" onClick={() => addNote('NoteTodo', inputValueTxt,'', inputValueTodo)}>save</button>
                    <button>+</button>
                </div>  


                <button type="button" onClick={() => setImgInputVisible(true)}>img</button>
                <input type="text"
                    className={imgInputVisible ? 'input-img visible' : 'input-img hidden'}
                    value={inputValueImg}
                    onChange={(e) => setInputImg(e.target.value)}
                    placeholder={placeholderImg} />


            </form>
            <div className={imgInputVisible ? 'input-img visible' : 'input-img hidden'}>
                <button type="button" onClick={() => addNote('NoteImg', inputValueTxt, inputValueImg)}>save</button>
            </div>


        </section>
    )

}