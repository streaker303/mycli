import React from 'react';
import {Modal} from 'tbfe-ui';
const {{name}} = (
  {
    showModal,
    handleCheck,
    onCancel,
  }
) => {
  return (
    <Modal
      isOpen={showModal}
      width={700}
      preventHandleCancelOnClickOverlay
      handleEnsure={handleCheck}
      handleCancel={onCancel}
    >
      <div>{{content}}</div>
    </Modal>
  );
};
export default {{name}};
