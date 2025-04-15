import { forwardRef } from "react";
import { X, Warning, Info, Question, CheckCircle } from "phosphor-react";
import PropTypes from "prop-types";
import "./styles/Modal.css";

const iconTypes = {
  warning: {
    icon: Warning,
    color: "#F59E0B",
    bgColor: "bg-yellow-100",
  },
  info: {
    icon: Info,
    color: "#3B82F6",
    bgColor: "bg-blue-100",
  },
  question: {
    icon: Question,
    color: "#8B5CF6",
    bgColor: "bg-purple-100",
  },
  success: {
    icon: CheckCircle,
    color: "#10B981",
    bgColor: "bg-green-100",
  },
  danger: {
    icon: Warning,
    color: "#EF4444",
    bgColor: "bg-red-100",
  },
};

const Modal = forwardRef(
  (
    {
      open = false,
      title,
      type = "info",
      onClose,
      onConfirm,
      onCancel,
      children,
      width = "80%",
      height = "80%",
      confirmText = "Aceptar",
      cancelText = "Cancelar",
      hideCancel = false,
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

    const IconComponent = iconTypes[type]?.icon || Info;
    const iconColor = iconTypes[type]?.color || "#3B82F6";
    const iconBgColor = iconTypes[type]?.bgColor || "bg-blue-100";

    return (
      <div className={`modalOverlay ${open ? "modalOpen" : "modalClosed"}`}>
        <div
          className="modalContent"
          style={{ width: width, height: height }}
          ref={ref}
        >
          <div className="modalHeader">
            <div className="flex items-center gap-3">
              <div className={`${iconBgColor} p-2 rounded-full`}>
                <IconComponent size={24} color={iconColor} weight="fill" />
              </div>
              <h2 className="modalTitle">{title}</h2>
            </div>
            <button className="modalCloseButton" onClick={handleClose}>
              <X size={24} color="#333" />
            </button>
          </div>
          <div className="modalBody">{children}</div>
          <div className="modalFooter">
            {!hideCancel && (
              <button
                className="modalButton modalCancelButton"
                onClick={handleCancel}
              >
                {cancelText}
              </button>
            )}
            <button
              className="modalButton modalConfirmButton"
              style={{ backgroundColor: iconColor }}
              onClick={handleConfirm}
            >
              {confirmText}
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
  type: PropTypes.oneOf(["warning", "info", "question", "success", "danger"]),
  onClose: PropTypes.func,
  onConfirm: PropTypes.func,
  onCancel: PropTypes.func,
  children: PropTypes.node,
  width: PropTypes.string,
  height: PropTypes.string,
  confirmText: PropTypes.string,
  cancelText: PropTypes.string,
  hideCancel: PropTypes.bool,
};

Modal.displayName = "Modal";

export default Modal;
