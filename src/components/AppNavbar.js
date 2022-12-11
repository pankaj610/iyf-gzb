import React  from 'react'
import {  Container, Image, Nav, Navbar,  Offcanvas } from 'react-bootstrap'
import { useNavigate } from 'react-router';
import { useAtom } from 'jotai';
import { userDataAtom } from '../App';
import { GoogleLogout } from 'react-google-login';
import { clientId } from '../containers/LoginContainer/Login';
import { Link } from 'react-router-dom';

function AppNavbar(params) {
    const [userData, setUserData] = useAtom(userDataAtom);

    const navigate = useNavigate();
    const logout = ()=> {
        localStorage.removeItem('user_data'); 
        navigate('/login');
    }

    return (
        <>
          {[true].map((expand) => (
            <Navbar key={expand} bg="light" expand={expand} className="mb-3">
              <Container fluid>
                <Navbar.Brand href="#"><Image src={userData?.profileObj?.imageUrl} height="30" width="30"/></Navbar.Brand>
                <Navbar.Collapse id="basic-navbar-nav">
                  <Nav className="me-auto">
                    <Nav.Link href="/utsah/volunteer">Utsah</Nav.Link>
                    <Nav.Link href="/utsah/list">Utsah List</Nav.Link>
                    <Nav.Link href="/dys">DYS</Nav.Link>
                    <Nav.Link href="/dys/list">DYS List</Nav.Link>
                  </Nav>
                   
                  <Offcanvas.Body>
                    <Nav className="justify-content-end flex-grow-1 pe-3">
                      <GoogleLogout
                        clientId={clientId}
                        buttonText="Logout"
                        onLogoutSuccess={logout}
                      >
                      </GoogleLogout>
                    </Nav>
                   
                   
                  </Offcanvas.Body>
                </Navbar.Collapse>
              </Container>
            </Navbar>
          ))}
        </>
    )
}

export default AppNavbar