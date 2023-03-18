import React, {useState, useEffect }from "react";
import Header from './Header'
import AddContact from './AddContact'
import ContactList from './ContactList'
import "./App.css"

function App() {
  const { v4: uuidv4 } = require('uuid');
    const LOCAL_STORAGE_KEY = "contacts"
    const [contacts, setContacts] = useState([]);
   
    const addContactHandler = (contact) => {
       setContacts([...contacts, {id:uuidv4(),...contact}]); 
      }
    const removeContactHandler = (id) =>{
        const newContactList = contacts.filter( (contact) => {
            return contact.id !== id;
        });
        setContacts(newContactList);
    }

      useEffect( () => {
        const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        setContacts(retrieveContacts);
      },[])

    useEffect( () => {
      if(contacts.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
      }
      
    },[contacts])

  

  return (
    <div className="ui container ">
     <Header />
     <AddContact addContactHandler = {addContactHandler}/>
     <ContactList contacts = {contacts} getContactId = {removeContactHandler}/>
    </div>
  );
}

export default App;
