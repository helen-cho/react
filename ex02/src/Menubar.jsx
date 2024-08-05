import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import RouterPage from './components/RouterPage';
import { useLocation, useNavigate } from 'react-router-dom';

const Menubar = () => {
    const location = useLocation();
    const path=location.pathname;
    const navi = useNavigate();
    const onClickLogout = (e) => {
        e.preventDefault();
        if(window.confirm('정말로 로그아웃하실래요?')){
            sessionStorage.clear();
            navi('/');
        }
    }
    return (
        <>
            <Navbar expand="lg"  bg="primary" variant='dark'>
                <Container fluid>
                    <Navbar.Brand href="#">LOGO</Navbar.Brand>
                    <Navbar.Toggle aria-controls="navbarScroll" />
                    <Navbar.Collapse id="navbarScroll">
                    <Nav
                        className="me-auto my-2 my-lg-0"
                        navbarScroll>
                        <Nav.Link href="/book/search" className={path.startsWith('/book') && 'active'}>도서검색</Nav.Link>
                        <Nav.Link href="/local/search" className={path.startsWith('/local') && 'active'}>지역검색</Nav.Link>
                    </Nav>
                    {sessionStorage.getItem('email') ? 
                        <>
                            <Nav>
                                <Nav.Link href="#">{sessionStorage.getItem('email')}</Nav.Link>
                            </Nav>
                            <Nav>
                                <Nav.Link href="#" onClick={onClickLogout}>로그아웃</Nav.Link>
                            </Nav>
                        </>
                        :
                        <Nav>
                            <Nav.Link href="/user/login" className={path.startsWith('/user/login') && 'active'}>로그인</Nav.Link>
                        </Nav>
                    }
                    </Navbar.Collapse>
                </Container>
            </Navbar>
            <RouterPage/>
        </>
      );
}

export default Menubar