const { useState, useEffect, useRef } = React

export function MailFilter({ defaultFilter, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...defaultFilter })
    const initialFilterBy = useRef({ ...defaultFilter })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

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

    function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    function onClearFilter() {
        setFilterByToEdit(initialFilterBy.current)
    }

    const { read, unread } = filterByToEdit
    console.log('filterByToEdit:', filterByToEdit)

    return (
        <section className="mail-filter">
            <form onSubmit={onSubmitFilter} className="grid">
                <section className="section-unread flex align-center">
                    <input
                        onChange={handleChange}
                        checked={filterByToEdit.unread ? true : false}
                        id="unread"
                        type="checkbox"
                        name="unread" />
                    <label htmlFor="unread">Unread Mail</label>
                </section>
                <section className="section-read flex align-center">
                    <input
                        onChange={handleChange}
                        checked={filterByToEdit.read ? true : false}
                        id="read"
                        type="checkbox"
                        name="read" />
                    <label htmlFor="read">Read Mail</label>
                </section>
            </form>

            <button type="button" onClick={onClearFilter}>Clear</button>
        </section>
    )
}