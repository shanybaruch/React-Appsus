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

            <section className="add-mail-header">
                <h1 className="title">New Message</h1>
                <button>_</button>
                <button><i className="fa-solid fa-up-right-and-down-left-from-center"></i></button>
                <button>x</button>
            </section>

            <form className={`${loadingClass} form`} onSubmit={onSaveMail}>

                <section>
                    <label htmlFor="to">To</label>
                    <input value={to} type="text" onChange={handleChange} name="to" id="to" />
                </section>

                <input placeholder="Subject" onChange={handleChange} value={subject}
                    id='subject' type="text" name='subject' />

                <input onChange={handleChange} value={txt}
                    id='txt' type="text" name='txt' />

                <section className="flex">
                    <input type="text" onChange={handleChange} value={txt} name="txt" id="txt" />
                </section>

                <button className="btn-send">Send</button>

            </form>
        </section>
    )
}
