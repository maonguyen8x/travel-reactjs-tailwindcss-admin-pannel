import Images from 'app/assets/images';
import { checkRoles, getIconRoles } from 'app/utils';
import React from 'react';
import PopoverItem from 'app/components/Popover';
import { IProps } from './type';

const Index = (props: IProps) => {
  const {
    onEdit = false,
    onDelete = false,
    onBlock,
    isDelete = true,
    isLock = true,
    roles,
    item,
    isPublish,
    onPublish,
    onBlockIP,
    isChangeRole,
  } = props;
  const id = item?.original?.id;
  const isBlock = !!item?.original?.blockedAt;

  const onLock = (e: any) => {
    checkRoles(roles) && onBlock && onBlock(e, item?.original?.blockedAt, id);
  };

  const onLockIP = (e: any) => {
    checkRoles(roles) &&
      onBlockIP &&
      onBlockIP(e, item?.original?.blockedAt, id, {
        offset: item?.page,
        limit: item?.pageSize,
      });
  };

  const onPublic = (e: any) => {
    // No Handle
  };

  return (
    <div className="flex flex-1 items-center justify-center">
      {checkRoles(roles) && !item?.original?.blockedAt && isChangeRole && (
        <PopoverItem
          name={
            <img
              className="w-8 h-8"
              src={getIconRoles(item?.original?.roles)}
              alt={'icon-shield'}
            />
          }
          popoverKey={id}
          changeRoles={isLock}
        />
      )}
      {!!onEdit && (
        <div className="px-4 cursor-pointer">
          <img onClick={onEdit} src={Images.onEdit.default} alt="icon-edit" />
        </div>
      )}

      {!!onBlock && isLock && (
        <div className="px-4 cursor-pointer">
          <img
            onClick={onLock}
            src={isBlock ? Images.onLock.default : Images.onUnLock.default}
            alt="icon-lock"
          />
        </div>
      )}
      {!!onPublish && (
        <div className="px-4 cursor-pointer">
          <img
            onClick={onPublic}
            src={isPublish ? Images.publish.default : Images.unPublish.default}
            alt="icon-lock"
          />
        </div>
      )}
      {!!onBlockIP && (
        <div className="px-4 cursor-pointer">
          <img
            onClick={onLockIP}
            src={isBlock ? Images.onBlockIP.default : Images.onBlockIP.default}
            alt="icon-lock"
          />
        </div>
      )}
      {!!onDelete && isDelete && (
        <div className="px-4 cursor-pointer">
          <img onClick={onDelete} src={Images.onDel.default} alt="icon-del" />
        </div>
      )}
    </div>
  );
};
export default Index;
