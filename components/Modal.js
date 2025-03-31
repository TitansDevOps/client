import { forwardRef } from "react";
import { X } from "phosphor-react";
import PropTypes from "prop-types";
import "./styles/Modal.css";

const Modal = forwardRef(
  (
    {
      open = false,
      title,
      onClose,
      onConfirm,
      onCancel,
      children,
      width = "80%",
      height = "80%",
    },
    ref,
  ) => {
    const handleClose = () => {
      if (onClose) {
        onClose();
      }
    };

    const handleConfirm = () => {
      if (onConfirm) {
        onConfirm();
      }
    };

    const handleCancel = () => {
      if (onCancel) {
        onCancel();
      }
    };

    return (
      <div className={`modalOverlay ${open ? "modalOpen" : "modalClosed"}`}>
        <div
          className="modalContent"
          style={{ width: width, height: height }}
          ref={ref}
        >
          <div className="modalHeader">
            <h2 className="modalTitle">{title}</h2>
            <button className="modalCloseButton" onClick={handleClose}>
              <X size={24} color="#333" />
            </button>
          </div>
          <div className="modalBody">{children}</div>
          <div className="modalFooter">
            <button
              className="modalButton modalCancelButton"
              onClick={handleCancel}
            >
              Cancelar
            </button>
            <button
              className="modalButton modalConfirmButton"
              onClick={handleConfirm}
            >
              Aceptar
            </button>
          </div>
        </div>
      </div>
    );
  },
);

Modal.propTypes = {
  open: PropTypes.bool,
  title: PropTypes.string,
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
};

Modal.displayName = "Modal";

export default Modal;
