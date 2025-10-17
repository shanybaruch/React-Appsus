import { MailPreview } from "./MailPreview.jsx"

const { useState } = React
const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail }) {

    const [selectedMails, setSelectedMails] = useState([]);


    function toggleSelection(mailId) {
        setSelectedMails(prev =>
            prev.includes(mailId)
                ? prev.filter(id => id !== mailId)
                : [...prev, mailId]
        );
    }

    function handleDelete() {
        selectedMails.forEach(mailId => onRemoveMail(mailId));
        setSelectedMails([])
    }


    console.log('mails: ', mails)
    if (!mails.length) return <div>No Mails To Show...</div>
    return (
        <section className="mail-list">

            {selectedMails.length > 0 && (
                <button className="btn-delete" 
                style={{ marginLeft: '15px', background: 'none' }} 
                onClick={handleDelete}
                >
                    <span className="delete fa-solid fa-trash-can"></span>
                </button>
            )}

            {mails.map(mail => (
                <MailPreview
                    key={mail.id}
                    mail={mail}
                    isSelected={selectedMails.includes(mail.id)}
                    onToggle={() => toggleSelection(mail.id)}
                />
            ))}

        </section>
    )
}
