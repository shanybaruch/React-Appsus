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
            if (filterBy.from) {
                mails = mails.filter(mail => mail.from === filterBy.from)
            }

            const { read, unread } = filterBy;
            if (read && unread) {
            } else if (unread) {
                mails = mails.filter(mail => !mail.read)
            } else if (read) {
                mails = mails.filter(mail => mail.read) 
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


function getEmptyMail( from = '',to = '', subject = '', txt = '', read = false,) {
    return { from, to, subject, txt, read }
}


function getDefaultFilter() {
    return { from: '', to: '', txt: '', read: false }
}



function _createMails() {
    let mails = utilService.loadFromStorage(MAIL_KEY)
    if (!mails || !mails.length) {
        mails = [
            _createMail('Udemy','udemy', 'hi! its udemy'),
            _createMail('Sapporo', 'Best Jewelry', 'sale sale sale!!!'),
            _createMail('Jewelry', 'My jewelrys...', 'welcome our family'),
            _createMail('RavKav', 'ravkav Tel-Aviv', 'no much money in your card'),
            _createMail('Google', 'Mail', 'We cannot to send message'),
            _createMail('Sdarot', 'Welcome back!', 'You can see all our movies in free!'),
            _createMail('Movies', 'Hello', 'Dont forget, new moveis uploaded'),
            _createMail('Titanic', 'one thing', 'this was cerfully'),
        ]
        utilService.saveToStorage(MAIL_KEY, mails)
    }
}

function _createMail(from, subject, txt, read, to, isSelect) {
    const mail = getEmptyMail(from, subject, txt, read, to, isSelect)
    mail.id = utilService.makeId()
    mail.subject = subject || 'No subject'
    mail.txt = txt || 'Description lorem ipsum'
    mail.read = Math.random() > 0.5
    mail.date = _getRandomDate()
    mail.to = 'You'
    mail.from = from || 'Unknnown'
    mail.isSelect = false

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