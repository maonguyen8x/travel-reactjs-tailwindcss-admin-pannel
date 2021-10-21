import { t } from 'app/i18n';
import React, { useState, useRef } from 'react';
import useOutsideClick from 'app/components/layout/useOutsideClick';
import { formatTime } from 'app/utils';
import { USER_ROLES } from 'app/constants';
import { Alert } from 'reactstrap';

const Audit = (props: any) => {
  const [state, setState] = useState({
    isSearchTime: false,
    startTime: '',
    endTime: '',
  });

  const ref: any = useRef(null);

  const { isSearchTime, startTime, endTime } = state;

  const onToggleSearchTime = () => {
    setState({ ...state, isSearchTime: !isSearchTime });
  };

  const onChangeStartTime = (e: any) => {
    setState({ ...state, startTime: e?.target?.value });
  };

  const onChangeEndTime = (e: any) => {
    setState({ ...state, endTime: e?.target?.value });
  };

  useOutsideClick(ref, () => {
    isSearchTime &&
      setState({
        ...state,
        isSearchTime: false,
      });
  });

  if (
    props?.role !== USER_ROLES.ADMIN &&
    props?.role !== USER_ROLES.SUPER_ADMIN
  )
    return <Alert color="warning">{t('permissions_role')}</Alert>;
  return (
    <div>
      <div className="flex flex-wrap mb-10 gap-2" ref={ref}>
        <div className={'relative flex flex-1 items-center'}>
          <input
            className="w-full py-3 pl-16 text-xl shadow-sm border border-gray-100"
            type="search"
            placeholder={t('audit.placeholder')}
          />
          <i className="fas fa-search absolute ml-4 text-gray-400 text-xl" />
        </div>
        <div className="relative bg-tab-active text-white flex items-center justify-center px-4 rounded cursor-pointer">
          <button onClick={onToggleSearchTime} className="outline-none">
            <span className="text-2xl text-white">
              {startTime || 'yyyy.mm.dd'}
            </span>
            {'-'}
            <span className="text-2xl text-white">
              {endTime || 'yyyy.mm.dd'}
            </span>
          </button>
          {isSearchTime && (
            <div className="bg-white shadow absolute top-full w-full flex flex-col p-3 rounded-md space-y-5">
              <div className="flex flex-col">
                <span>{t('audit.from_time')}</span>
                <input
                  onChange={onChangeStartTime}
                  type="date"
                  className="border h-10 text-gray-500 px-2"
                />
              </div>
              <div className="flex flex-col">
                <span>{t('audit.end_time')}</span>
                <input
                  onChange={onChangeEndTime}
                  type="date"
                  className="border  h-10 text-gray-500  px-2"
                />
              </div>
            </div>
          )}
        </div>
      </div>
      <div>
        <span className="text-2xl text-default font-medium">
          {t('audit.process')}
        </span>
        {[0, 1, 2, 3, 4, 5, 6, 7].map((_: any, index: number) => (
          <div
            key={index}
            className="pt-10 flex items-center text-2xl space-x-2"
          >
            <span className="">{formatTime(new Date())}</span>
            <div>{'|'}</div>
            <span className="">{'Nguyễn Thái Long'}</span>
            <div>{'|'}</div>
            <span>
              <span className="text-red-500">{'Locked - '}</span>
              <span className="text-blue-500">{'Activity - '}</span>
              {' Lễ Hội Âm Nhạc Đường Phố 2021 -'}
            </span>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Audit;
