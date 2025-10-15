import { utilService } from './util.service.js'
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
    getFilterFromParams,
    cleanObject,
}

function query(filterBy = {}) {
    return storageService.query(MAIL_KEY)
        .then(mails => {
            if (filterBy.txt) {
                const regExp = new RegExp(filterBy.txt, 'i')
                mails = mails.filter(mail => regExp.test(mail.txt))
            }
            if (filterBy.read) {
                mails = mails.filter(mail => mail.read === filterBy.read)
            }
            console.log(' mails:', mails)
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


function getEmptyMail(subject = '', txt = '', read = false,) {
    return { subject, txt, read }
}


function getDefaultFilter() {
    return { txt: '', read: false }
}



function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('Udemy'),
            _createMail('Sapporo'),
            _createMail('Jewelry'),
            _createMail('RavKav'),
            _createMail('Google'),
            _createMail('Sdarot'),
            _createMail('Movies'),
            _createMail('Titanic'),
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(subject, txt, read) {
    const mail = getEmptyMail(subject, txt, read)
    mail.id = utilService.makeId()
    mail.txt = 'lorem ipsum'
    mail.read = Math.random() > 0.5
    mail.date = _getRandomDate()

    return mail
}



function _getRandomDate() {
    const start = new Date('2023-01-01').getTime(); 
    const end = new Date().getTime();
    
    const randomTimestamp = start + Math.random() * (end - start);
    const randomDate = new Date(randomTimestamp);
    
    return randomDate.toISOString().slice(0, 10); 
}



function getFilterFromParams(searchParams) {
    const txt = searchParams.get('txt') || ''
    const readParam = searchParams.get('read')
    const read = readParam === null ? '' : readParam === 'true'

    return { txt, read }
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


function cleanObject(obj) {
    const cleaned = {}
    for (const key in obj) {
        const value = obj[key]
        if (value !== '' && value !== null && value !== undefined) {
            cleaned[key] = value
        }
    }
    return cleaned
}