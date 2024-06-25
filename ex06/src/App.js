import './App.css';
import { Container } from 'react-bootstrap';
import MenuPage from './common/MenuPage';
import { useState } from 'react';
import { BoxContext } from './common/BoxContext';
import Box from './common/Box';

function App() {
  const [box, setBox] = useState('');

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
