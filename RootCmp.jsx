const { Route, Routes } = ReactRouterDOM
const Router = ReactRouterDOM.HashRouter

import { AppHeader } from './cmps/AppHeader.jsx'
import { UserMsg } from './cmps/UserMsg.jsx'
import { About } from './pages/About.jsx'
import { Home } from './pages/Home.jsx'
import { MailIndex } from './apps/mail/pages/MailIndex.jsx'
import { NoteIndex } from './apps/note/pages/NoteIndex.jsx'
import { MailAdd } from './apps/mail/cmps/MailAdd.jsx'
import { MailDetails } from './apps/mail/cmps/MailDetails.jsx'
import { MailFilter } from './apps/mail/cmps/MailFilter.jsx'

export function RootCmp() {
    return <Router>
        <section className="root-cmp">
            <AppHeader />
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/about" element={<About />} />
                <Route path="/mail" element={<MailIndex />}>
                    <Route path=":mailId" element={<MailDetails />} />
                </Route>
                <Route path="/note" element={<NoteIndex />} />
                <Route path="/book" element />
            </Routes>
            <UserMsg />
        </section>
    </Router>
}
