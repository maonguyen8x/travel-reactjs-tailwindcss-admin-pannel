import Modal from 'app/components/Modal';
import React, { memo } from 'react';
import { IProps } from './type';

const ModalRanking = ({ isShowModal, toggle, data }: IProps) => {
  return (
    <Modal
      isShowModal={isShowModal}
      toggle={() => toggle()}
      body={<div>Updating...</div>}
    />
  );
};

export default memo(ModalRanking, (oldProps, newProps) => {
  if (
    oldProps?.isShowModal !== newProps?.isShowModal ||
    oldProps?.data !== newProps?.data
  ) {
    return false;
  }
  return true;
});
