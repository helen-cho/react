import Container from 'react-bootstrap/Container';
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import RouterPage from './RouterPage';

const MenuPage = () => {
  return (
    <>
      <Navbar expand="lg" className="bg-primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">LOGO</Navbar.Brand>
          <Navbar.Toggle aria-controls="responsive-navbar-nav" />
          <Navbar.Collapse id="responsive-navbar-nav">
            <Nav className="me-auto">
              <Nav.Link href="#">도서검색</Nav.Link>
              <Nav.Link href="#">도서목록</Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/users/login">로그인</Nav.Link>
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
      <RouterPage/>
    </>
  );
}

export default MenuPage