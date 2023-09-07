import { useSelector, useDispatch } from "react-redux";
import Toast from "react-bootstrap/Toast";
import ToastContainer from "react-bootstrap/ToastContainer";

import { hideToastMessage } from "../store/reducers/toastMessagesSlice";

const ToastComponent = () => {
  const toastMessages = useSelector(
    (state) => state.toastMessages.toastMessages
  );

  const dispatch = useDispatch();

  const closeToast = (id) => {
    dispatch(hideToastMessage(id));
  };

  return (
    <ToastContainer className="m-3" position="top-end">
      {toastMessages.map((t) => (
        <Toast
          key={t.id}
          bg={t.variant}
          show={t.show}
          onClose={() => closeToast(t.id)}
        >
          <Toast.Header>
            <strong className="me-auto">{t.title}</strong>
          </Toast.Header>
          <Toast.Body>{t.message}</Toast.Body>
        </Toast>
      ))}
    </ToastContainer>
  );
};

export default ToastComponent;
