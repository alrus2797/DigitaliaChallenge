import { LinkContainer } from "react-router-bootstrap";
import { Navbar, Nav, Container, NavDropdown } from "react-bootstrap";
import { useAuth } from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
// import { useDispatch, useSelector } from 'react-redux';
// import { logout } from '../../actions/userActions';

export const Header = () => {
  const { refreshValue } = useLocalStorage<string>("guestName", null);

  const guestName = refreshValue();

  const { user, logout } = useAuth();

  return (
    <header>
      <Navbar bg="dark" variant="dark" expand="lg" collapseOnSelect>
        <Container>
          <LinkContainer to="/">
            <Navbar.Brand>Polls</Navbar.Brand>
          </LinkContainer>
          <Navbar.Toggle aria-controls="basic-navbar-nav" />
          <Navbar.Collapse className="justify-content-end">
            {guestName && <Navbar.Text>Vote as: {guestName}</Navbar.Text>}
          </Navbar.Collapse>
          <Navbar.Collapse
            id="basic-navbar-nav"
            className="justify-content-end"
          >
            <Nav className="mr-auto">
              <LinkContainer to="/finished-polls">
                <Nav.Link>
                  Finished Polls
                </Nav.Link>
              </LinkContainer>
              {user ? (
                <NavDropdown title={user.username} id="username">
                  <LinkContainer to="/">
                    <NavDropdown.Item>{user.email}</NavDropdown.Item>
                  </LinkContainer>
                  <NavDropdown.Item onClick={logout}>Logout</NavDropdown.Item>
                </NavDropdown>
              ) : (
                <LinkContainer to="/login">
                  <Nav.Link>
                    <i className="fas fa-user"></i> Sign In
                  </Nav.Link>
                </LinkContainer>
              )}
            </Nav>
          </Navbar.Collapse>
        </Container>
      </Navbar>
    </header>
  );
};
