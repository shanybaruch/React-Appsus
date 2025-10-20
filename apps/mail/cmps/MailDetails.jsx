import { mailService } from "../../../services/mail.service.js";

const { useState, useEffect } = React
const { useParams, useNavigate } = ReactRouterDOM

export function MailDetails({ onToggleDetail }) {

    const { mailId } = useParams()
    const [mail, setMail] = useState(null)
    const navigate = useNavigate()


    useEffect(() => {
        mailService.query()
            .then(mails => {
                const foundMail = mails.find(mail => mail.id === mailId)
                setMail(foundMail)
            })
    }, [mailId])


    if (!mail) return <div className="load grid"><h1>Loading...</h1></div>
    return (
        <section className="mail-details grid">
            <section className="page-details">

                <button className="btn-back" onClick={() => navigate('/mail')}>
                    <span className="fa-solid fa-arrow-left"></span>
                </button>
                <h2 className="subject">{mail.subject}</h2>

                <section className="body">
                    <p className="from">From: {mail.from}</p>
                    <p className="to">To: {mail.to}</p>
                    <p className="txt">{mail.txt}</p>
                </section>

            </section>
        </section>
    )
}