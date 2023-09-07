import { useRef, useState } from "react";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import Button from "react-bootstrap/Button";

import CanvasComponent from "./Canvas";

const HostRoomComponent = ({ socket, setShowOffCanvas }) => {
  const canvasRef = useRef(null);
  const ctxRef = useRef(null);
  const [color, setColor] = useState("#000000");
  const [elements, setElements] = useState([]);
  const [history, setHistory] = useState([]);
  const [tool, setTool] = useState("PENCIL");

  const clearCanvas = () => {
    const canvas = canvasRef.current;
    const context = canvas.getContext("2d");
    context.fillStyle = "white";
    context.fillRect(0, 0, canvas.width, canvas.height);
    setElements([]);
  };

  const undo = () => {
    setHistory((prevHistory) => [
      ...prevHistory,
      elements[elements.length - 1],
    ]);
    setElements((prevElements) =>
      prevElements.filter((ele, index) => index !== elements.length - 1)
    );
  };

  const redo = () => {
    setElements((prevElements) => [
      ...prevElements,
      history[history.length - 1],
    ]);
    setHistory((prevHistory) =>
      prevHistory.filter((ele, index) => index !== history.length - 1)
    );
  };

  return (
    <Container className="text-center" fluid>
      <h1 className="display-5 pt-4 pb-3">React Drawing App</h1>
      <Row className="align-items-center justify-content-center py-2">
        <Col md={2}>
          <Form.Group>
            <Form.Control
              type="color"
              value={color}
              onChange={(e) => setColor(e.target.value)}
            ></Form.Control>
          </Form.Group>
        </Col>
        <Col md={2}>
          <Form.Group>
            <Form.Select
              defaultValue="PENCIL"
              onChange={(e) => setTool(e.target.value)}
            >
              <option value="PENCIL">Pencil</option>
              <option value="LINE">Line</option>
              <option value="RECTANGLE">Rectangle</option>
            </Form.Select>
          </Form.Group>
        </Col>
        <Col md={2}>
          <ButtonGroup>
            <Button
              variant="outline-primary"
              onClick={() => undo()}
              disabled={elements.length === 0}
            >
              Undo
            </Button>
            <Button
              variant="outline-primary"
              onClick={() => redo()}
              disabled={history.length < 1}
            >
              Redo
            </Button>
          </ButtonGroup>
        </Col>
        <Col md={2}>
          <Button variant="danger" onClick={() => clearCanvas()}>
            Clear Canvas
          </Button>
        </Col>
      </Row>

      <Row className="align-items-center justify-content-center py-2">
        <Col md={2}>
          <Button variant="dark" onClick={() => setShowOffCanvas(true)}>
            Users
          </Button>
        </Col>
      </Row>

      <Row>
        <CanvasComponent
          canvasRef={canvasRef}
          ctxRef={ctxRef}
          color={color}
          elements={elements}
          setElements={setElements}
          tool={tool}
          socket={socket}
        />
      </Row>
    </Container>
  );
};

export default HostRoomComponent;
