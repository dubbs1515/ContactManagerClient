import React, { Fragment, useContext } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';

const Contacts = () => {
    // Initialize context
    const contactContext = useContext(ContactContext);

    // Destructure
    const { contacts, filtered } = contactContext;

    if (contacts.length === 0) {
        return <h4>No contacts to display...</h4>
    }

    return (
        <Fragment>
            <TransitionGroup>
                {filtered !== null ?
                    // Display filtered contacts 
                    filtered.map(contact => (
                    <CSSTransition key={contact.id} timeout={500} classNames="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>))
                :
                    // Display all contacts 
                    contacts.map(contact => (
                    <CSSTransition key={contact.id} timeout={500} classNames="item">
                        <ContactItem contact={contact} />
                    </CSSTransition>))
                }
            </TransitionGroup>
        </Fragment>
    );
};

export default Contacts;
