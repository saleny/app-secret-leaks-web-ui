import { Link } from 'react-router-dom';
import { Button, Navbar as BsNavbar, Container, Nav } from 'react-bootstrap';
import { useAuth } from '../../context/AuthContext';

const Navbar = () => {
  const { user, logout } = useAuth();

  return (
    <BsNavbar bg="dark" variant="dark" expand="lg">
      <Container>
        <BsNavbar.Brand as={Link} to="/">Secrets Scanner</BsNavbar.Brand>
        <BsNavbar.Toggle aria-controls="basic-navbar-nav" />
        <BsNavbar.Collapse id="basic-navbar-nav">
          <Nav className="me-auto">
            {user && <Nav.Link as={Link} to="/">Projects</Nav.Link>}
            {user && <Nav.Link as={Link} to="/projects/create">New Project</Nav.Link>}
          </Nav>
          <Nav>
            {user ? (
              <Button variant="outline-light" onClick={logout}>Logout</Button>
            ) : (
              <Nav.Link as={Link} to="/login">Login</Nav.Link>
            )}
          </Nav>
        </BsNavbar.Collapse>
      </Container>
    </BsNavbar>
  );
};

export default Navbar;