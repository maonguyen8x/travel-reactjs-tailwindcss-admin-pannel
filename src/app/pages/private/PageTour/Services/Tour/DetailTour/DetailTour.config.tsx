import { t } from 'app/i18n';
import { checkRoles } from 'app/utils';

const configContainer = (props: any) => ({
  title: t('tour.list_title'),
  tabTitle: t('tour.title'),
  breadcrumb: `#${props?.tourDetail?.id} ${props?.tourDetail?.name}`,
  onBlock: !props?.tourDetail?.blockMessage
    ? props?.LOCK_FOOD
    : props?.UN_LOCK_FOOD,
  isBlock: props?.tourDetail?.blockMessage,
  blockButton: t('tour.block'),
  unLockButton: t('tour.un_block'),
  ...(checkRoles(props?.roles) && {
    onDelete: props?.ON_DEL,
    deleteButton: t('tour.delete'),
  }),
});

export { configContainer };
