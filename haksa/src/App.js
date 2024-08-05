import { Container } from 'react-bootstrap';
import './App.css';
import MenuPage from './common/MenuPage';
import { useState } from 'react';
import { BoxContext } from './contexts/BoxContext';
import Box from './common/Box';

function App() {
  const [box, setBox] = useState({
    show:false,
    message:'',
    action:null,
    action2:''
  });

  return (
    <BoxContext.Provider value={{box, setBox}}>
      <Container>
        <MenuPage/>
      </Container>
      {box.show && <Box box={box} setBox={setBox}/>}
    </BoxContext.Provider>
  );
}

export default App;
