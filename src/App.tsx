import React from 'react';
import './App.css';
import { Contact } from './models/contact.model';
import { useAddContactMutation, useDelContactMutation, useGetContactQuery, useGetContactsQuery, useUpdateContactMutation } from './services/contacts-api';

function App() {
  const { isLoading, data, error, isFetching, isSuccess } =
    useGetContactsQuery();
  return (
    <div className='App'>
      <header className='App-header'>
        <h1>Redux Toolkit Query</h1>
      </header>
      <main>
        {isLoading && <p>Loading...</p>}
        {isFetching && <p>Fetching...</p>}
        {error && <p>Error</p>}
        {isSuccess && (
          <div>
            {data?.map((contact) => (
              <div key={contact.id}>
                <p>{contact.name}</p>
                <ContactDetails id={contact.id as string} />
              </div>
            ))}
          </div>
        )}
        <AddContact/>
      </main>
    </div>
  );
}

export const ContactDetails = ({id}: {id: string}) => {
  const {data } =
    useGetContactQuery(id);
  return (
    <div>
      <pre>
        {JSON.stringify(data, undefined, 2)}
      </pre>
    </div>
  );
};

export const AddContact = () => {
  const [addContact] = useAddContactMutation()
  const [updateContact] = useUpdateContactMutation();
  const [delContact] = useDelContactMutation();
  const contact: Contact = {

    name: 'new contact 2',
    email: 'new2@gmail.com'
  }

  const addHandler = async  () => {
    await addContact(contact);
  }
  const updateHandler = async () => {
    await updateContact({...contact, id: '2'});
  }
  const deleteHandler = async () => {
    await delContact('2');
  }
  return (
    <>
      <button onClick={addHandler}>Add Contact</button>
      <button onClick={updateHandler}>Update Contact</button>
      <button onClick={deleteHandler}>Delte Contact</button>
    </>
  )
}


export default App;
