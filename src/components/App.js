import React, {useState, useEffect }from "react";
import { BrowserRouter as Router, Route, Switch } from "react-router-dom";
import Header from "./Header"
import AddContact from "./AddContact"
import ContactList from "./ContactList"
import ContactDetails from "./ContactDetails";
import "./App.css"
import api from "../api/contacts";
import EditContact from "./EditContact";

function App() {
  const { v4: uuidv4 } = require('uuid');
    const LOCAL_STORAGE_KEY = "contacts"
    const [contacts, setContacts] = useState([]);
   
    const addContactHandler = async (contact) => {
      const request = {
        id: uuidv4(),
        ...contact,
      };

      const response = await api.post("/contact",request);

       setContacts([...contacts, response.data]); 
      }

      const updateContactHandler = async (contact) => {
        const response = await api.put(`/contact/${contact.id}`, contact);
        console.log(response.data);
        const {id, name, email} = response.data;
        setContacts(contacts.map((contact) => {
            return contact.id === id ? {...response.data} : contact;
          })
        );
      }
    const removeContactHandler = async (id) =>{
      await api.delete(`/contact/${id}`)
        const newContactList = contacts.filter( (contact) => {
            return contact.id !== id;
        });
        setContacts(newContactList);
    }

    //Retreive conatcts from API db.json file/server
    const retriveContacts = async () => {
       const response = await api.get("/contact");
       return response.data;
    }
      useEffect( () => {
        // const retrieveContacts = JSON.parse(localStorage.getItem(LOCAL_STORAGE_KEY));
        // setContacts(retrieveContacts);

        const getAllContacts = async () => {
          const allContacts = await retriveContacts();
          if(retriveContacts) setContacts(allContacts);
        }
        getAllContacts();
      },[])

    useEffect( () => {
      if(contacts.length > 0) {
        localStorage.setItem(LOCAL_STORAGE_KEY,JSON.stringify(contacts));
      }
      
    },[contacts])

  

  return (
    <div className="ui container ">
      <Router>
      <Header />
        <Switch>
        <Route path="/" exact 
                render ={(props) => (
                  <ContactList 
                  { ...props}
                  contacts = {contacts}
                  getContactId = {removeContactHandler}
                  />
                )}
          />
          <Route path="/add"
            render = {(props) => (
              <AddContact {...props} addContactHandler={addContactHandler}/>
              )}
            />
          <Route path="/edit"
          render = {(props) => (
            <EditContact {...props} updateContactHandler = {updateContactHandler}/>
            )} 
            />
      
      </Switch> 
      </Router>
    </div>
  );
}

export default App;
