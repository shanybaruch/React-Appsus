export function MailPreview({ mail }) {

    const { subject, date } = mail

    return (
        <article className="mail-preview">
            <h2>Subject: {subject}</h2>
            <h4>Date: {date}</h4>
        </article>
    )
}