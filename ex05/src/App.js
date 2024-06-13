import './App.css';
import { Container } from 'react-bootstrap';
import MenuPage from './components/MenuPage';
import StarRating from './components/common/StarRating';

function App() {
  return (
    <Container className='py-5'>
      <MenuPage/>
    </Container>
  );
}

export default App;
