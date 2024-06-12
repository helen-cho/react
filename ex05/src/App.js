import logo from './logo.svg';
import './App.css';
import ListPage from './components/bbs/ListPage';
import { Container } from 'react-bootstrap';
import BBSRouter from './components/BBSRouter';

function App() {
  return (
    <Container>
      <a href="/bbs/list">게시판</a>
      <BBSRouter/>
    </Container>
  );
}

export default App;
