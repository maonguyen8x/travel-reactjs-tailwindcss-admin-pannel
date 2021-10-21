import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import Modal from 'app/components/Modal';
import Carousel from 'app/components/Carousel';
import { FONT_WEIGHT } from 'app/constants';
import { t } from 'app/i18n';
import {
  getDataVerifyPageTour,
  onCancelVerifyTourPage,
  onVerifyTourPage,
} from 'app/utils';
import SquareImage from 'app/components/SquareImage/SquareImage';
import { DATA } from '../Tour.data';
import {
  Title,
  FieldTitle,
  FieldContent,
  BoxField,
  ButtonConfirm,
  ButtonCancel,
  BoxImage,
} from './AuthenticationPage.styled';

const AuthenticationPage = () => {
  const [isShowModal, setShowModal] = useState(false);

  const toggle = () => setShowModal(!isShowModal);

  const onCancelPage = () => {
    onCancelVerifyTourPage();
  };

  const onConfirmPage = () => {
    onVerifyTourPage();
  };

  const renderInformation = () => {
    return (
      <>
        {getDataVerifyPageTour()?.map((items: any, index: number) => (
          <Col md={12} className="mt-2" key={index}>
            <BoxField>
              <FieldTitle>{items?.key}</FieldTitle>
              <FieldContent>{items?.value}</FieldContent>
            </BoxField>
          </Col>
        ))}
      </>
    );
  };

  return (
    <Row>
      <Col md={12}>
        <Col md={12} className="mt-3">
          <Title bold={FONT_WEIGHT.BOLD}>
            {t('tour.authentication.info_verify')}
          </Title>
        </Col>
        {renderInformation()}
        <Col md={12}>
          <Title bold={FONT_WEIGHT.BOLD}>{t('authentication.image')}</Title>
        </Col>
        <BoxImage>
          <Row className="m-2">
            {DATA?.map((item: any, index: number) => (
              <Col md={3} className="p-1" onClick={toggle} key={index}>
                <SquareImage className="rectangle" src={item?.url} />
              </Col>
            ))}
          </Row>
        </BoxImage>
        <Modal
          isShowModal={isShowModal}
          toggle={toggle}
          body={<Carousel items={DATA} />}
        />
        <Col md={12} className="pt-2">
          <ButtonCancel onClick={onCancelPage}>
            {t('authentication.cancel')}
          </ButtonCancel>
          <ButtonConfirm onClick={onConfirmPage}>
            {t('authentication.confirm')}
          </ButtonConfirm>
        </Col>
      </Col>
    </Row>
  );
};

export default AuthenticationPage;
