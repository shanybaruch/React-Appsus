import { mailService } from "../services/mail.service.js";

const { useNavigate, useParams } = ReactRouterDOM
const { useState, useEffect } = React

export function MailAdd() {
    const [mailToAdd, setMailToAdd] = useState(mailService.getEmptyMail())
    const [isLoading, setIsLoading] = useState(false)

    const navigate = useNavigate()
    const { MailId } = useParams()

    useEffect(() => {
        if (MailId) loadMail()
    }, [])

    function loadMail() {
        setIsLoading(true)
        mailService.get(MailId)
            .then(mail => {
                if (!mail) {
                    navigate('/mail')
                    return
                }
                const formMail = {
                    id: mail.id || '',
                    subject: mail.subject || '',
                    txt: mail.txt || '',
                    date: mail.date || '',
                }
                setMailToAdd({ ...mail, ...formMail })
            })
            .catch(err => {
                console.log('err:', err)
                navigate('/mail')
            })
            .finally(() => setIsLoading(false))
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':

                if (field === 'pageCount') {
                    value = value === '' ? '' : +value
                    setMailToAdd(prev => ({ ...prev, pageCount: value }))
                    return
                }
                break

            case 'range':
                value = +value
                break

            case 'checkbox':
                value = target.checked
                break
        }
        setMailToAdd(prevMail => ({ ...prevMail, [field]: value }))
    }

    function onSaveMail(ev) {
        ev.preventDefault()
        mailService.save(mailToAdd)
            .then(() => {
                navigate('/mail')
                showSuccessMsg('Mail added!')
            })
            .catch(err => {
                console.log('err: ', err)
                showErrorMsg('Cannot save mail...')
            })
    }

    const {
        subject,
        to,
        txt,
    } = mailToAdd

    console.log('mail to add: ', mailToAdd);
    const loadingClass = isLoading ? 'loading' : ''
    return (
        <section className="mail-add">

            <section className="add-mail-header flex space-between ">
                <h1 className="title">New Message</h1>
                <section className="btns">
                    <button className="btn bold" type="button">_</button>
                    <button className="btn" type="button">
                        <a className="fa-solid fa-up-right-and-down-left-from-center">
                        </a>
                    </button>
                    <button className="btn" type="button">
                        <a className="fa-solid fa-xmark">
                        </a>
                    </button>
                </section>
            </section>

            <form className={`${loadingClass} form grid`} onSubmit={onSaveMail}>

                <section className="section-input-to flex align-center">
                    <label className="label-to" htmlFor="to">To</label>
                    <input className="input-to" autoFocus value={to} type="text" onChange={handleChange} name="to" id="to" />
                </section>

                <input className="input-subject" placeholder="Subject" onChange={handleChange} value={subject}
                    id='subject' type="text" name='subject' />

                <section className="flex">
                    <textarea rows="16" type="text"  onChange={handleChange} value={txt} name="txt" id="txt"></textarea>
                </section>

                <button className="btn-send">Send</button>

            </form>
        </section>
    )
}
