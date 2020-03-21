import React, { useContext, useState } from 'react'
import ContactContext from '../../context/contact/contactContext';

// useState bc a form calls for a degree of component level state
const ContactForm = () => {

    const contactContext = useContext(ContactContext);

    // Component level state items (as oppossed to app level state items)
    const [contact, setContact] = useState({
        name: '',
        email: '',
        phone: '',
        type: 'personal'
    });

    const { name, email, phone, type} = contact;

    // ... spread operator to copy current state
    // e.target.name to determine the name of the value being changed
    // e.target.value to get the value of the input being changed
    const onChange = e => setContact({ ...contact, [e.target.name]: e.target.value });

    const onSubmit = e => {
        e.preventDefault();
        contactContext.addContact(contact);
        setContact({
            name: '',
            email: '',
            phone: '',
            type: 'personal'
        });
        // Reset state
    }

    return (
        <form onSubmit={onSubmit}>
            <h2 className='text-primary'>Add Contact</h2>
            <input type='text' placeholder='Name' name='name' value={name} onChange={onChange} />
            <input type='email' placeholder='Email' name='email' value={email} onChange={onChange} />
            <input type='text' placeholder='Phone' name='phone' value={phone} onChange={onChange} />
            <h5>Contact Type</h5>
            <input type='radio' name='type' value='personal' checked={type === 'personal'} onChange={onChange} />
            Personal{' '}
            <input type='radio' name='type' value='professional' checked={type === 'professional'} onChange={onChange} />
            Professional{' '}
            <div>
                <input type='submit' value='Add Contact' className='btn btn-primary btn-block' />
            </div>

        </form>
    )
}

export default ContactForm
