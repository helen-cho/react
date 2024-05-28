import './App.css';
import { Container } from 'react-bootstrap';
import TopPage from './components/TopPage';
import BottomPage from './components/BottomPage';
import HomePage  from './components/HomePage';

function App() {
  return (
    <Container>
      <TopPage/>
      <HomePage/>
      <BottomPage/>
    </Container>
  );
}

export default App;
