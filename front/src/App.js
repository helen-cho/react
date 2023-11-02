import './App.css';
import HeaderPage from './components/shop/HeaderPage';
import {Container} from 'react-bootstrap'
import RouterPage from './components/shop/RouterPage';
import { useState } from 'react';
import { BoxContext } from './components/shop/BoxContext';
import BoxModal from './components/shop/BoxModal';

const App = () =>{
    const background="/images/header02.png";
    const [box, setBox] = useState({
        show:false,
        message:'',
        action:null
    });

    return (
        <BoxContext.Provider value={{box, setBox}}>
            <Container>
                <img src={background} width="100%"/>
                <HeaderPage/>
                <RouterPage/>
                {box.show && <BoxModal/>}
            </Container>
        </BoxContext.Provider>
    );
}

export default App;
