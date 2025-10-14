import { MailHeader } from "../cmps/MailHeader.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"


const { useState, useEffect } = React
const { Link, useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(bookService.getFilterFromParams(searchParams))

    useEffect(() => {
        console.log('filterby: ', filterBy);
        setSearchParams(cleanObject(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        bookService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get mails!')
            })
    }

    function onRemoveMail(mailId) {
        bookService.remove(mailId)
            .then(() => {
                setMails(mails => mails.filter(mail => mail.id !== mailId))
                showSuccessMsg('Mail removed successfully')
            })
            .catch(err => {
                console.log('Cannot removing mail:', err)
                showErrorMsg('Cannot removing mail')
            })
    }

    function onSetFilterBy(newFilterBy) {
        setFilterBy(prevFilter => ({ ...prevFilter, ...newFilterBy }))
    }

    if (!mails) return <div className="loader">Loading...</div>
    return (
        <section className="mail-index container">
            <section className="header grid">
                <MailHeader />

                <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} />

                <Link className="add-mail" to="/mail/edit">Add mail</Link>
                <MailList
                    mails={mails}
                    onRemoveMail={onRemoveMail}
                />

            </section>
        </section>
    )
}

