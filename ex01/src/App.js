import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookSearch from './components2/BookSearch';
import { Container } from 'react-bootstrap';
import InsertPage from './components2/InsertPage';
const App = () => {
    return (
        <Container>
            <InsertPage/>
        </Container>
    );
}

export default App;
