const { useState, useEffect } = React

export function NotePreviewIcon({ note, onRemoveNote, onSetTxtNote, onSetColorNote, onUpdateNote  }){
    const { type, info, style, id } = note
    const [showColorMenu, setShowColorMenu] = useState(false)
    const [isModalOpen, setIsModalOpen] = useState(false)
    const [formData, setFormData] = useState({ ...info })

}