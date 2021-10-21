import Images from 'app/assets/images';
import { COLORS, COORDINATES } from 'app/constants';
import { t } from 'app/i18n';
import React, { useState, useEffect, useRef } from 'react';
import { Col, Input, Row } from 'reactstrap';
import { getDataStatus } from 'app/utils';
import Map from 'app/components/GoogleMap/map';
import PopoverItem from 'app/components/Popover';
import { DeContent } from 'app/components/layout/styled';
import Modal from 'app/components/Modal';
import {
  BoxImage,
  ImagesStyled,
  BoxCheckPoint,
  SosTitle,
  SosContent,
  IConMarker,
  IConTime,
  IConNote,
  BoxMessage,
  HeaderMessage,
  IConMore,
  BoxChatting,
  BoxInput,
  BoxAvatar,
  BoxSend,
  IConEmoji,
  IConPaperclip,
  IConSend,
  BoxUsers,
  BoxDropDown,
  BoxInformationPageUser,
  TitleInfor,
  ContentInfor,
  AvatarCircleStyled,
  BoxName,
} from './DetailSos.styled';
import { DATA_INFORMATION, DATA_MESSAGE } from './DetailSos.constant';

const DetailSos = () => {
  const [state, setState] = useState({
    listMessage: DATA_MESSAGE,
    message: '',
    isDropdown: false,
    isModalNote: false,
  });

  const { listMessage, message, isDropdown, isModalNote } = state;

  const SEND_MESSAGE = [
    {
      avatar: Images.avatar_defautl.default,
      name: 'Admin',
      message: message,
      createdAt: '2021.04.26 05:17',
    },
  ];

  const onSend = () => {
    const data = listMessage?.concat(SEND_MESSAGE);

    setState({
      ...state,
      message: '',
      listMessage: data,
    });
  };

  const onKeyPress = (e: any) => {
    if (e?.keyCode === 13 || e?.which === 13) {
      const data = listMessage?.concat(SEND_MESSAGE);

      setState({
        ...state,
        message: '',
        listMessage: data,
      });
    }
  };

  const onChangeText = (e: any) => {
    setState({ ...state, message: e?.target?.value });
  };

  const renderInformationSos = () => {
    const DATA = [
      {
        title: t('sos.phone'),
        value: DATA_INFORMATION?.phone,
      },
      {
        title: t('sos.rally_point'),
        value: DATA_INFORMATION?.rallyPoint,
      },
      {
        checkPoint: DATA_INFORMATION?.checkPoint,
      },
      {
        title: t('sos.final_point'),
        value: DATA_INFORMATION?.finalPoint,
      },
      {
        title: t('sos.status'),
        value: DATA_INFORMATION?.status,
      },
      {
        title: t('sos.rescue'),
        value: DATA_INFORMATION?.rescue,
      },
      {
        supporter: DATA_INFORMATION?.supporter,
      },
    ];

    return (
      <>
        {DATA.map((items: any, index: number) => (
          <Row key={index} className="mb-3">
            <Col md={3}>
              <SosTitle>{items?.title}</SosTitle>
            </Col>
            <Col md={9}>
              <SosContent>{items?.value}</SosContent>
            </Col>
            {items?.checkPoint?.map((point: any, pointIndex: number) => {
              const lastChild = items?.checkPoint?.length === pointIndex + 1;
              return (
                <>
                  <Col md={3} className={`${!lastChild && 'mb-3'}`}>
                    <IConMarker />
                    <SosTitle>
                      {`${t('sos.check_point')} ${pointIndex + 1}`}
                    </SosTitle>
                  </Col>
                  <Col md={9} className={`${!lastChild && 'mb-3'}`}>
                    <BoxCheckPoint>
                      <SosContent bold>{point?.coordinate}</SosContent>
                      <SosContent>{point?.location}</SosContent>
                      <SosContent time>
                        <IConTime />
                        {point?.createdAt}
                      </SosContent>
                    </BoxCheckPoint>
                  </Col>
                </>
              );
            })}
            {items?.supporter?.map((sup: any, supIndex: number) => {
              return (
                <>
                  <Col md={3}>
                    {!supIndex && <SosTitle>{t('sos.support')}</SosTitle>}
                  </Col>
                  <Col md={9} key={supIndex}>
                    <SosContent>
                      <SosContent color={COLORS.BLUE}>
                        {`${sup?.name} `}{' '}
                      </SosContent>
                      {` | ${sup?.phone} | ${sup?.email}`}
                    </SosContent>
                  </Col>
                </>
              );
            })}
          </Row>
        ))}
      </>
    );
  };

  const renderInformation = () => {
    const DATA_INFOR = [
      {
        key: t('user.birthday'),
        value: '15-05-1990',
      },

      {
        key: t('user.gender'),
        value: 'Nữ',
      },
      {
        key: t('user.job'),
        value: 'Designer',
      },
      {
        key: t('user.created'),
        value: '22:53 01/02/2021',
      },
      {
        key: t('user.email'),
        value: 'votran@gmail.com',
      },
      {
        key: t('user.phone'),
        value: '+84 905 555 333',
      },
      {
        key: t('user.web'),
        value: 'www.utotech.vn',
      },
      {
        key: t('user.address'),
        value: '15, Quang Trung, Thạch Than, Hải Châu Đà Nẵng',
      },
    ];

    return (
      <>
        {DATA_INFOR.map((items: any, index: number) => (
          <Col md={12} key={index}>
            <BoxInformationPageUser>
              <TitleInfor>{items?.key}</TitleInfor>
              <ContentInfor>{items?.value}</ContentInfor>
            </BoxInformationPageUser>
          </Col>
        ))}
      </>
    );
  };

  const renderfamousSocial = () => {
    const DATA = [
      {
        key: t('user.name'),
        value: 'Tran Vo',
        style: true,
      },
      {
        key: t('user.follower'),
        value: '200.000',
      },
      {
        key: t('user.followings'),
        value: '200.000',
      },
    ];
    return (
      <>
        {DATA.map((item: any, index: number) => (
          <BoxName key={index}>
            <span className="key">{item?.key}</span>
            <span className={`value ${item?.style && 'font-weight-bold'}`}>
              {item?.value}
            </span>
          </BoxName>
        ))}
      </>
    );
  };

  const renderInformationUser = () => {
    return (
      <>
        <Row>
          <Col md={2}>
            <AvatarCircleStyled src={Images.background.default} alt="avatar" />
          </Col>
          <Col md={10} className="text-right">
            <SosContent className="text-danger font-weight-bold">
              {`${t('user.id')}: ${100}`}
            </SosContent>
            {renderfamousSocial()}
          </Col>
        </Row>
        {renderInformation()}
        <Col md={12}>
          <TitleInfor>{t('user.intro')}</TitleInfor>
        </Col>
        <Col md={12} className="mt-2 mb-4">
          <DeContent>
            {
              'Lorem Ipsum is simply dummy text of the printing and typesetting industry. Lorem Ipsum has been the industry\'s '
            }
          </DeContent>
        </Col>
      </>
    );
  };

  const renderSupportNotes = () => {
    return (
      <>
        <BoxChatting height="500px">
          {listMessage?.map((items: any, index: number) => (
            <Row className="mb-3" key={index}>
              <Col md={3} className="col mt-1">
                <BoxUsers>
                  <PopoverItem
                    name={<BoxAvatar src={items?.avatar} />}
                    popoverKey={index}
                    placement="right"
                    body={renderInformationUser()}
                  />

                  <div className="name">
                    <SosContent bold>{items?.name}</SosContent>
                    <SosContent time>{items?.createdAt}</SosContent>
                  </div>
                </BoxUsers>
              </Col>
              <Col md={9} className="col">
                <SosContent>{items?.message}</SosContent>
              </Col>
            </Row>
          ))}
          <div ref={messagesEndRef} />
        </BoxChatting>
        <div className="border-bottom mt-5" />
        <BoxInput margin="-5px" className="mt-4">
          <Row>
            <Col md={3} className="mt-1">
              <BoxAvatar src={Images.avatar_defautl.default} /> &#160;
              <SosContent bold>{'Admin'}</SosContent>
            </Col>
            <Col md={9}>
              <Input
                type="text"
                onChange={onChangeText}
                placeholder={t('message.placeholder')}
                value={message}
                onKeyPress={onKeyPress}
              />
              <BoxSend margin="15px">
                <div>
                  <IConEmoji />
                  <IConPaperclip />
                </div>
                <div>
                  <SosContent>
                    {`${message?.length}/${250 - message?.length}`}
                  </SosContent>
                  <IConSend onClick={() => onSend()} />
                </div>
              </BoxSend>
            </Col>
          </Row>
        </BoxInput>
      </>
    );
  };

  const messagesEndRef: any = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView(false);
  };
  useEffect(scrollToBottom, [listMessage]);

  return (
    <Row className="mt-4">
      <Col md={6}>
        <Row>
          <Col md={3} className="mb-3">
            <SosTitle>{t('sos.sender')}</SosTitle>
          </Col>
          <Col md={9} className="mb-3">
            <BoxImage>
              <ImagesStyled src={Images.background.default} alt="img" />
              <SosContent>{DATA_INFORMATION?.users}</SosContent>
            </BoxImage>
          </Col>
        </Row>
        {renderInformationSos()}
        <Row>
          <Col md={3} className="mb-3">
            <SosTitle color={COLORS.TEXT_DEFAULT}>
              {t('sos.handler_status')}
            </SosTitle>
          </Col>
          <Col md={4} className="mb-3">
            <Input type="select">
              {getDataStatus()?.map((option: any, index: number) => (
                <option key={index} value={option?.value}>
                  {option?.name}
                </option>
              ))}
            </Input>
          </Col>
        </Row>
      </Col>
      <Col md={6}>
        <div className="text-right mb-1">
          <SosTitle
            point
            color={COLORS.TEXT_DEFAULT}
            onClick={() => setState({ ...state, isModalNote: !isModalNote })}
          >
            {t('sos.support_note')}
            <IConNote />
          </SosTitle>
        </div>
        <Map center={COORDINATES} draggable={false} height="270px" zoom={15} />
        <BoxMessage>
          <HeaderMessage>
            <SosTitle color={COLORS.WHITE}>
              {t('sos.forum_search_rescue')}
            </SosTitle>
            <SosTitle color={COLORS.WHITE}>
              {`12 ${t('sos.member')}`}
              <IConMore
                onClick={() => setState({ ...state, isDropdown: !isDropdown })}
              />
              {isDropdown && (
                <BoxDropDown>
                  <SosContent>{t('sos.option.forum')}</SosContent>
                  <SosContent>{t('sos.option.member')}</SosContent>
                </BoxDropDown>
              )}
            </SosTitle>
          </HeaderMessage>
          <BoxChatting>
            {listMessage?.map((items: any, index: number) => (
              <Row className="mb-3" key={index}>
                <Col md={3} className="col mt-1">
                  <BoxUsers>
                    <PopoverItem
                      name={<BoxAvatar src={items?.avatar} />}
                      popoverKey={index}
                      placement="right"
                      body={renderInformationUser()}
                    />

                    <div className="name">
                      <SosContent bold>{items?.name}</SosContent>
                      <SosContent time>{items?.createdAt}</SosContent>
                    </div>
                  </BoxUsers>
                </Col>
                <Col md={9} className="col">
                  <SosContent>{items?.message}</SosContent>
                </Col>
              </Row>
            ))}
            <div ref={messagesEndRef} />
          </BoxChatting>
          <BoxInput>
            <Row>
              <Col md={3} className="col mt-1">
                <BoxAvatar src={Images.avatar_defautl.default} /> &#160;
                <SosContent bold>{'Admin'}</SosContent>
              </Col>
              <Col md={9} className="col">
                <Input
                  type="text"
                  onChange={onChangeText}
                  placeholder={t('message.placeholder')}
                  value={message}
                  onKeyPress={onKeyPress}
                />
                <BoxSend>
                  <div>
                    <IConEmoji />
                    <IConPaperclip />
                  </div>
                  <div>
                    <SosContent>
                      {`${message?.length}/${250 - message?.length}`}
                    </SosContent>
                    <IConSend onClick={() => onSend()} />
                  </div>
                </BoxSend>
              </Col>
            </Row>
          </BoxInput>
        </BoxMessage>
        <Modal
          header={t('sos.support_note')}
          isShowModal={isModalNote}
          toggle={() =>
            setState({
              ...state,
              isModalNote: !isModalNote,
            })
          }
          body={renderSupportNotes()}
        />
      </Col>
    </Row>
  );
};

export default DetailSos;
