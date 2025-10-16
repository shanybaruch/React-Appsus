const { Link, NavLink } = ReactRouterDOM


export function NoteHeader() {
    return (
        <section className="mail-header flex space-between">

            <section className="side-header grid">
                <a className="menu fa-solid fa-bars"></a>
                <Link className="flex align-center" to="/">
                    <img className="logo-img" src="apps/note/img/keepLogo.png" alt="logo" />
                    <h3 className="logo-title">Keep</h3>
                </Link>
            </section>

            <section className="search-line">
                <input type="text" placeholder="Search" />
            </section>

            <section className="flex align-center">
                <a className="settings fa-solid fa-gear"></a>
            </section>

        </section>
    )
}