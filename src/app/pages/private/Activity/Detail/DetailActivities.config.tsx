import { t } from 'app/i18n';

const configContainer = (props: any) => {
  const { participantCount } = props?.activitiesDetail;
  return {
    title: t('activity.title'),
    breadcrumb: t('add.detail'),
    id: props?.match?.params?.id,
    ...(participantCount > 0 && {
      onListJoin: props?.ON_LIST_JOIN,
      listJoin: t('activity.list_join'),
    }),
  };
};

export { configContainer };
