const { useState } = React;

export function NoteAdd({ onAddNote }) {
    const [inputTxt, setInputTxt] = useState('');
    const [imageUrl, setImageUrl] = useState(null);

    function onImgInput(ev) {
        const file = ev.target.files[0];
        if (!file) return;

        const reader = new FileReader();
        reader.onload = (event) => {
            setImageUrl(event.target.result); // תצוגה מקדימה
        };
        reader.readAsDataURL(file);
    }

    function handleSave(type) {
        if (type === 'NoteTxt' && !inputTxt) return;
        if (type === 'NoteImg' && !imageUrl) return;

        // שולח ל-parent ליצור פתק חדש
        onAddNote(type, inputTxt, imageUrl);

        // איפוס
        setInputTxt('');
        setImageUrl(null);
    }

    return (
        <section className="add-note">
            <div className="text-note">
                <input
                    type="text"
                    placeholder="New Note"
                    value={inputTxt}
                    onChange={(e) => setInputTxt(e.target.value)}
                />
                <button type="button" onClick={() => handleSave('NoteTxt')}>
                    Add Text
                </button>
            </div>

            <div className="img-note">
                <label htmlFor="file-input">Add Image</label>
                <input
                    id="file-input"
                    type="file"
                    accept=".jpg, .jpeg, .png, .webp"
                    onChange={onImgInput}
                />
                {imageUrl && <img src={imageUrl} alt="Preview" style={{ maxWidth: '200px' }} />}
                <button type="button" onClick={() => handleSave('NoteImg')}>
                    Add Image Note
                </button>
            </div>
        </section>
    );
}
