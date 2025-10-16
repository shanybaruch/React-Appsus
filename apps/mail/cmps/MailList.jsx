import { MailPreview } from "./MailPreview.jsx"

const { Link } = ReactRouterDOM

export function MailList({ mails, onRemoveMail }) {

    console.log('mails: ', mails)
    if (!mails.length) return <div>No Mails To Show...</div>

    return (
        <section className="mail-list">
            {mails.map(mail => (
                <li key={mail.id} className="">
                    <MailPreview mail={mail} onRemoveMail={onRemoveMail} />
                </li>
            ))}
        </section>
    )
}
