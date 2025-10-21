const { Link, NavLink } = ReactRouterDOM
const { useState } = React

export function MailHeader({ onToggleFilter, defaultFilter, onSetFilterBy }) {

    const [isOpen, setIsOpen] = useState(false)
    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })

    function toggleIsOpen() {
        setIsOpen(prev => {
            const newVal = !prev
            onToggleFilter(newVal)
            return newVal
        })
    }

    function handleChange({ target }) {
        const field = target.name
        let value = target.value

        switch (target.type) {
            case 'number':
            case 'range':
                value = +value
                break;

            case 'checkbox':
                value = target.checked
                break
        }
        setFilterByToEdit(filterBy => ({ ...filterBy, [field]: value }))
    }

    function onSaveFilter(ev) {
        ev.preventDefault()
        console.log('filter:', filterByToEdit);
        onSetFilterBy(filterByToEdit)
    }

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
                    <span className="search fa-solid fa-magnifying-glass" onClick={onSaveFilter}></span>
                    <input 
                    onChange={handleChange} 
                    type="text" 
                    placeholder="Search mail" 
                    className="search-input" 
                    value={filterByToEdit.from} 
                    id="txt" 
                    name="txt" 
                    />
                    <span className="sort fa-solid fa-sliders" onClick={toggleIsOpen}></span>
                </section>
            </section>

            <section className="flex align-center">
                <a className="settings fa-solid fa-gear"></a>
            </section>

        </section>
    )
}