import React, { useState } from 'react';
import { Row, Col } from 'reactstrap';
import Images from 'app/assets/images';
import { DeContent, DeSubTitle, DeTitle } from 'app/components/layout/styled';
import { FONT_WEIGHT, ROUTERS } from 'app/constants';
import Carousel from 'app/components/Carousel';
import Modal from 'app/components/Modal';
import SquareImage from 'app/components/SquareImage/SquareImage';
import { DATA_IMG_DEFAULT } from 'app/constants';
import ReactPaginate from 'app/components/Paginations';
import { customPathImage } from 'app/utils';
import { t } from 'app/i18n';
import {
  Background,
  BoxPageStay,
  Avatar,
  BoxBackground,
  BoxAvatar,
  TitleName,
  BoxInformationPageStay,
  TitleInfor,
  ContentInfor,
  AuthenPage,
  BoxOwner,
  TitleOwner,
  AvatarOwner,
  BoxSocialPageStay,
  BoxCustomPageStay,
  BoxTitle,
  BoxDropDown,
  BoxShowMore,
  DetailCreator,
} from './DetailStay.styled';

const FormStay = (props: any) => {
  const { match, history, data } = props;

  const [state, setState] = useState({
    isShowDropDown: false,
    isShowSocialDropDown: false,
    isShowSocial: true,
    isShowOverview: false,
    isShowModal: false,
  });

  const {
    isShowDropDown,
    isShowSocialDropDown,
    isShowSocial,
    isShowOverview,
    isShowModal,
  } = state;

  const onToggleDropdown = () => {
    setState({
      ...state,
      isShowDropDown: !isShowDropDown,
    });
  };

  const onToggleSocialDropdown = () => {
    setState({
      ...state,
      isShowSocialDropDown: !isShowSocialDropDown,
    });
  };

  const onShowSocial = () => {
    setState({
      ...state,
      isShowSocial: true,
      isShowSocialDropDown: false,
      isShowOverview: false,
    });
  };

  const onShowOverview = () => {
    setState({
      ...state,
      isShowOverview: true,
      isShowSocialDropDown: false,
      isShowSocial: false,
    });
  };

  const onToggleModal = () => {
    setState({
      ...state,
      isShowModal: !isShowModal,
    });
  };

  const onAuthenicationPage = () => {
    history?.push(
      ROUTERS.STAY_AUTHENTICATION_PAGE.replace(':id', match?.params?.id)
    );
  };

  const onDetailCreator = () => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', data?.userId));
  };

  return (
    <Row>
      <Col md={5}>
        <BoxPageStay>
          <BoxOwner>
            <Col md={12}>
              <BoxTitle>
                <TitleOwner bold={FONT_WEIGHT.BOLD}>
                  {t('stay.detail')}
                </TitleOwner>
                <BoxShowMore>
                  <i onClick={onToggleDropdown} className="fas fa-ellipsis-h" />
                  {isShowDropDown && (
                    <BoxDropDown>
                      <span>
                        <i className="far fa-eye" />
                        {t('stay.view')}
                      </span>
                      <span onClick={onToggleDropdown}>
                        <i className="fas fa-unlock-alt" />
                        {t('stay.un_block')}
                      </span>
                      <span onClick={onToggleDropdown}>
                        <i className="fas fa-lock" />
                        {t('stay.block')}
                      </span>
                    </BoxDropDown>
                  )}
                </BoxShowMore>
              </BoxTitle>
            </Col>
          </BoxOwner>
          <BoxBackground>
            <Background
              src={customPathImage(data?.backgroundMedia?.url)}
              alt="background"
            />
            <BoxAvatar>
              <Avatar
                src={customPathImage(data?.avatarMedia?.url)}
                alt="avatar"
              />
            </BoxAvatar>
          </BoxBackground>
          <TitleName>{data?.name}</TitleName>
          <Col md={12}>
            <BoxInformationPageStay>
              <TitleInfor>{t('stay.id')}</TitleInfor>
              <ContentInfor>{data?.id}</ContentInfor>
            </BoxInformationPageStay>
          </Col>
          <Col md={12}>
            <BoxInformationPageStay>
              <TitleInfor>{t('stay.phone')}</TitleInfor>
              <ContentInfor>{data?.phone}</ContentInfor>
            </BoxInformationPageStay>
          </Col>
          <Col md={12}>
            <BoxInformationPageStay>
              <TitleInfor>{t('stay.email')}</TitleInfor>
              <ContentInfor>{data?.email}</ContentInfor>
            </BoxInformationPageStay>
          </Col>
          <Col md={12}>
            <BoxInformationPageStay>
              <TitleInfor>{t('stay.verify')}</TitleInfor>
              <ContentInfor>
                {'yêu cầu xác thực'}
                <AuthenPage onClick={onAuthenicationPage}>
                  {t('stay.anthentication')}
                </AuthenPage>
              </ContentInfor>
            </BoxInformationPageStay>
          </Col>
          <Col md={12}>
            <BoxInformationPageStay>
              <TitleInfor>{t('stay.address')}</TitleInfor>
              <ContentInfor>{data?.location?.formatedAddress}</ContentInfor>
            </BoxInformationPageStay>
          </Col>
          <Col md={12}>
            <BoxInformationPageStay>
              <TitleInfor>{t('stay.payment')}</TitleInfor>
              <ContentInfor>{''}</ContentInfor>
            </BoxInformationPageStay>
          </Col>
          <Col md={12}>
            <TitleInfor>{t('stay.intro')}</TitleInfor>
          </Col>
          <Col md={12} className="mt-2 mb-4">
            <DeContent>{data?.bio}</DeContent>
          </Col>
        </BoxPageStay>
        <BoxPageStay>
          <BoxOwner>
            <Col md={12}>
              <BoxTitle>
                <TitleOwner bold={FONT_WEIGHT.BOLD}>
                  {t('stay.info_owner')}
                </TitleOwner>
                <DetailCreator onClick={onDetailCreator}>
                  {t('stay.view.detail')}
                </DetailCreator>
              </BoxTitle>
            </Col>
          </BoxOwner>
          <Col md={12} className="text-center mt-4 mb-4">
            <AvatarOwner src={Images.background.default} />
          </Col>
          <Col className="text-center">
            <DeTitle>{data?.user?.name}</DeTitle>
          </Col>
          <Col className="text-center">
            <DeContent bold={FONT_WEIGHT.THIN}>
              <i>{'hoang xuan mạnh@gmail.com'}</i>
            </DeContent>
          </Col>
          <Col className="text-center mb-4">
            <DeContent bold={FONT_WEIGHT.THIN}>
              <i>{'+84 905 555 333'}</i>
            </DeContent>
          </Col>
        </BoxPageStay>
      </Col>
      <Col md={7}>
        <BoxCustomPageStay>
          <BoxOwner>
            <Col md={12}>
              <BoxTitle>
                <TitleOwner bold={FONT_WEIGHT.BOLD}>
                  {t('stay.info_social')}
                </TitleOwner>
                <BoxShowMore>
                  <i
                    onClick={onToggleSocialDropdown}
                    className="fas fa-ellipsis-h"
                  />
                  {isShowSocialDropDown && (
                    <BoxDropDown>
                      <span onClick={onShowSocial}>
                        {t('stay.info_social')}
                      </span>
                      <span onClick={onShowOverview}>
                        {t('stay.info_overview')}
                      </span>
                    </BoxDropDown>
                  )}
                </BoxShowMore>
              </BoxTitle>
            </Col>
          </BoxOwner>
          {isShowSocial && (
            <>
              <Col md={12} className="mt-4 mb-4">
                <BoxSocialPageStay>
                  <DeContent>{t('stay.count_post')}</DeContent>
                  <DeContent>{'100'}</DeContent>
                </BoxSocialPageStay>
              </Col>
              <Col md={12} className="mt-4 mb-4">
                <BoxSocialPageStay>
                  <DeContent>{t('stay.count_fllower')}</DeContent>
                  <DeContent>{'1.000.000'}</DeContent>
                </BoxSocialPageStay>
              </Col>
              <Col md={12} className="mt-4 mb-4">
                <BoxSocialPageStay>
                  <DeContent>{t('stay.count_ranking')}</DeContent>
                  <DeContent>{'100'}</DeContent>
                </BoxSocialPageStay>
              </Col>
              <Col md={12} className="mt-4">
                <BoxSocialPageStay>
                  <DeContent>{t('stay.count_service')}</DeContent>
                  <DeContent>{'100'}</DeContent>
                </BoxSocialPageStay>
              </Col>
            </>
          )}
          {isShowOverview && (
            <Row className="box-image">
              <Col md={12} className="mt-4">
                <DeSubTitle bold={FONT_WEIGHT.N_BOLD}>
                  {t('stay.menu_image')}
                </DeSubTitle>
              </Col>
              {DATA_IMG_DEFAULT?.map((items: any, index: number) => (
                <Col
                  key={index}
                  md={3}
                  className="mt-2 image"
                  onClick={onToggleModal}
                >
                  <SquareImage src={items?.url} />
                </Col>
              ))}
              <Modal
                isShowModal={isShowModal}
                toggle={onToggleModal}
                body={<Carousel items={DATA_IMG_DEFAULT} indexCarousel={1} />}
              />
              <Col md={12} className="mt-2 mb-2">
                <ReactPaginate
                  onPageChange={{}}
                  pageCount={1}
                  previousLabel="<"
                  nextLabel=">"
                  breakLabel="..."
                  breakClassName="break-me"
                  marginPagesDisplayed={5}
                  pageRangeDisplayed={5}
                  // onPageChange={this.handlePageClick}
                  containerClassName="react-pagination"
                  // subContainerClassName="pages pagination"
                  activeClassName="active"
                />
              </Col>
              <Col md={12} className="mt-5">
                <DeSubTitle bold={FONT_WEIGHT.N_BOLD}>
                  {t('stay.location_image')}
                </DeSubTitle>
              </Col>
              {DATA_IMG_DEFAULT?.map((items: any, index: number) => (
                <Col
                  key={index}
                  md={3}
                  className="mt-2 image"
                  onClick={onToggleModal}
                >
                  <SquareImage src={items?.url} />
                </Col>
              ))}
              <Modal
                isShowModal={isShowModal}
                toggle={onToggleModal}
                body={<Carousel items={DATA_IMG_DEFAULT} indexCarousel={1} />}
              />
              <Col md={12} className="mt-2 mb-2">
                <ReactPaginate
                  onPageChange={{}}
                  pageCount={1}
                  previousLabel="<"
                  nextLabel=">"
                  breakLabel="..."
                  breakClassName="break-me"
                  marginPagesDisplayed={5}
                  pageRangeDisplayed={5}
                  // onPageChange={this.handlePageClick}
                  containerClassName="react-pagination"
                  // subContainerClassName="pages pagination"
                  activeClassName="active"
                />
              </Col>
            </Row>
          )}
        </BoxCustomPageStay>
      </Col>
    </Row>
  );
};

export default FormStay;
