const { Link, NavLink } = ReactRouterDOM


export function MailHeader() {
    return (
        <section className="mail-header flex space-between">

            <section className="side-header flex">
                <a className="menu fa-solid fa-bars"></a>
                <Link className="flex align-center" to="/">
                    <img className="logo-img" src="assets/css/img/logo.png" alt="logo" />
                    <h3 className="logo-title">MisterEmail</h3>
                </Link>
            </section>

            <section className="search-line">
                <section className="input-container">
                    <input type="text" placeholder="Search mail" className="search-input" />
                    <span className="sort fa-solid fa-sliders"></span>
                </section>
            </section>

            <section className="flex align-center">
                <a className="settings fa-solid fa-gear"></a>
            </section>

        </section>
    )
}