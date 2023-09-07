import { useRef, useEffect } from "react";

import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Button from "react-bootstrap/Button";

const ClientRoomComponent = ({ socket, setShowOffCanvas }) => {
  const imgRef = useRef(null);

  useEffect(() => {
    socket.on("CANVAS_IMAGE", (data) => {
      imgRef.current.src = data;
    });
  }, []);

  return (
    <Container fluid>
      <h1 className="display-5 pt-4 pb-3 text-center">React Drawing App</h1>
      <Row className="align-items-center justify-content-center py-2">
        <Col md={2}>
          <Button variant="dark" onClick={() => setShowOffCanvas(true)}>
            Users
          </Button>
        </Col>
      </Row>
      <Row className="mt-5">
        <Col
          md={8}
          className="overflow-hidden border border-dark px-0 mx-auto
          mt-3"
          style={{ height: "600px" }}
        >
          <img className="w-100 h-100" ref={imgRef} src="" alt="image" />
        </Col>
      </Row>
    </Container>
  );
};

export default ClientRoomComponent;
