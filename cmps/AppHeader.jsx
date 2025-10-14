const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return <header className="app-header flex space-between">
        <section className="side-header grid">
            <a class="menu fa-solid fa-bars"></a>
            <Link className="flex align-center" to="/">
                <img className="logo-img" src="assets/css/img/logo.png" alt="logo" />
                <h3 className="logo-title">MisterEmail</h3>
            </Link>
        </section>
        <section className="search-line">
            <input type="text" placeholder="Search mail" />
        </section>
        <nav>
            <NavLink to="/">Home</NavLink>
            <NavLink to="/about">About</NavLink>
            <NavLink to="/mail">Mail</NavLink>
            <NavLink to="/note">Note</NavLink>
        </nav>
    </header>
}
