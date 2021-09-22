import { Navbar, Nav, } from 'react-bootstrap';

export default function Header(props) {
  return (
    <Navbar sticky="top" bg="light" expand="lg">
      <Navbar.Brand href="https://ridatadiscovery.org"><img
        src="/assets/images/logos/ricaim-logo.svg"
        width="30"
        height="30"
        className="d-inline-block align-top"
        alt="Rhode Island Data Discovery Center"
      /></Navbar.Brand>

      <Nav>
        <Nav.Link href="#visualizer">Visualizer</Nav.Link>
        <Nav.Link href="#information">Info</Nav.Link>
      </Nav>
    </Navbar>
  );
}