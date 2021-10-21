import { t } from 'app/i18n';
import React from 'react';
import { IProps } from './type';

const SubHeader = ({
  title = '',
  breadcrumb = '',
  subTitle = '',
  onSubmit,
  onSave,
  isLoading,
  onAdd,
  buttonAdd,
  blockButton = t('user.block'),
  unLockButton = t('user.un_block'),
  onBlock,
  isBlock,
  id,
  onViewSource,
  buttonViewSource = t('view.source_posts'),
  isViewSource,
  tabTitle,
  isCard,
  isTitle,
  titleMarginTop = 90,
  onDelete,
  deleteButton,
}: IProps) => {
  const breadcrumbs = [
    {
      tabTitle,
      title,
      breadcrumb,
      subTitle,
      id,
    },
  ];

  const hasAction =
    isViewSource ||
    onBlock ||
    onDelete ||
    onSubmit ||
    onSave ||
    breadcrumbs?.length > 1;

  return (
    <div
      className={`${
        hasAction &&
        'flex w-full flex-row justify-between bg-white px-6 py-6 items-center'
      } `}
    >
      {/* {!isCard && (
        <BoxTitle color={!isTitle}>
          {tabTitle && <TitleStyled>{tabTitle}</TitleStyled>}
        </BoxTitle>
      )} */}
      <div className="flex w-full flex-row justify-end items-center">
        {onAdd && buttonAdd && (
          <button
            className="bg-green-500 p-2 text-white uppercase shadow"
            onClick={onAdd}
          >
            <i className="fas fa-plus-circle mr-2" />
            {buttonAdd}
          </button>
        )}
        {isViewSource && (
          <button
            className="bg-green-500 text-white py-3 px-10"
            onClick={onViewSource}
          >
            {buttonViewSource}
          </button>
        )}
        {onBlock && (
          <button
            className={`${
              isBlock ? 'bg-green-500 ' : 'bg-red-400 '
            } text-white py-3 px-10`}
            onClick={onBlock}
          >
            {!!isBlock ? unLockButton : blockButton}
          </button>
        )}
        {onDelete && (
          <button
            className="bg-gray-400 text-white py-3 px-10"
            onClick={onDelete}
          >
            {deleteButton}
          </button>
        )}
      </div>
    </div>
  );
};

export default SubHeader;
