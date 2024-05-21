import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import BookSearch from './components2/BookSearch';
import { Container } from 'react-bootstrap';
const App = () => {
    return (
        <Container>
            <BookSearch/>
        </Container>
    );
}

export default App;
