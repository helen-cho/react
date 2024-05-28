import './App.css';
import { Container } from 'react-bootstrap';
import TopPage from './components/TopPage';
import BottomPage from './components/BottomPage';
import MenuPage from './components/MenuPage';

function App() {
  return (
    <Container>
      <TopPage/>
      <MenuPage/>
      <BottomPage/>
    </Container>
  );
}

export default App;
