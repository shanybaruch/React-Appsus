export function MailPreview({ mail }) {

    const { subject, txt, date } = mail

    return (
        <article className="mail-preview">
            <section className="checkbox-sub flex">
                <input type="checkbox" onClick={() => onRemoveMail(mail.id)} />
                <div className="mail-subject">{subject}</div>
            </section>
            <div className="mail-txt">{txt}</div>
            <div className="mail-date">{date}</div>
        </article>
    )
}