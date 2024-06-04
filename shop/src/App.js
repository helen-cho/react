import './App.css';
import { Container } from 'react-bootstrap';
import TopPage from './components/TopPage';
import BottomPage from './components/BottomPage';
import MenuPage from './components/MenuPage';
import axios from 'axios';
import { useEffect, useState } from 'react';
import { CountContext } from './components/CountContext';
import AdminMenu from './components/AdminMenu';

function App() {
  const [count, setCount]= useState(0);
  const callAPICount = async() => {
    const res=await axios.get(`/cart/list?uid=${sessionStorage.getItem('uid')}`);
    //console.log('.........', res.data.length);
    setCount(res.data.length);
  }

  useEffect(()=> {
    callAPICount();
  }, []);

  return (
    <CountContext.Provider value={{count, setCount, callAPICount}}>
      <Container>
        <TopPage/>
        <MenuPage/>
        <BottomPage/>
      </Container>
    </CountContext.Provider>
  );
}

export default App;
