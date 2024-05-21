import 'bootstrap/dist/css/bootstrap.min.css';
import './App.css';
import Todos from './components/Todos';
import { Row, Col} from 'react-bootstrap';
import Posts from './components/Posts';

const App = () => {
    return (
        <div className="App">
            <Row>
                <Col><Posts/></Col>
                <Col><Todos/></Col>
            </Row>
        </div>
    );
}

export default App;
