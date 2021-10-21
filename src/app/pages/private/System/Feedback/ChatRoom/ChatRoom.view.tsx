import React, { useEffect, useRef, useState } from 'react';
import Search from 'app/components/Form/SearchInput';
import { t } from 'app/i18n';
import Images from 'app/assets/images';
import SelectTypes from 'app/components/Form/SelectTypes';
import { getFeedbackChatRoomTypes } from 'app/utils';
import { ROUTERS } from 'app/constants';
import useOutsideClick from 'app/components/layout/useOutsideClick';

const DATA = [
  {
    name: 'Manh hoan',
  },
  {
    name: 'Manh hoan',
  },
  {
    name: 'Manh hoan',
  },
  {
    name: 'Manh hoan',
  },
  {
    name: 'Manh hoan',
    attachments: [
      {
        url: Images.background.default,
      },
      {
        url: Images.noData.default,
      },
    ],
  },
  {
    name: 'Manh hoan',
  },
];

const ChatRoom = ({ history }: any) => {
  const [state, setState]: any = useState({
    listMessage: DATA,
    message: '',
    isDropdown: 0,
    files: [],
    attachments: [],
  });

  const { listMessage, message, attachments, isDropdown } = state;

  const refClose: any = useRef();

  useOutsideClick(refClose, () => {
    setState({
      ...state,
      isDropdown: 0,
    });
  });

  const onKeyPress = (e: any) => {
    const SEND_MESSAGE = [
      {
        name: 'Admin',
        message: message,
        attachments,
      },
    ];

    if (e?.keyCode === 13 || e?.which === 13) {
      const data = listMessage?.concat(SEND_MESSAGE);

      setState({
        ...state,
        message: '',
        listMessage: data,
        attachments: [],
      });
    }
  };

  const onSend = () => {
    const SEND_MESSAGE = [
      {
        name: 'Admin',
        message: message,
        attachments,
      },
    ];
    const data = listMessage?.concat(SEND_MESSAGE);

    setState({
      ...state,
      message: '',
      listMessage: data,
      attachments: [],
    });
  };

  const onChangeText = (e: any) => {
    setState({ ...state, message: e?.target?.value });
  };

  const onChangeAttachments = (event: any) => {
    const file = event?.target?.files;
    const newFile: any = [...file];
    setState({
      ...state,
      attachments: newFile?.map((items: any) => ({
        url: window.URL.createObjectURL(
          new Blob([items], { type: 'image/jpeg' })
        ),
      })),
    });
  };

  const renderAttachmentPreviews = () => {
    return (
      <div className="grid grid-cols-6 gap-3 ">
        {attachments?.map((item: any) => {
          return (
            <img
              className="w-full h-40 rounded-lg object-cover"
              src={item?.url}
              alt="img-preview"
            />
          );
        })}
      </div>
    );
  };

  const messagesEndRef: any = useRef(null);
  const scrollToBottom = () => {
    messagesEndRef?.current?.scrollIntoView(false);
  };
  useEffect(scrollToBottom, [listMessage]);

  return (
    <>
      <div className="pb-4 space-x-6 cursor-pointer">
        <span
          onClick={() => history.push(ROUTERS.LIST_FEEDBACK)}
          className={'text-xl font-semibold capitalize '}
        >
          {t('feedback.title_list')}
        </span>
        <span>{'|'}</span>
        <span
          onClick={() => history.push(ROUTERS.FEEDBACK_CHAT_ROOM)}
          className={'text-xl font-semibold capitalize text-yellow-500'}
        >
          {t('feedback.chat_room')}
        </span>
      </div>
      <Search
        placeholder={t('search.placeholder.chat_room')}
        onSearch={() => {}}
        txtSearch={''}
        keySearchDefault={''}
      />
      <div className="grid grid-cols-3 gap-8">
        <div className="col-span-1">
          <div className="flex justify-between">
            <span className="font-medium">{t('chat_room.sender')}</span>
            <span className="font-medium">{t('chat_room.status')}</span>
          </div>
          <div className="mt-4 overflow-y-scroll h-65vh">
            {DATA.map((items: any) => (
              <div className="flex justify-between items-center p-3">
                <div className="flex flex-row items-center">
                  <img
                    className="w-16 h-16 rounded-full bg-cover shadow"
                    src={Images.avatar_defautl.default}
                    alt="avatar"
                  />
                  <div className="flex flex-col mx-3">
                    <span className="font-semibold">{items?.name}</span>
                    <span className="text-yellow-400 text-base">
                      {'2021.04.26 10:59'}
                    </span>
                    <span className="text-gray-400 text-sm">
                      {'1b9d6bcd-bbfd-4b2d-9b5d-ab8dfbbd4bed'}
                    </span>
                  </div>
                </div>
                <div className="flex flex-row">
                  <img src={Images.bell.default} alt="bell" className="mx-6" />
                  <span className="text-yellow-500">{'Đang Xử Lý'}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
        <div className="col-span-2 border border-gray-200 h-65vh h-full">
          <div className="bg-tab-active p-3 flex justify-between items-center">
            <span className="text-2xl text-white">
              {t('feedback.chat_room')}
            </span>
            <div className="flex flex-row items-center space-x-5">
              <span className="text-2xl text-white flex">
                {t('report.label')}
              </span>
              <div className="flex">
                <SelectTypes
                  data={getFeedbackChatRoomTypes()}
                  onChangeText={() => ({})}
                />
              </div>
            </div>
          </div>
          <div className="flex flex-col px-10 py-4 bg-blue-50 bg-opacity-70">
            <div className="flex flex-row items-center relative">
              <div className="shadow p-2 rounded-full bg-white">
                <img
                  className="w-12 h-12"
                  src={Images.jGooooo_account.default}
                  alt="logo"
                />
              </div>
              <i className="fas fa-thumbtack absolute right-0 top-0 transform rotate-45 text-default" />

              <span className="font-semibold mx-3">{'jGooooo Support'}</span>
            </div>
            <span className="px-24">
              {`We're here to help. Let's start with some questions 
                  so we can get you to the right place. Can you describe 
                  your issue in a few sentences? Focus on the most important 
                  reason you're contacting us.`}
            </span>
          </div>
          <div
            ref={refClose}
            className="overflow-y-scroll h-40vh px-4 bg-gray-100 bg-opacity-60"
          >
            {listMessage.map((items: any, index: number) => (
              <div className="flex flex-col p-3">
                <div className="flex flex-row items-center">
                  <img
                    className="w-16 h-16 rounded-full bg-cover shadow"
                    src={Images.avatar_defautl.default}
                    alt="avatar"
                  />
                  <div className="flex flex-col mx-3">
                    <span className="font-semibold">{items?.name}</span>
                    <span className="text-yellow-400 text-base">
                      {'2021.04.26 10:59'}
                    </span>
                  </div>
                </div>
                <div className="mx-20 p-4 bg-white relative">
                  {items?.name === 'Admin' && (
                    <div>
                      <i
                        onClick={() =>
                          setState({ ...state, isDropdown: index })
                        }
                        className="fas fa-ellipsis-h absolute top-0 right-0 p-2 cursor-pointer text-gray-500"
                      />
                      {index === isDropdown && (
                        <div className="flex flex-col bg-white shadow absolute right-0">
                          <span className="py-2 px-6 border-b cursor-pointer hover:bg-gray-50">
                            <i className="fas fa-pen mr-3" />
                            {t('action.edit')}
                          </span>
                          <span className="py-2 px-6  cursor-pointer hover:bg-gray-50">
                            <i className="far fa-trash-alt mr-3" />
                            {t('admin.delete')}
                          </span>
                        </div>
                      )}
                    </div>
                  )}
                  <span>
                    {items?.message ||
                      `Tôi khó có thể tìm được cách tạo plan kế hoạch của 
                      mình Trong hệ thống của chúng tôi, bạn cần phải  lưu lại 
                      địa điểm khi đến (trong vòng bán kính 300m). Khi đó bạn 
                      mới được quyền sử dụng địa điểm này để Check-in khi tạo bài viết. 
                      Mục đích nhằm xác nhận thực tế bạn đã từng đến đây 
                      (trong trường hợp địa điểm chưa có người khởi tạo bạn có thể tạo 1 địa điểm mới)`}
                  </span>
                  <div className="grid grid-cols-4 gap-3 my-3">
                    {items?.attachments?.map((items: any, index: number) => (
                      <div key={index}>
                        <img
                          className="w-full h-48 rounded-lg object-contain border"
                          src={items?.url}
                          alt="attachments"
                        />
                      </div>
                    ))}
                  </div>
                </div>
              </div>
            ))}
            <div ref={messagesEndRef} />
          </div>
          <div className="bg-gray-100 bg-opacity-60">
            <div className="flex flex-col relative mx-2 mb-2 px-8 py-2 bg-white border border-gray-50">
              <div className="flex flex-row items-center ">
                <div className="shadow p-2 rounded-full bg-white">
                  <img
                    className="w-12 h-12"
                    src={Images.jGooooo_account.default}
                    alt="logo"
                  />
                </div>
                <div className="flex flex-col mx-3">
                  <span className="font-semibold ">
                    {'Admin/jGooooo Support'}
                  </span>
                  <span className="text-yellow-400 text-base">
                    {'2021.04.26 10:59'}
                  </span>
                </div>
              </div>
              <div className="ml-20 mt-2">
                <input
                  className="flex flex-1 h-16 px-3 bg-gray-100 bg-opacity-70 rounded-sm w-full placeholder-gray-600"
                  placeholder={t('message.placeholder')}
                  type="text"
                  onChange={onChangeText}
                  value={message}
                  onKeyPress={onKeyPress}
                  maxLength={250}
                />
                <div className="flex justify-between text-gray-500 pt-1 cursor-pointer">
                  <div className="space-x-4 flex">
                    <i className="far fa-smile text-xl" />
                    <div className="relative">
                      <input
                        type="file"
                        multiple
                        onChange={onChangeAttachments}
                        className="opacity-0 absolute z-10"
                      />
                      <i className="fas fa-paperclip transform rotate-45 text-xl" />
                    </div>
                  </div>
                  <div>
                    <span className="mx-2 text-gray-400 text-lg">
                      {`${message?.length}/${250 - message?.length}`}
                    </span>
                    <i
                      onClick={onSend}
                      className="fas fa-location-arrow transform rotate-45 text-xl mr-1 text-blue-500"
                    />
                  </div>
                </div>
                {renderAttachmentPreviews()}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ChatRoom;
