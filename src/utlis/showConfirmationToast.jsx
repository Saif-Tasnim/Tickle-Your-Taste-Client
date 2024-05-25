// ConfirmationToast.js
import React from "react";
import toast from "react-hot-toast";

const showConfirmation = (message, onConfirm, onCancel) => {
  toast.custom((t) => (
    <div
      className={`bg-white p-4 rounded shadow-lg ${
        t.visible ? "animate-enter" : "animate-leave"
      }`}
    >
      <p>{message}</p>

      <div className="flex justify-end space-x-2 mt-4">
        <button
          className="btn btn-secondary text-white px-4 py-2 rounded"
          onClick={() => {
            toast.dismiss(t.id);
            onConfirm();
          }}
        >
          Confirm
        </button>
        <button
          className="bg-gray-300 text-black px-4 py-2 rounded"
          onClick={() => {
            toast.dismiss(t.id);
            if (onCancel) onCancel();
          }}
        >
          Cancel
        </button>
      </div>
    </div>
  ));
};

export default showConfirmation;
