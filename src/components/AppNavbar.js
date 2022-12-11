import React, { useEffect } from 'react'
import { Button, Container, Image, Nav, Navbar,  Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { userDataAtom } from '../App';

function AppNavbar() {
    const [userData, setUserData] = useAtom(userDataAtom);

    const navigate = useNavigate();
    const logout = ()=> {
        localStorage.removeItem('user_data');
        navigate('/login');
    }

    return (
        <>
          {[ true].map((expand) => (
            <Navbar key={expand} bg="light" expand={expand} className="mb-3">
              <Container fluid>
                <Navbar.Brand href="#"><Image src={userData?.profileObj?.imageUrl} height="30" width="30"/></Navbar.Brand>
                <Navbar.Toggle aria-controls={`offcanvasNavbar-expand-${expand}`} />
                <Navbar.Offcanvas
                  id={`offcanvasNavbar-expand-${expand}`}
                  aria-labelledby={`offcanvasNavbarLabel-expand-${expand}`}
                  placement="end"
                >
                  <Offcanvas.Header closeButton>
                    <Offcanvas.Title id={`offcanvasNavbarLabel-expand-${expand}`}>
                      Offcanvas
                    </Offcanvas.Title>
                  </Offcanvas.Header>
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <Button variant="outline-success" onClick={logout}>Logout</Button>
                    </Nav>
                   
                   
                  </Offcanvas.Body>
                </Navbar.Offcanvas>
              </Container>
            </Navbar>
          ))}
        </>
    )
}

export default AppNavbar