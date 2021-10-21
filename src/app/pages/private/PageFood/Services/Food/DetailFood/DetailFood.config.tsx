import { t } from 'app/i18n';
import { checkRoles } from 'app/utils';

const configContainer = (props: any) => ({
  title: t('food.title'),
  tabTitle: t('tabs.title.food'),
  breadcrumb: `#${props?.foodPageDetail?.id} ${props?.foodPageDetail?.name}`,
  onBlock: !props?.foodPageDetail?.blockMessage
    ? props?.LOCK_FOOD
    : props?.UN_LOCK_FOOD,
  isBlock: props?.foodPageDetail?.blockMessage,
  blockButton: t('food.block'),
  unLockButton: t('food.un_block'),
  ...(checkRoles(props?.roles) && {
    onDelete: props?.ON_DEL,
    deleteButton: t('food.delete'),
  }),
});

export { configContainer };
