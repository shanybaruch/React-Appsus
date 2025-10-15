import { debounce } from "../services/util.service.js"

const { useState, useEffect, useRef } = React

export function MailFilter({ filterBy, onSetFilterBy }) {

    const [filterByToEdit, setFilterByToEdit] = useState({ ...filterBy })

    useEffect(() => {
        onSetFilterBy(filterByToEdit)
    }, [filterByToEdit])

    // function handleChange({ target }) {
    //     const field = target.name
    //     let value = target.value
    //     switch (target.type) {
    //         case 'number':
    //         case 'range':
    //             value = +value
    //             break;

    //         case 'checkbox':
    //             value = target.checked
    //             break
    //     }
    //     setFilterByToEdit(prevFilter => ({ ...prevFilter, [field]: value }))
    // }

     function onSubmitFilter(ev) {
        ev.preventDefault()
        onSetFilterBy(filterByToEdit)
    }

    // const { subject, date } = filterByToEdit

    return (
        <section className="mail-filter">
            <form onSubmit={onSubmitFilter}>
                        {/* <button onChange={handleChange} value={subject} name="subject" id="subject" type="button">
                            All
                        </button> */}


            </form>
            {/* <button>All</button>
            <button>Subject</button>
            <button >date</button> */}
        </section>
    )
}