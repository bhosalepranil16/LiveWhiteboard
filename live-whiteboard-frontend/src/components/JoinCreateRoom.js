import { useState } from "react";
import { useDispatch } from "react-redux";
import { useNavigate } from "react-router-dom";
import Container from "react-bootstrap/Container";
import Row from "react-bootstrap/Row";
import Col from "react-bootstrap/Col";
import Form from "react-bootstrap/Form";
import InputGroup from "react-bootstrap/InputGroup";
import Button from "react-bootstrap/Button";
import ButtonGroup from "react-bootstrap/ButtonGroup";
import { CopyToClipboard } from "react-copy-to-clipboard";

import { getUUID } from "../utils/utils";
import { showToastMessage } from "../store/reducers/toastMessagesSlice";
import { updateMyUser } from "../store/reducers/userSlice";

const JoinCreateRoomComponent = () => {
  const [createRoomName, setCreateRoomName] = useState("");
  const [createRoomId, setCreateRoomId] = useState(getUUID());
  const [joinRoomName, setJoinRoomName] = useState("");
  const [joinRoomId, setJoinRoomId] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const createRoomFormSubmit = (e) => {
    e.preventDefault();
    if (!createRoomName) {
      dispatch(
        showToastMessage({
          id: getUUID(),
          title: "Live Whiteboard",
          message: "Please enter your name...",
          variant: "danger",
          show: true,
        })
      );
      return;
    }
    const user = {
      roomId: createRoomId,
      userId: getUUID(),
      username: createRoomName,
      isHost: true,
    };
    dispatch(updateMyUser(user));
    navigate(`/whiteboard/${createRoomId}`);
  };

  const joinRoomFormSubmit = (e) => {
    e.preventDefault();
    if (!joinRoomName) {
      dispatch(
        showToastMessage({
          id: getUUID(),
          title: "Live Whiteboard",
          message: "Please enter your name...",
          variant: "danger",
          show: true,
        })
      );
      return;
    }

    if (!joinRoomId) {
      dispatch(
        showToastMessage({
          id: getUUID(),
          title: "Live Whiteboard",
          message: "Please enter valid Room Id...",
          variant: "danger",
          show: true,
        })
      );
      return;
    }
    const user = {
      roomId: joinRoomId,
      userId: getUUID(),
      username: joinRoomName,
      isHost: false,
    };
    dispatch(updateMyUser(user));
    navigate(`/whiteboard/${joinRoomId}`);
  };

  return (
    <Container>
      <Row>
        <Col>
          <h1 className="text-center my-5">
            Welcome To Realtime Whiteboard Sharing App
          </h1>
        </Col>
      </Row>

      <Row className="mx-5 mt-5">
        <Col md={5} className="p-5 border mx-auto">
          <h1 className="text-center text-primary mb-5">Create Room</h1>
          <Form onSubmit={(e) => createRoomFormSubmit(e)}>
            <Form.Group>
              <Form.Control
                type="text"
                placeholder="Your Name..."
                value={createRoomName}
                onChange={(e) => setCreateRoomName(e.target.value)}
              />
            </Form.Group>
            <InputGroup className="my-2 border align-items-center">
              <Form.Control
                type="text"
                className="border-0 outline-0"
                readOnly={true}
                value={createRoomId}
              ></Form.Control>
              <ButtonGroup>
                <Button
                  variant="outline-primary"
                  size="sm"
                  onClick={() => setCreateRoomId(getUUID())}
                >
                  Genarate
                </Button>
                <CopyToClipboard
                  text={createRoomId}
                  onCopy={() => {
                    dispatch(
                      showToastMessage({
                        id: getUUID(),
                        title: "Live Whiteboard",
                        message: "Room Id copied successfully...",
                        variant: "success",
                        show: true,
                      })
                    );
                  }}
                >
                  <Button variant="outline-success" size="sm">
                    Copy
                  </Button>
                </CopyToClipboard>
              </ButtonGroup>
            </InputGroup>
            <Form.Group>
              <Button variant="dark" type="submit">
                Create Room
              </Button>
            </Form.Group>
          </Form>
        </Col>
        <Col md={5} className="p-5 border mx-auto">
          <h1 className="text-center text-primary mb-5">Join Room</h1>
          <Form onSubmit={(e) => joinRoomFormSubmit(e)}>
            <Form.Group className="my-2">
              <Form.Control
                type="text"
                placeholder="Your Name..."
                value={joinRoomName}
                onChange={(e) => setJoinRoomName(e.target.value)}
              />
            </Form.Group>
            <Form.Group className="my-2">
              <Form.Control
                type="text"
                placeholder="Room Id..."
                value={joinRoomId}
                onChange={(e) => setJoinRoomId(e.target.value)}
              />
            </Form.Group>
            <Form.Group>
              <Button variant="dark" type="submit">
                Join Room
              </Button>
            </Form.Group>
          </Form>
        </Col>
      </Row>
    </Container>
  );
};

export default JoinCreateRoomComponent;
