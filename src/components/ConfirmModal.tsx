import { ReactElement } from "react";

function ConfirmModal({
  text,
  message,
  onConfirm,
  id,
  modalId,
}: {
  text: string;
  message: string | ReactElement;
  onConfirm: (confirmed: boolean, id: string) => void;
  id: string;
  modalId: string;
}) {
  return (
    <div className="d-inline-block">
      <div
        className="modal fade"
        id={modalId}
        tabIndex={-1}
        role="dialog"
        aria-labelledby="modal"
        aria-hidden="true"
      >
        <div className="modal-dialog" role="document">
          <div className="modal-content">
            <div className="modal-header">
              <h5 className="modal-title" id="exampleModalLabel">
                {text}
              </h5>
              <button
                type="button"
                className="close"
                data-bs-dismiss={modalId}
                aria-label="Close"
              >
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div className="modal-body">{message}</div>
            <div className="modal-footer">
              <button
                type="button"
                className="btn btn-secondary"
                data-bs-dismiss={modalId}
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onConfirm(true, id);
                }}
                data-bs-dismiss={modalId}
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default ConfirmModal;
