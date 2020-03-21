import React, { useContext } from 'react';
import PropTypes from 'prop-types';
import ContactContext from '../../context/contact/contactContext';


const ContactItem = (props) => {

    const contactContext = useContext(ContactContext);
    const { deleteContact, setCurrent, clearCurrent } = contactContext;

    // Alternative to destructuring directly in arguments
    const { id, name, email, phone, type } = props.contact;

    const onDelete = () => {
        deleteContact(id);
        clearCurrent();
    }

    return (
        <div className='card bg-light'>
            <h3 className="text-primary text-left">
                {name}{' '}<span className={'badge ' + (type === 'professional' ?
                'badge-success' : 'badge-primary')}>
                    {/* Capitalize first letter */}
                    {type.charAt(0).toUpperCase() + type.slice(1) }</span>
            </h3>
            <ul className="list">
                {email && (
                    <li><i className="className fas fa-envelope-open"></i>&nbsp;{email}</li>
                )}
                {phone && (
                    <li><i className="className fas fa-phone"></i>&nbsp;{phone}</li>
                )}
            </ul>
            <p>
                <button className="btn btn-dark btn-sm" onClick={() => setCurrent(props.contact)}>Edit</button>
                <button className="btn btn-danger btn-sm" onClick={onDelete}>Delete</button>
            </p>
        </div>
    )
}

ContactItem.propTypes = {
    contact: PropTypes.object.isRequired
}

export default ContactItem
