import React from 'react'
import Nav from 'react-bootstrap/Nav';
import Navbar from 'react-bootstrap/Navbar';
import Container from 'react-bootstrap/Container';
import RouterPage from './RouterPage';
import { useLocation } from 'react-router-dom';

const MenuPage = () => {
  const {pathname}= useLocation()
  console.log(pathname)
  return (
    <>
      <Navbar bg="primary" data-bs-theme="dark">
        <Container>
          <Navbar.Brand href="/">Home</Navbar.Brand>
            <Nav className="me-auto">
              <Nav.Link href="/bbs" className={pathname==='/bbs' && 'active'}>
                게시판
              </Nav.Link>
            </Nav>
            <Nav>
              <Nav.Link href="/login" className={pathname==='/login' && 'active'}>
                로그인
              </Nav.Link>
            </Nav>
        </Container>
      </Navbar>
      <RouterPage/>
    </>
  )
}

export default MenuPage