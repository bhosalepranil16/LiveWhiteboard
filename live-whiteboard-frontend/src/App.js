import { createBrowserRouter, RouterProvider } from "react-router-dom";

import ToastComponent from "./components/ToastComponent";
import JoinCreateRoomComponent from "./components/JoinCreateRoom";
import RoomComponent from "./components/Room";
import "./App.css";

function App() {
  const router = createBrowserRouter([
    {
      path: "/",
      element: (
        <>
          <ToastComponent />
          <JoinCreateRoomComponent />
        </>
      ),
    },
    {
      path: "/whiteboard/:whiteboardId",
      element: (
        <>
          <ToastComponent />
          <RoomComponent />
        </>
      ),
    },
  ]);

  return (
    <div>
      <RouterProvider router={router} />
    </div>
  );
}

export default App;
