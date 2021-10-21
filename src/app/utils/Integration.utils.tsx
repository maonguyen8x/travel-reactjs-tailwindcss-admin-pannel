import { t } from 'app/i18n';

export const getFieldIntegration = () => [
  {
    id: 'content',
    name: t('feedback.content'),
    show: true,
  },
  {
    id: 'name',
    name: t('feedback.name'),
    show: true,
  },
  {
    id: 'createdAt',
    name: t('feedback.created'),
    show: true,
  },
  {
    id: 'status',
    name: t('feedback.media'),
    show: true,
  },
];
