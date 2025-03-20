import { useEffect } from "react";
import { Toast, ToastContainer } from "react-bootstrap";

export default function ToastNotification({ toast, setToast }) {
  useEffect(() => {
    if (toast.show) {
      const timer = setTimeout(() => {
        setToast({ ...toast, show: false });
      }, 3000);
      return () => clearTimeout(timer);
    }
  }, [toast, setToast]);

  return (
    <ToastContainer position="top-end" className="p-3">
      <Toast
        onClose={() => setToast({ ...toast, show: false })}
        show={toast.show}
        bg={toast.variant}
        autohide
      >
        <Toast.Header>
          <strong className="me-auto">
            {toast.variant === "success" ? "Success" : "Error"}
          </strong>
        </Toast.Header>
        <Toast.Body className="text-white">{toast.message}</Toast.Body>
      </Toast>
    </ToastContainer>
  );
}
