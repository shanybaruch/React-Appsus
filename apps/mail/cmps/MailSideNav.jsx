export function MailSideNav({ mails }) {
    const unreadCount = mails.filter(mail => !mail.read).length

    return (
        <section className="mail-side-nav">
            <section className="section-inbox flex align-center space-between">
                <section className="flex left-side align-center">
                    <span className="icon-inbox fa-solid fa-inbox"></span>
                    <p className="inbox">Inbox</p>
                </section>
                <span className="unread-count">{unreadCount}</span>
            </section>
            <p>Sent</p>
            <p>Draft</p>
            <p>Trash</p>
        </section>
    )
}