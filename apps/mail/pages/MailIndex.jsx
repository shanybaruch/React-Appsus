import { MailHeader } from "../cmps/MailHeader.jsx"

const { Link, NavLink } = ReactRouterDOM

export function MailIndex() {
    return (
        <section className="mail-app container">
            <section className="header grid">
                <MailHeader />

                {/* <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />
                <Link className="add-mail" to="/mail/edit">Add mail</Link>
            <MailList
                mails={mails}
                onRemoveMail={onRemoveMail}
                /> */}

                </section>
        </section>
    )
}

