import { MailPreview } from "./MailPreview.jsx"

const { useState } = React
const { Link, Outlet, useNavigate, useOutletContext } = ReactRouterDOM

export function MailList() {

    const [selectedMails, setSelectedMails] = useState([]);
    const navigate = useNavigate()
    const { mails, onRemoveMail } = useOutletContext()

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

    function handleMailClick(mailId, ev) {
        if (ev.target.closest('.mail-checkbox')) return
        navigate(`/mail/${mailId}`)
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
                <div
                    key={mail.id}
                    style={{ position: 'relative' }}
                    onClick={(ev) => handleMailClick(mail.id, ev)}
                >
                    <MailPreview
                        mail={mail}
                        isSelected={selectedMails.includes(mail.id)}
                        onToggle={() => toggleSelection(mail.id)}
                    />
                </div>
            ))}
        </section>
    )
}
