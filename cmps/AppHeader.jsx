const { Link, NavLink } = ReactRouterDOM

export function AppHeader() {

    return (
        <header className="app-header">
            <nav className="apps-nav flex">
                <NavLink to="/">Home</NavLink>
                <NavLink to="/about">About</NavLink>
                <NavLink to="/mail">Mail</NavLink>
                <NavLink to="/note">Note</NavLink>
                <NavLink to="/book">Book</NavLink>
            </nav>
        </header>
    )
}
