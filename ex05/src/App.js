import './App.css';
import { Container } from 'react-bootstrap';
import MenuPage from './components/MenuPage';
import { useState } from 'react';
import { UserContext } from './contexts/UserContext';

function App() {
  const [user, setUser] = useState({
    uname:'',
    photo:'',
    point:0
  });

  return (
    <UserContext.Provider value={{user, setUser}}>
      <Container className='py-5'>
        <MenuPage/>
      </Container>
    </UserContext.Provider>
  );
}

export default App;
