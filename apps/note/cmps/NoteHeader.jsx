const { Link, NavLink } = ReactRouterDOM


export function NoteHeader() {
    return (
        <section className="note-header flex space-between">

            <section className="side-header flex">
                <a className="menu fa-solid fa-bars"></a>
                <Link className="flex align-center" to="/">
                    <img className="logo-img" src="/apps/note/img/keepLogo.png" alt="logo" />
                    <h3 className="logo-title">Keep</h3>
                </Link>
            </section>

            <section className="search-line-note">
                <section className="input-container">
                    <span className="search fa-solid fa-magnifying-glass"></span>
                    <input type="text" placeholder="Search" className="search-input" />

                </section>
            </section>

            <section className="flex align-center">
                <a className="settings fa-solid fa-gear"></a>
            </section>

        </section>
    )
}