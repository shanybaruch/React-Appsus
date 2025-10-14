import { loadFromStorage, makeId, saveToStorage } from './util.service.js'
import { storageService } from './async-storage.service.js'

const MAIL_KEY = 'mailDB'
_createMails()

export const mailService = {
    query,
    get,
    remove,
    save,
    getEmptyMail,
    getDefaultFilter,
    getFilterFromSearchParams
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.subject) {
                const regExp = new RegExp(filterBy.subject, 'i')
                mails = mails.filter(mail => regExp.test(mail.subject))
            }
            if (filterBy.date) {
                mails = mails.filter(mail => mail.date >= filterBy.date)
            }
            // console.log(' mails:', mails)
            return mails
        })
}

function get(mailId) {
    return storageService.get(MAIL_KEY, mailId).then(_setNextPrevMailId)
}

function remove(mailId) {
    // return Promise.reject('Oh No!')
    return storageService.remove(MAIL_KEY, mailId)
}

function save(mail) {
    if (mail.id) {
        return storageService.put(MAIL_KEY, mail)
    } else {
        return storageService.post(MAIL_KEY, mail)
    }
}


function getEmptyMail(subject = '', date = '') {
    return { subject, date, description }
}


function getDefaultFilter() {
    return { subject: '', date: '' }
}



function _createMails() {
    let mails = loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('Udemy', '2025-05-17'),
            _createMail('Sapporo', '2025-01-5'),
            _createMail('Jewelry', '2024-12-2'),
            _createMail('RavKav', '2023-03-1')
        ]
        saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, date) {
    const mail = getEmptyMail(subject, date)
    mail.id = makeId()
    mail.description = 'lorem ipsum'
    return mail
}



function getFilterFromSearchParams(searchParams) {
    const subject = searchParams.get('subject') || ''
    const date = searchParams.get('date') || ''
    return {
        subject,
        date
    }
}



function _setNextPrevMailId(mail) {
    return query().then((mails) => {
        const mailIdx = mails.findIndex((currMail) => currMail.id === mail.id)
        const nextMail = mails[mailIdx + 1] ? mails[mailIdx + 1] : mails[0]
        const prevMail = mails[mailIdx - 1] ? mails[mailIdx - 1] : mails[mails.length - 1]
        mail.nextMailId = nextMail.id
        mail.prevMailId = prevMail.id
        return mail
    })
}