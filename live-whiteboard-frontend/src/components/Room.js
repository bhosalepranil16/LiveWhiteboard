import { useState, useEffect } from "react";
import { useSelector, useDispatch } from "react-redux";
import Offcanvas from "react-bootstrap/Offcanvas";
import ListGroup from "react-bootstrap/ListGroup";
import io from "socket.io-client";

import HostRoomComponent from "./HostRoom";
import ClientRoomComponent from "./ClientRoom";
import { updateAllUsers } from "../store/reducers/userSlice";

const server = "http://localhost:8080";
const connectionOptions = {
  "force new connection": true,
  reconnectionAttempts: "Infinity",
  timeout: 10000,
  transports: ["websocket"],
};

const socket = io(server, connectionOptions);

const RoomComponent = () => {
  const [showOffCanvas, setShowOffCanvas] = useState(false);
  const myUser = useSelector((state) => state.user.myUser);
  const allUsers = useSelector((state) => state.user.allUsers);
  const dispatch = useDispatch();

  useEffect(() => {
    if (myUser) {
      socket.emit("USER_JOINED", myUser);
    }
  }, []);

  useEffect(() => {
    socket.on("USERS", (data) => {
      dispatch(updateAllUsers(data));
    });
  }, []);

  return (
    <>
      <Offcanvas
        show={showOffCanvas}
        onHide={() => {
          setShowOffCanvas(false);
        }}
      >
        <Offcanvas.Header closeButton>
          <Offcanvas.Title>
            <h1>Users</h1>
          </Offcanvas.Title>
        </Offcanvas.Header>
        <Offcanvas.Body>
          <ListGroup className="my-3">
            {allUsers.map((u) => (
              <ListGroup.Item variant="primary" className="text-center">
                {u.username}
                {u.userId === myUser.userId ? " - (You)" : ""}
              </ListGroup.Item>
            ))}
          </ListGroup>
        </Offcanvas.Body>
      </Offcanvas>

      {myUser ? (
        myUser.isHost ? (
          <HostRoomComponent
            socket={socket}
            setShowOffCanvas={setShowOffCanvas}
          />
        ) : (
          <ClientRoomComponent
            socket={socket}
            setShowOffCanvas={setShowOffCanvas}
          />
        )
      ) : null}
    </>
  );
};

export default RoomComponent;
