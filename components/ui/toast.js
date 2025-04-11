import { toast, ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

export function ToastMessage({ message, type = "success", onClose }) {
  const showToast = () => {
    toast[type](message, {
      position: "top-right",
      autoClose: 1200,
      hideProgressBar: false,
      closeOnClick: true,
      pauseOnHover: true,
      draggable: true,
      onClose,
    });
  };

  return (
    <>
      {showToast()}
      <ToastContainer />
    </>
  );
}
