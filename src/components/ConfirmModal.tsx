function ConfirmModal({
  text,
  message,
  onConfirm,
  id,
}: {
  text: string;
  message: string;
  onConfirm: (confirmed: boolean, id: string) => void;
  id: string;
}) {
  return (
    <div className="d-inline-block">
      <button
        type="button"
        className="btn btn-link text-danger"
        data-bs-toggle="modal"
        data-bs-target="#modal"
      >
        {text}
      </button>

      <div
        className="modal fade"
        id="modal"
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
                data-bs-dismiss="modal"
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
                data-bs-dismiss="modal"
              >
                Cancel
              </button>
              <button
                type="button"
                className="btn btn-danger"
                onClick={() => {
                  onConfirm(true, id);
                }}
                data-bs-dismiss="modal"
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
