export function MailPreview({ mail, isSelected, onToggle, onRemoveMail }) {
    const { subject, to, txt, date, from, read } = mail

    return (
        <article className={`mail-preview grid ${read ? 'read' : 'unread'}`}>
            <section className="checkbox-sub flex">
                {/* <input
                    className="mail-checkbox"
                    type="checkbox"
                    checked={isSelected}
                    onChange={onToggle} /> */}
                <div className="from">{from || 'You'}</div>
            </section>
            <section className="description flex">
                <div className="mail-subject">{subject}</div>
                <div className="mail-txt">{txt}</div>
            </section>
            <div className="mail-date">{date}</div>
            <span
                className="delete-icon"
                onClick={(ev) => {
                    ev.stopPropagation();
                    onRemoveMail(mail.id);
                }}
            >
                <span className="fa-solid fa-trash"></span>
            </span>
        </article>
    )
}