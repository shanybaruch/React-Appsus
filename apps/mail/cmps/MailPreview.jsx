export function MailPreview({ mail }) {

    const { subject, txt, date } = mail

    return (
        <article className="mail-preview">
            <div className="mail-subject">{subject}</div>
            <div className="mail-txt">{txt}</div>
            <div className="mail-date">{date}</div>
        </article>
    )
}