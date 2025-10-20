import { MailHeader } from "../cmps/MailHeader.jsx"
import { showErrorMsg, showSuccessMsg } from "../services/event-bus.service.js"
import { mailService } from "../../../services/mail.service.js"
import { MailList } from "../cmps/MailList.jsx"
import { MailFilter } from "../cmps/MailFilter.jsx"
import { MailSideNav } from "../cmps/MailSideNav.jsx"
import { MailAdd } from "../cmps/MailAdd.jsx"

const { useState, useEffect } = React
const { Link, Outlet, useSearchParams } = ReactRouterDOM

export function MailIndex() {

    const [mails, setMails] = useState(null)
    const [searchParams, setSearchParams] = useSearchParams()
    const [filterBy, setFilterBy] = useState({ txt: '', unread: false, read: false })
    const [isFilterOpen, setIsFilterOpen] = useState(false)
    const [isAddOpen, setIsAddOpen] = useState(false)

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

    //  function handleChildChange(value) {
    //     { value ? !value : value }
    //     setIsAddOpen(value)
    // }

    function handleToggleFilter(isOpen) {
        setIsFilterOpen(isOpen)
    }

    function handleToggleAdd(shouldReload = false) {
        setIsAddOpen(prevIsAddOpen => !prevIsAddOpen)
        if (shouldReload) loadMails()
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
                <MailHeader onToggleFilter={handleToggleFilter} />
                <section className="page grid">
                    <section className="page-side flex">
                        <button className="btn-compose " onClick={handleToggleAdd}>
                            <span className="fa-solid fa-pen"></span>
                            Compose
                        </button>
                        <MailSideNav mails={mails} />
                    </section>
                    <section className="page-main">
                        <MailList
                            mails={mails}
                            onRemoveMail={onRemoveMail}
                        />
                    </section>
                    <Outlet />
                </section>
                {isAddOpen && <MailAdd onToggleAdd={handleToggleAdd} />}
                {isFilterOpen && <MailFilter onSetFilterBy={onSetFilterBy} defaultFilter={filterBy} />}
            </section>

        </section>
    )
}

