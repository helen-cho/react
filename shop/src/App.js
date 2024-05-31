import './App.css';
import { Container } from 'react-bootstrap';
import TopPage from './components/TopPage';
import BottomPage from './components/BottomPage';
import MenuPage from './components/MenuPage';
import { useEffect, useState } from 'react';
import { CountContext } from './components/CountContext';
import axios from 'axios';

function App() {
  const [count, setCount] = useState(0);
  const getUserCount = async() => {
    const res=await axios.get('/users/count');
    console.log(res.data.count);
    setCount(res.data.count);
  }

  useEffect(()=>{
    getUserCount();
  }, []);

  return (
    <CountContext.Provider value={{count, setCount, getUserCount}}>
      <Container>
        <TopPage/>
        <MenuPage/>
        <BottomPage/>
      </Container>
    </CountContext.Provider>
  );
}

export default App;
