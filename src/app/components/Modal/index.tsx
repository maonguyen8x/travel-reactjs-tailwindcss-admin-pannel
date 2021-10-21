import React, { memo } from 'react';
import { Modal, ModalBody, ModalHeader, ModalFooter } from 'reactstrap';
import { IProps } from './type';
import './styled.css';

const modal = (props: IProps) => {
  const { isShowModal, header, body, toggle, footer, className } = props;
  return (
    <Modal className={className} isOpen={isShowModal} toggle={toggle}>
      <ModalHeader toggle={toggle}>{header}</ModalHeader>
      <ModalBody>{body}</ModalBody>
      {footer && <ModalFooter>{footer}</ModalFooter>}
    </Modal>
  );
};
export default memo(modal);
