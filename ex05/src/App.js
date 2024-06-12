import logo from './logo.svg';
import './App.css';
import ListPage from './components/bbs/ListPage';
import { Container } from 'react-bootstrap';
import BBSRouter from './components/BBSRouter';
import UserRouter from './components/UserRouter';

function App() {
  return (
    <Container className='py-5'>
      <a href="/bbs/list" className='me-5'>게시판</a>
      <a href="/users/login">로그인</a>
      <hr/>
      <BBSRouter/>
      <UserRouter/>
    </Container>
  );
}

export default App;
