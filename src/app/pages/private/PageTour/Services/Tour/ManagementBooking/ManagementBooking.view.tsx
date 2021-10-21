import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import Images from 'app/assets/images';
import { DeContent } from 'app/components/layout/styled';
import Swal from 'sweetalert2';
import { FONT_WEIGHT, ROUTERS } from 'app/constants';
import { t } from 'app/i18n';
import {
  Background,
  BoxPageTour,
  Avatar,
  BoxBackground,
  BoxAvatar,
  TitleName,
  BoxInformationPageTour,
  TitleInfor,
  ContentInfor,
  BoxOwner,
  TitleOwner,
  BoxSocialPageTour,
  PaddingTop,
  BoxTitle,
  BoxDropDown,
  BoxShowMore,
  FiedTitle,
} from './ManagementBooking.styled';

const FormTour = (props: any) => {
  const { match, history } = props;

  const [isShowDropDown, setShowDropDown] = useState(false);

  const toggle = () => setShowDropDown(!isShowDropDown);

  const onListTourServices = () => {
    history?.push(ROUTERS.TOUR_DETAIL.replace(':id', match?.params?.id));
  };

  return (
    <Row>
      <Col md={5}>
        <BoxPageTour>
          <BoxOwner>
            <Col md={12}>
              <BoxTitle>
                <TitleOwner bold={FONT_WEIGHT.BOLD}>
                  {t('tour.booking.owner')}
                </TitleOwner>
                <BoxShowMore>
                  <i onClick={toggle} className="fas fa-ellipsis-h" />
                  {isShowDropDown && (
                    <BoxDropDown>
                      <span onClick={onListTourServices}>
                        <i className="far fa-eye" />
                        {t('tour.view')}
                      </span>
                      <span onClick={toggle}>
                        <i className="fas fa-unlock-alt" />
                        {t('tour.un_block')}
                      </span>
                      <span onClick={toggle}>
                        <i className="fas fa-lock" />
                        {t('tour.block')}
                      </span>
                    </BoxDropDown>
                  )}
                </BoxShowMore>
              </BoxTitle>
            </Col>
          </BoxOwner>
          <BoxBackground>
            <Background src={Images.background.default} alt="background" />
            <BoxAvatar>
              <Avatar src={Images.avatar_defautl.default} alt="avatar" />
            </BoxAvatar>
          </BoxBackground>
          <TitleName>{'Manh Hoan'}</TitleName>
          <Col md={12}>
            <BoxInformationPageTour>
              <TitleInfor>{t('tour.booking.address')}</TitleInfor>
              <ContentInfor>
                {'15, Quang Trung, Thạch Than, Hải Châu. Đà Nẵng'}
              </ContentInfor>
            </BoxInformationPageTour>
          </Col>
          <Col md={12}>
            <BoxInformationPageTour>
              <TitleInfor>{t('tour.booking.gender')}</TitleInfor>
              <ContentInfor>{'Nam'}</ContentInfor>
            </BoxInformationPageTour>
          </Col>
          <Col md={12}>
            <BoxInformationPageTour>
              <TitleInfor>{t('tour.booking.birthday')}</TitleInfor>
              <ContentInfor>{'15-05-1990'}</ContentInfor>
            </BoxInformationPageTour>
          </Col>
          <Col md={12}>
            <BoxInformationPageTour>
              <TitleInfor>{t('tour.booking.email')}</TitleInfor>
              <ContentInfor>{'hoang xuan mạnh@gmail.com'}</ContentInfor>
            </BoxInformationPageTour>
          </Col>
          <Col md={12}>
            <BoxInformationPageTour>
              <TitleInfor>{t('tour.booking.job')}</TitleInfor>
              <ContentInfor>{'Developer'}</ContentInfor>
            </BoxInformationPageTour>
          </Col>
          <Col md={12}>
            <BoxInformationPageTour>
              <TitleInfor>{t('tour.booking.web')}</TitleInfor>
              <ContentInfor>{''}</ContentInfor>
            </BoxInformationPageTour>
          </Col>
          <Col md={12}>
            <BoxInformationPageTour>
              <TitleInfor>{t('tour.booking.phone')}</TitleInfor>
              <ContentInfor>{'+84 905 555 333'}</ContentInfor>
            </BoxInformationPageTour>
          </Col>
          <Col md={12}>
            <BoxInformationPageTour>
              <TitleInfor>{t('tour.booking.join')}</TitleInfor>
              <ContentInfor>{'22:53 01/02/2021'}</ContentInfor>
            </BoxInformationPageTour>
          </Col>
          <Col md={12}>
            <TitleInfor>{t('tour.booking.intro')}</TitleInfor>
          </Col>
          <Col md={12} className="mt-2 mb-4">
            <DeContent>
              {`Lorem Ipsum is simply dummy text 
              of the printing and typesetting industry. 
              Lorem Ipsum has been the industry's standard 
              dummy text ever since the 1500s, when an unknown 
              printer took a galley of type and scrambled 
              it to make a type specimen book.`}
            </DeContent>
          </Col>
        </BoxPageTour>
      </Col>
      <Col md={7}>
        <BoxPageTour>
          <BoxOwner>
            <Col md={12}>
              <BoxTitle>
                <TitleOwner bold={FONT_WEIGHT.BOLD}>
                  {t('tour.booking.info_service')}
                </TitleOwner>
                <i className="fas fa-ellipsis-h" />
              </BoxTitle>
            </Col>
          </BoxOwner>
          <PaddingTop />
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.name')}</FiedTitle>
              <DeContent bold={FONT_WEIGHT.BOLD}>
                {'City tour Đà Nẵng'}
              </DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.email')}</FiedTitle>
              <DeContent bold={FONT_WEIGHT.BOLD}>
                {'CitytourDN@gmail.com'}
              </DeContent>
            </BoxSocialPageTour>
          </Col>
          <PaddingTop />
          <BoxOwner>
            <Col md={12}>
              <BoxTitle>
                <TitleOwner bold={FONT_WEIGHT.BOLD}>
                  {t('tour.booking.name')}
                </TitleOwner>
                <i className="fas fa-ellipsis-h" />
              </BoxTitle>
            </Col>
          </BoxOwner>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.service')}</FiedTitle>
              <DeContent bold={FONT_WEIGHT.BOLD}>{'Cù lao chàm'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.start_time')}</FiedTitle>
              <DeContent>{'10/02/2021'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.location')}</FiedTitle>
              <DeContent>{'Phú Yên - Quy Nhơn - Kỳ Co - KDL Hầm Hồ'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.total_time')}</FiedTitle>
              <DeContent>{'2 ngày 1 đêm'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.total_money')}</FiedTitle>
              <DeContent>{'1.500.000 vnđ'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.time')}</FiedTitle>
              <DeContent>{'09:30:50 - 07/02/2021'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.status')}</FiedTitle>
              <DeContent>{'Đã hoàn thành'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.count_member')}</FiedTitle>
              <DeContent>{'2 người lớn, 1 trẻ em'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <PaddingTop />
          <BoxOwner>
            <Col md={12}>
              <BoxTitle>
                <TitleOwner bold={FONT_WEIGHT.BOLD}>
                  {t('tour.booking.info_booking')}
                </TitleOwner>
                <i className="fas fa-ellipsis-h" />
              </BoxTitle>
            </Col>
          </BoxOwner>

          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.name')}</FiedTitle>
              <DeContent>{'Cù lao chàm'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.start_time')}</FiedTitle>
              <DeContent>{'10/02/2021'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.location')}</FiedTitle>
              <DeContent>{'TP.Đà Nẵng'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.total_time')}</FiedTitle>
              <DeContent>{'2 ngày 1 đêm'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.total_money')}</FiedTitle>
              <DeContent>{'1.500.000 vnđ'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.time')}</FiedTitle>
              <DeContent>{'09:30:50 - 07/02/2021'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.status')}</FiedTitle>
              <DeContent>{'Đã hoàn thành'}</DeContent>
            </BoxSocialPageTour>
          </Col>
          <Col md={12} className="mt-4 mb-4">
            <BoxSocialPageTour>
              <FiedTitle>{t('tour.booking.count_member')}</FiedTitle>
              <DeContent>{'2 người lớn, 1 trẻ em'}</DeContent>
            </BoxSocialPageTour>
          </Col>
        </BoxPageTour>
      </Col>
    </Row>
  );
};

export default FormTour;
