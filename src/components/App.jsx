import { nanoid } from 'nanoid';
import { useState, useEffect } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
export const App = () => {
  const [contacts, setContacts] = useState(
    () => JSON.parse(localStorage.getItem('contacts')) ?? []
  );
  const [filter, setFilter] = useState('');

  useEffect(() => {
    localStorage.setItem('contacts', JSON.stringify(contacts));
  }, [contacts]);

  const onFormSubmit = data => {
    const isAtContacts = contacts.find(contact => contact.name === data.name);
    if (isAtContacts) {
      alert('Already in Contacts');
      return;
    }
    const newContact = { ...data, id: nanoid() };
    setContacts(prevState => [...prevState, newContact]);
  };

  const deleteContact = id => {
    setContacts(prevState => prevState.filter(contact => contact.id !== id));
  };

  const onInputChange = filteredContact => {
    setFilter(filteredContact);
  };

  const filterContacts = () => {
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };
  const filteredContacts = filterContacts();
  return (
    <div>
      <h1>Phonebook</h1>
      <ContactForm onFormSubmit={onFormSubmit} />

      <h2>Contacts</h2>
      <Filter onInputChange={onInputChange} />
      <ContactList contacts={filteredContacts} deleteContact={deleteContact} />
    </div>
  );
};
