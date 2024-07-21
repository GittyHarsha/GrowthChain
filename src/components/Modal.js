import React, { useState } from 'react';

const Modal = ({ isOpen, onClose, onSubmit }) => {
  const [selectedOption, setSelectedOption] = useState('');

  if (!isOpen) return null;

  const handleSubmit = (e) => {
    e.preventDefault();
    onSubmit(selectedOption);
    setSelectedOption(''); // Reset state after submission
  };

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/3">
        <h2 className="text-lg font-semibold mb-4">Select an Option</h2>
        <form onSubmit={handleSubmit}>
          <div className="mb-4">
            <label className="block mb-2">
              <input
                type="radio"
                name="option"
                value="Option1"
                checked={selectedOption === 'Option1'}
                onChange={() => setSelectedOption('Option1')}
                className="mr-2"
              />
              Option 1
            </label>
            <label className="block mb-2">
              <input
                type="radio"
                name="option"
                value="Option2"
                checked={selectedOption === 'Option2'}
                onChange={() => setSelectedOption('Option2')}
                className="mr-2"
              />
              Option 2
            </label>
            {/* Add more options if needed */}
          </div>
          <div className="flex justify-end">
            <button
              type="button"
              onClick={onClose}
              className="bg-gray-300 text-gray-800 px-4 py-2 rounded mr-2"
            >
              Cancel
            </button>
            <button
              type="submit"
              className="bg-blue-500 text-white px-4 py-2 rounded"
            >
              Submit
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Modal;
