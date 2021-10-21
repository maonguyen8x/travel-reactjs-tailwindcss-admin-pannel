import React, { useEffect, useRef, useState } from 'react';
import { t } from 'app/i18n';
import { getVerifyStatus, getInformationVerify } from 'app/utils';
import Images from 'app/assets/images';
import useOutsideClick from 'app/components/layout/useOutsideClick';
import Modal from 'app/components/Modal';
import Carousel from 'app/components/Carousel';
import { IProps } from './DetailAccount.type';

export const getVerifySupport = () => [
  {
    value: t('report.support.owner'),
    option: false,
  },
  {
    value: t('report.support.id'),
    option: false,
  },
  {
    value: t('report.support.name'),
    option: false,
  },
  {
    value: t('report.support.image'),
    option: false,
  },
];

const VerifiAccountDetail = (props: IProps) => {
  const { verifyDetail, getVerifyPageById } = props;

  const [state, setState] = useState({
    status: '',
    support: getVerifySupport(),
    message: '',
    isDropdown: 0,
    isShowModal: false,
  });

  const { status, support, message, isDropdown, isShowModal } = state;

  const refClose: any = useRef();

  useOutsideClick(refClose, () => {
    setState({
      ...state,
      isDropdown: 0,
    });
  });

  const onToggleModal = () => setState({ ...state, isShowModal: !isShowModal });

  const onChangeText = (e: any) => {
    setState({ ...state, message: e?.target?.value });
  };

  const onKeyPress = (e: any) => {
    if (e?.keyCode === 13 || e?.which === 13) {
      const data = support?.concat({ value: message.trim(), option: true });
      setState({
        ...state,
        message: '',
        support: data,
      });
    }
  };

  const onSend = () => {
    const data = support?.concat({ value: message.trim(), option: true });
    setState({
      ...state,
      message: '',
      support: data,
    });
  };

  const onChangeStatus = (status: string) => {
    setState({
      ...state,
      status,
    });
  };

  useEffect(() => {
    const { id } = props?.match?.params;
    getVerifyPageById(id);
  }, []);

  const serviceProviderAvatar = verifyDetail?.page?.avatarMedia?.urlTiny;
  const serviceProviderName = verifyDetail?.page?.name;
  const serviceProviderEmail = verifyDetail?.page?.email;
  const avatarUser =
    verifyDetail?.page?.user?.profiles?.avatars?.mediaContent?.urlTiny;
  const userName = verifyDetail?.page?.user?.name;
  const userEmail = verifyDetail?.page?.user?.email?.email;

  return (
    <div className="grid grid-cols-2 gap-10">
      <div>
        <div className="col-span-1 border-b border-gray-200">
          <div className="flex flex-row items-center py-3">
            <span className="w-1/3">{t('verify.provider')}</span>
            <div className="flex flex-row justify-center items-center">
              <img
                className="w-16 h-16 bg-cover rounded-full shadow"
                src={serviceProviderAvatar || Images.avatar_defautl.default}
                alt=""
              />
              <div className="flex flex-col px-2">
                <span className="text-blue-400 font-medium">
                  {serviceProviderName}
                </span>
                <span className="text-gray-500">{serviceProviderEmail}</span>
              </div>
            </div>
          </div>
          <div className="flex flex-row items-center pt-3 pb-5">
            <span className="w-1/3">{t('verify.user')}</span>
            <div className="flex flex-row justify-center items-center">
              <img
                className="w-16 h-16 bg-cover rounded-full shadow"
                src={avatarUser || Images.image_default.default}
                alt=""
              />
              <div className="flex flex-col px-2">
                <span className="text-blue-400 font-medium">{userName}</span>
                <span className="text-gray-500">{userEmail}</span>
              </div>
            </div>
          </div>
        </div>
        <div className="py-4">
          <div className="flex justify-between items-center">
            <label className="text-default text-2xl font-semibold">
              {t('verify.information')}
            </label>
            <i className="fas fa-times-circle text-red-500 text-2xl" />
          </div>
          <div className="py-4">
            {getInformationVerify(verifyDetail)?.map(
              (items: any, number: number) => (
                <div key={number} className="flex items-center py-3">
                  <label className="w-1/3">
                    <span className="font-medium">{items?.key}</span>
                  </label>
                  <span className="w-2/3">{items?.value}</span>
                  <input type="checkbox" />
                </div>
              )
            )}
          </div>
          <div className="my-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{t('verify.image_personal')}</span>
              <input type="checkbox" />
            </div>
            <div className="grid grid-cols-2 w-2/4 gap-4 my-2">
              {verifyDetail?.personalMediaContents?.map(
                (items: any, index: number) => {
                  return (
                    <div key={index} onClick={onToggleModal}>
                      <img
                        className="w-full h-60 object-cover bg-cover rounded-lg cursor-pointer"
                        src={items?.url || Images.avatar_defautl.default}
                        alt=""
                      />
                    </div>
                  );
                }
              )}
            </div>
          </div>
          <div className="my-3">
            <div className="flex justify-between items-center">
              <span className="font-medium">{t('verify.image_business')}</span>
              <input type="checkbox" />
            </div>
            <div className="grid grid-cols-3 gap-4 w-2/3 my-2">
              {verifyDetail?.enterpriseMediaContents?.map(
                (items: any, index: number) => (
                  <div key={index} onClick={onToggleModal}>
                    <img
                      className="w-full h-60 object-cover bg-cover rounded-lg cursor-pointer"
                      src={items?.url}
                      alt="cmt"
                    />
                  </div>
                )
              )}
            </div>
            <Modal
              isShowModal={isShowModal}
              toggle={onToggleModal}
              body={<Carousel items={verifyDetail?.enterpriseMediaContents} />}
            />
          </div>
        </div>
      </div>
      <div className="col-span-1 ">
        <div>
          <div className="flex justify-end">
            <div className="w-1/3">
              <span className="text-default font-semibold flex">
                {t('report.label')}
              </span>
              <div className="mt-2">
                <select
                  value={status}
                  className="w-full h-16 px-3 border bg-gray-100 mb-4"
                  onChange={(e: any) => onChangeStatus(e?.target?.value)}
                >
                  {getVerifyStatus()?.map((items: any, key: number) => (
                    <option key={key} value={items?.value}>
                      {items?.name}
                    </option>
                  ))}
                </select>
              </div>
            </div>
          </div>
          <div
            className="relative bg-white w-full h-75vh mt-28 ring-8 ring-gray-100 ring-opacity-70 "
            ref={refClose}
          >
            <div className="flex flex-col space-y-8 p-4">
              <label>
                <span className="font-semibold text-2xl leading-relaxed">
                  {t('verify.support')}
                </span>
              </label>
              {support.map((item: any, index: number) => (
                <span key={index}>
                  {item?.value}
                  {item?.option && (
                    <div className="flex flex-row justify-end -mt-5">
                      <i
                        onClick={() =>
                          setState({ ...state, isDropdown: index })
                        }
                        className="fas fa-ellipsis-h"
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
                </span>
              ))}
            </div>
            <div className="h-52 w-full absolute bottom-0">
              <textarea
                placeholder={t('placeholder.verify')}
                onChange={onChangeText}
                value={message}
                onKeyPress={onKeyPress}
                className="text-2xl leading-relaxed bg-gray-100 bg-opacity-70 w-full h-full border-4 border-white p-3 resize-none outline-none"
              >
              </textarea>
              <button onClick={onSend}>
                <i className="fas fa-location-arrow transform rotate-45 text-xl mr-1 text-blue-500 absolute bottom-2 right-4 cursor-pointer" />
              </button>
            </div>
          </div>
          <div className="text-right py-10">
            <button className="bg-green-500 py-3 px-8 rounded-md hover:opacity-80">
              <span className="text-white font-medium">
                {t('sw.button.send')}
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifiAccountDetail;
