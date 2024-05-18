import React from "react";

const ResumeModal = ({ imageUrl, onClose }) => {
  return (
    <div className="resume-modal fixed inset-0 flex items-center justify-center bg-black bg-opacity-50">
      <div className="modal-content bg-white w-full max-w-lg p-6 rounded-lg">
        <span
          className="close absolute top-0 right-0 mt-4 mr-4 text-gray-500 cursor-pointer text-2xl"
          onClick={onClose}
        >
          &times;
        </span>
        <img src={imageUrl} alt="resume" className="w-full" />
      </div>
    </div>
  );
};

export default ResumeModal;
