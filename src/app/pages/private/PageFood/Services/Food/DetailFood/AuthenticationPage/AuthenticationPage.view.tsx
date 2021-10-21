import React, { useState } from 'react';
import { Col, Row } from 'reactstrap';
import Modal from 'app/components/Modal';
import Carousel from 'app/components/Carousel';
import { FONT_WEIGHT } from 'app/constants';
import { DATA_IMG_DEFAULT } from 'app/constants';
import { BlockPage, ConfirmPage } from 'app/utils';
import { t } from 'app/i18n';
import {
  BoxAuthPageTour,
  BoxTitle,
  Title,
  FieldTitle,
  FieldContent,
  BoxField,
  PaddingTop,
  ImageAuthenPage,
  ButtonConfirm,
  ButtonCancel,
} from './AuthenticationPage.styled';

const AuthenticationPage = () => {
  const [isShowModal, setShowModal] = useState(false);

  const toggle = () => setShowModal(!isShowModal);

  return (
    <Row>
      <Col md={12}>
        <BoxAuthPageTour>
          <BoxTitle>
            <Title bold={FONT_WEIGHT.BOLD}>
              {t('authentication.info_verify')}
            </Title>
          </BoxTitle>
          <Col md={12} className="mt-4 mb-4">
            <BoxField>
              <FieldTitle>{t('authentication.type')}</FieldTitle>
              <FieldContent>{'Doanh Nghiệp'}</FieldContent>
            </BoxField>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxField>
              <FieldTitle>{t('authentication.name_service')}</FieldTitle>
              <FieldContent>{'Dịch vụ chổ nghỉ'}</FieldContent>
            </BoxField>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxField>
              <FieldTitle>{t('authentication.name_company')}</FieldTitle>
              <FieldContent>{'Rose\'s house'}</FieldContent>
            </BoxField>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxField>
              <FieldTitle>{t('authentication.owner_company')}</FieldTitle>
              <FieldContent>{'Nguyễn Mạnh Hoan'}</FieldContent>
            </BoxField>
          </Col>
          <PaddingTop />
          <BoxTitle>
            <Title bold={FONT_WEIGHT.BOLD}>{t('authentication.image')}</Title>
          </BoxTitle>
          <Row>
            {DATA_IMG_DEFAULT?.map((item: any) => (
              <Col md={3} className="mt-5">
                <ImageAuthenPage onClick={toggle} src={item?.url} />
              </Col>
            ))}
          </Row>
          <Modal
            isShowModal={isShowModal}
            toggle={toggle}
            body={<Carousel items={DATA_IMG_DEFAULT} indexCarousel={1} />}
          />
          <PaddingTop />
          <Col md={12} className="text-center">
            <ButtonConfirm onClick={ConfirmPage()}>
              {t('authentication.confirm')}
            </ButtonConfirm>
            <ButtonCancel onClick={BlockPage()}>
              {t('authentication.cancel')}
            </ButtonCancel>
          </Col>
          <PaddingTop />
        </BoxAuthPageTour>
      </Col>
    </Row>
  );
};

export default AuthenticationPage;
