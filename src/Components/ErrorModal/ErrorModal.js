import React from 'react';

import Modal from '../Modal/Modal';
import Button from '../FormElements/Button';
import './ErrorModal.css'

const ErrorModal = props => {
  return (
    <Modal
    className='error-modal-style'
      onCancel={props.onClear}
      header="An Error Occurred!"
      show={!!props.error}
      footer={<Button onClick={props.onClear}>Okay</Button>}
    >
      <p>{props.error}</p>
    </Modal>
  );
};

export default ErrorModal;
