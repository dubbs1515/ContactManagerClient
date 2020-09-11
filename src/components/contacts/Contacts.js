import React, { Fragment, useContext, useEffect } from 'react';
import { CSSTransition, TransitionGroup } from 'react-transition-group';
import ContactContext from '../../context/contact/contactContext';
import ContactItem from './ContactItem';
import Spinner from '../layout/Spinner';

const Contacts = () => {
	// Initialize context
	const contactContext = useContext(ContactContext);

	// Destructure
	const { contacts, filtered, getContacts, loading } = contactContext;

	useEffect(() => {
		getContacts();
		// eslint-disable-next-line
	}, []); // Empty brackets -> run at beginning

	if (contacts !== null && contacts.length === 0 && !loading) {
		return <h4>No contacts to display...</h4>;
	}

	return (
		<Fragment>
			{contacts !== null && !loading ? (
				<TransitionGroup>
					{filtered !== null
						? // Display filtered contacts
						  filtered.map(contact => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames='item'>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))
						: // Display all contacts
						  contacts.map(contact => (
								<CSSTransition
									key={contact._id}
									timeout={500}
									classNames='item'>
									<ContactItem contact={contact} />
								</CSSTransition>
						  ))}
				</TransitionGroup>
			) : (
				<Spinner />
			)}
		</Fragment>
	);
};

export default Contacts;
