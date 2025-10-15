import { MailPreview } from "./MailPreview.jsx"

const {  Link } = ReactRouterDOM

export function MailList({mails, onRemoveMail}) {
    
    console.log('mails: ', mails)
    if (!mails.length) return <div>No Mails To Show...</div>

    return (
        <section className="mail-list">
            {mails.map(mail => (
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <section>
                        {/* <button onClick={() => onRemoveMail(mail.id)}>x</button> */}
                        {/* <Link to={`/mail/${mail.id}`}>Details</Link> */}
                    </section>
                </li>
            ))}
        </section>
    )
}
