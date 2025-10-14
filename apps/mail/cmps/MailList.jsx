const {  Link } = ReactRouterDOM

export function MailList(mails, onRemoveMail) {

    if (!mails.length) return <div>No Mails To Show...</div>

    return (
        <section className="mail-list">

             {mails.map(mail => (
                <li key={mail.id}>
                    <MailPreview mail={mail} />
                    <section>
                        <button onClick={() => onRemoveCar(mail.id)}>
                            Remove
                        </button>
                        <button >
                            <Link to={`/mail/${mail.id}`}>Details</Link>
                        </button>
                        <button >
                            <Link to={`/mail/edit/${mail.id}`}>Edit</Link>
                        </button>
                    </section>
                </li>
            ))}

        </section>
    )
}
