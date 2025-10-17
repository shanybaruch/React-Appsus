export function MailPreview({ mail, isSelected, onToggle }) {
    const { subject, to, txt, date } = mail 
    // console.log(date);

    return (
        <article className="mail-preview grid">
            <section className="checkbox-sub flex">
                <input
                    type="checkbox"
                    checked={isSelected}
                    onChange={onToggle} />
                <div className="from-to">{to}</div>
            </section>
            <section className="description flex">
                <div className="mail-subject">{subject}</div>
                <div className="mail-txt">{txt}</div>
            </section>
            <div className="mail-date">{date}</div>
        </article>
    )
}