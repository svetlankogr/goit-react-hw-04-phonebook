import { nanoid } from 'nanoid';
import { Component } from 'react';

import { ContactForm } from './ContactForm/ContactForm';
import { ContactList } from './ContactList/ContactList';
import { Filter } from './Filter/Filter';
export class App extends Component {
  state = {
    contacts: [],
    filter: '',
  };

  componentDidMount() {
    const contacts = localStorage.getItem('contacts');
    if (contacts) {
      const patsedContacts = JSON.parse(contacts);
      this.setState({ contacts: patsedContacts });
    }
  }

  componentDidUpdate(_, prevState) {
    const newContacts = this.state.contacts;
    const prevContacts = prevState.contacts;

    if (newContacts !== prevContacts) {
      localStorage.setItem('contacts', JSON.stringify(newContacts));
    }
  }

  onFormSubmit = data => {
    const isAtContacts = this.state.contacts.find(
      contact => contact.name === data.name
    );
    if (isAtContacts) {
      alert('Already in Contacts');
      return;
    }
    const newContact = { ...data, id: nanoid() };
    this.setState(prevState => ({
      contacts: [...prevState.contacts, newContact],
    }));
  };
  deleteContact = id => {
    this.setState(prevState => ({
      contacts: prevState.contacts.filter(contact => contact.id !== id),
    }));
  };
  onInputChange = filteredContact => {
    this.setState({
      filter: filteredContact,
    });
  };
  filteredContacts = () => {
    const { contacts, filter } = this.state;
    return contacts.filter(contact =>
      contact.name.toLowerCase().includes(filter.toLowerCase())
    );
  };

  render() {
    const filteredContacts = this.filteredContacts();
    return (
      <div>
        <h1>Phonebook</h1>
        <ContactForm onFormSubmit={this.onFormSubmit} />

        <h2>Contacts</h2>
        <Filter onInputChange={this.onInputChange} />
        <ContactList
          contacts={filteredContacts}
          deleteContact={this.deleteContact}
        />
      </div>
    );
  }
}
