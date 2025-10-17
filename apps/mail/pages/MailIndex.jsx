import { MailHeader } from "../cmps/MailHeader.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { mailService } from "../../../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSideNav } from "../cmps/MailSideNav.jsx"

const { useState, useEffect } = React
const { Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState(mailService.getFilterFromParams(searchParams))

    useEffect(() => {
        console.log('filterby: ', filterBy);
        setSearchParams(mailService.cleanObject(filterBy))
        loadMails()
    }, [filterBy])

    function loadMails() {
        mailService.query(filterBy)
            .then(setMails)
            .catch(err => {
                console.log('err:', err)
                showErrorMsg('Cannot get mails!')
            })
    }

    function onRemoveMail(mailId) {
        mailService.remove(mailId)
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
                <section className="main-page grid">
                    <section className="main-side flex">
                        <Link className="add-mail" to="/mail/add"> <span className="fa-solid fa-pen"></span>Compose</Link>
                        <MailSideNav />
                    </section>
                    <MailList
                        mails={mails}
                        onRemoveMail={onRemoveMail}
                    />
                    <Outlet />
                </section>
                {/* <MailFilter onSetFilterBy={onSetFilterBy} filterBy={filterBy} /> */}
            </section>
        </section>
    )
}

