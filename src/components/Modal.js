import React, { useState } from 'react';

const Modal = (props) => {
  const [selectedOption, setSelectedOption] = useState('');
  console.log("modal is open: ", props.isOpen);
  if (!props.isOpen) return null;
  return (
    <div className="fixed inset-0 flex items-center justify-center bg-white">
      {props.children}
    </div>
  );
};

export default Modal;
