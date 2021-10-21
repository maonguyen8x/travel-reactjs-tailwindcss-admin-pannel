import React, { memo } from 'react';
import { Modal, ModalBody } from 'reactstrap';
import { IProps } from './type';

const modal = (props: IProps) => {
  const { isShowModal, body, toggle, className } = props;
  return (
    <Modal className={className} isOpen={isShowModal} toggle={toggle}>
      <ModalBody>{body}</ModalBody>
    </Modal>
  );
};
export default memo(modal);
