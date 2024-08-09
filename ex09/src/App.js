import { Container } from 'react-bootstrap';
import TopPage from './components/TopPage';
import MenuPage from './components/MenuPage';
import BottomPage from './components/BottomPage';

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
