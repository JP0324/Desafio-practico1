import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import React,{useState, useEffect} from "react";
import ContactList from "./components/ContactList";
import Form from "./components/Form";
import "./App.css";

function App() {
  const [count, setCount] = useState(0)
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

  <>
  <div>
    <a href="https://vite.dev" target="_blank">
      <img src={viteLogo} className="logo" alt="Vite logo" />
    </a>
    <a href="https://react.dev" target="_blank">
      <img src={reactLogo} className="logo react" alt="React logo" />
    </a>
  </div>
  <h1>Vite + React</h1>
  <div className="card">
    <button onClick={() => setCount((count) => count + 1)}>
      count is {count}
    </button>
    <p>
      Edit <code>src/App.jsx</code> and save to test HMR
    </p>
  </div>
  <p className="read-the-docs">
    Click on the Vite and React logos to learn more
  </p>
</>


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