export function MailPreview({ mail, isSelected, onToggle }) {
    const { subject, to, txt, date, from, read } = mail 
    // console.log(date);

    return (
        <article className={`mail-preview grid ${read ? 'read' : 'unread'}`}>
            <section className="checkbox-sub flex">
                <input
                className="mail-checkbox"
                    type="checkbox"
                    checked={isSelected}
                    onChange={onToggle} />
                <div className="from">{from || 'You'}</div>
            </section>
            <section className="description flex">
                <div className="mail-subject">{subject}</div>
                <div className="mail-txt">{txt}</div>
            </section>
            <div className="mail-date">{date}</div>
        </article>
    )
}