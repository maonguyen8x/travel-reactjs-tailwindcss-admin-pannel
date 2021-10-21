import { t } from 'app/i18n';

export const getFieldFeedback = () => [
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

export const getFeedbackChatRoomTypes = () => [
  {
    name: 'report.wait_processing',
    value: '0',
  },
  {
    name: 'report.processing',
    value: '1',
  },
  {
    name: 'report.completed',
    value: '2',
  },
];
