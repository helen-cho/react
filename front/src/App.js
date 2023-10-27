import './App.css';
import HeaderPage from './components/shop/HeaderPage';
import {Container} from 'react-bootstrap'
import RouterPage from './components/shop/RouterPage';
const App = () =>{
    const background="/images/header02.png";
    return (
        <Container>
            <img src={background} width="100%"/>
            <HeaderPage/>
            <RouterPage/>
        </Container>
    );
}

export default App;
