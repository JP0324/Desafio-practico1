import React,{useState, useEffect} from "react";
import ContactList from "./components/ContactList";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [contacts, setContacts] = useState([]);

  // Cargar contactos desde el archivo JSON al iniciar
  useEffect(() => {
    const fetchContacts = async () => {
      const response = await fetch('/contacts.json');
      const data = await response.json();
      setContacts(data);
    };

    fetchContacts();
  }, []);

  const addContact = (newContact) => {
    setContacts([...contacts, newContact]);
  };

  const deleteContact = (id) => {
    setContacts(contacts.filter((contact) => contact.id !== id));
  };

  const toggleFavorite = (id) => {
    setContacts(
      contacts.map((contact) =>
        contact.id === id
          ? { ...contact, isFavorite: !contact.isFavorite }
          : contact
      )
    );
  };

  // Ordenar contactos para mostrar favoritos primero
  const sortedContacts = contacts.sort((a, b) => b.isFavorite - a.isFavorite);

  return (
    <div>
      <h2>Lista de Contactos</h2>
      <Form addContact={addContact} />
      <ContactList
        contacts={sortedContacts}
        deleteContact={deleteContact}
        toggleFavorite={toggleFavorite}
      />
    </div>
  );
}

export default App;