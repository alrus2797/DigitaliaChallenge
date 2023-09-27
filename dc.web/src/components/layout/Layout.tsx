// Create a Layout component that wraps the page content
// and will be used by all pages using react router and bootstrap for styling

import React from "react";
import { Button, Container, Form, Modal, Stack } from "react-bootstrap";
import { Outlet } from "react-router-dom";
import { Header } from "./Header";
import { AuthProvider } from "../../hooks/useAuth";
import { useLocalStorage } from "../../hooks/useLocalStorage";
import { GuestProvider } from "../../hooks/useGuest";
import { getIp } from "../../services/auth";

export const Layout = () => {
  const { storedValue: storedGuestName, setValue: setStoredGuest } =
    useLocalStorage<string>("guestName", null);

  const [guestName, setGuestName] = React.useState<string>("");
  const [show, setShow] = React.useState(false);
  const [ip, setIp] = React.useState<string>("");

  React.useEffect(() => {
    if (!storedGuestName) {
      getIp()
        .then((ipRes) => {
          setIp(ipRes);
          setShow(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, [storedGuestName]);

  const handleClose = () => {
    if (guestName === "") {
      alert("Please put a guest name");
      return;
    }
    const fullGuestName = `${guestName}|${ip}`;
    setStoredGuest(fullGuestName);
    setGuestName(fullGuestName);
    setShow(false);
  };

  return (
    <AuthProvider>
      <GuestProvider>
        <Header />
        <main className="py-3">
          <Container>
            <Outlet />
          </Container>
        </main>
        <Modal show={show} onHide={handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>You didn't set a guest name</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <Form.Group>
              <Form.Label htmlFor="inputPassword5">Put a guest name</Form.Label>
              <Stack 
                direction="horizontal"
                gap={2}
              >
                <Form.Control
                  onChange={(e) => setGuestName(e.target.value)}
                  value={guestName}
                  type="text"
                  id="guestNameText"
                  aria-describedby="guestName"
                />
                |
                <span>{ip}</span>
              </Stack>
            </Form.Group>
          </Modal.Body>
          <Modal.Footer>
            <Button variant="secondary" onClick={handleClose}>
              Close
            </Button>
            <Button variant="primary" onClick={handleClose}>
              Save Changes
            </Button>
          </Modal.Footer>
        </Modal>
      </GuestProvider>
    </AuthProvider>
  );
};
