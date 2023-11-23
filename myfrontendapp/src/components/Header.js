import React, { useState } from 'react';
import 'bootstrap/dist/css/bootstrap.min.css';
import { Navbar, Nav, Offcanvas, Button, NavDropdown, Container } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { FaRightFromBracket } from 'react-icons/fa6';

function Header({ rol }) {
  const [showMenu, setShowMenu] = useState(false);

  const toggleMenu = () => {
    setShowMenu(!showMenu);
  };

  const cerrarSesion = () => {
    // Eliminar el rol del localStorage al cerrar sesión
    localStorage.removeItem('userRol');
  };

  return (
    <div>
      {rol === 'admin' && (
        <div>
          {/* Navbar principal */}
          <Navbar className="navbar-color" variant="dark" expand="md">
            <Container>
              <Navbar.Brand href="#home">Barberena y asociados</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">

                  <Nav.Link>
                    <Link to="/about" className="link-unstyled">Informacion</Link>
                  </Nav.Link>

                  <NavDropdown title="Casos" id="Casos">
                    <NavDropdown.Item>
                      <Link to="/Casos" className="link-unstyled">Registrar Casos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/CasoList" className="link-unstyled">Listar Casos</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Abogados" id="abogados">
                    <NavDropdown.Item>
                      <Link to="/abogado" className="link-unstyled">Registrar Abogados</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/abogadolist" className="link-unstyled">Listar abogados</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Clientes" id="clientes">
                    <NavDropdown.Item>
                      <Link to="/Cliente" className="link-unstyled">Registrar clientes</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ClientList" className="link-unstyled">Listar clientes</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Testimonio" id="Testimonio">
                    <NavDropdown.Item>
                      <Link to="/Testimonio" className="link-unstyled">Registrar Testimonio</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/TestimonioList" className="link-unstyled">Listar Testimonio</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>

                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">

                <Nav.Link>
                  <Link to="/" className="link-unstyled">Cerrar</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/about" className="link-unstyled">Informacion</Link>
                </Nav.Link>
                <NavDropdown title="Casos" id="Casos">
                    <NavDropdown.Item>
                      <Link to="/Casos" className="link-unstyled">Registrar Casos</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/CasoList" className="link-unstyled">Listar Casos</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Abogados" id="abogados">
                    <NavDropdown.Item>
                      <Link to="/abogado" className="link-unstyled">Registrar Abogados</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/abogList" className="link-unstyled">Listar abogados</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Clientes" id="clientes">
                    <NavDropdown.Item>
                      <Link to="/Cliente" className="link-unstyled">Registrar clientes</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/ClientList" className="link-unstyled">Listar clientes</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Testimonio" id="Testimonio">
                    <NavDropdown.Item>
                      <Link to="/Testimonio" className="link-unstyled">Registrar Testimonio</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/TestimonioList" className="link-unstyled">Listar Testimonio</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>

                

              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}

      {rol === 'cliente' && (
        <div>
          {/* Navbar principal */}
          <Navbar className="navbar-color" variant="dark" expand="md">
            <Container>
              <Navbar.Brand href="#home">Barberena y asociados</Navbar.Brand>
              <Navbar.Toggle
                aria-controls="basic-navbar-nav"
                style={{ display: 'none' }}
                className="d-sm-none d-xs-none"
              />s
              <Navbar.Collapse id="basic-navbar-nav">
                <Nav className="ml-auto">
                  
                  <Nav.Link>
                    <Link to="/about" className="link-unstyled">Informacion</Link>
                  </Nav.Link>

                  <NavDropdown title="Casos" id="casos">
                    <NavDropdown.Item>
                      <Link to="/Casos" className="link-unstyled">Registrar Caso</Link>
                    </NavDropdown.Item>
                    <NavDropdown.Item>
                      <Link to="/actualizar-caso" className="link-unstyled">Listar Caso</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <NavDropdown title="Testimonio" id="Testimonio">
                    <NavDropdown.Item>
                      <Link to="/Testimonio" className="link-unstyled">Registrar Testimonio</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/TestimonioList" className="link-unstyled">Listar Testimonio</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>

                </Nav>
              </Navbar.Collapse>
              <Button
                variant="outline-light"
                onClick={toggleMenu}
                className="d-md-none d-block"
                aria-controls="basic-navbar-nav"
                aria-expanded={showMenu ? 'true' : 'false'}
              >
                Menú
              </Button>
            </Container>
          </Navbar>

          {/* Menú lateral (Offcanvas) */}
          <Offcanvas show={showMenu} onHide={toggleMenu} placement="start">
            <Offcanvas.Header closeButton>
              <Offcanvas.Title>Menú</Offcanvas.Title>
            </Offcanvas.Header>
            <Offcanvas.Body>
              <Nav className="flex-column">

                <Nav.Link>
                  <Link to="/" className="link-unstyled">Cerrar</Link>
                </Nav.Link>

                <Nav.Link>
                  <Link to="/about" className="link-unstyled">Informacion</Link>
                </Nav.Link>

                <NavDropdown title="Casos" id="casos">
                  <NavDropdown.Item>
                    <Link to="/Casos" className="link-unstyled">Registrar Caso</Link>
                  </NavDropdown.Item>
                  <NavDropdown.Item>
                    <Link to="/CasoList" className="link-unstyled">Listar Caso</Link>
                  </NavDropdown.Item>
                </NavDropdown>
                
                <NavDropdown title="Testimonio" id="Testimonio">
                    <NavDropdown.Item>
                      <Link to="/Testimonio" className="link-unstyled">Registrar Testimonio</Link>
                    </NavDropdown.Item>

                    <NavDropdown.Item>
                      <Link to="/TestimonioList" className="link-unstyled">Listar Testimonio</Link>
                    </NavDropdown.Item>
                  </NavDropdown>

                  <Nav.Link>
                    <Link to="/" onClick={cerrarSesion} className="link-unstyled"><FaRightFromBracket /></Link>
                  </Nav.Link>

              </Nav>
            </Offcanvas.Body>
          </Offcanvas>
        </div>
      )}
    </div>
  );
}

export default Header;
