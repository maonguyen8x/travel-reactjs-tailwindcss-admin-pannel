import { ROUTERS } from 'app/constants';
import SweetAlert from 'app/components/SweetAlert';
import { t } from 'app/i18n';

export default {
  ON_ADD_STAY: ({ history }: any) => () => {
    history.push(ROUTERS.LIST_STAY);
  },
  ON_SEARCH: (props: any) => (newFilter: any) => {
    const filter = props?.filter;
    const customFilter = {
      ...filter,
      ...newFilter,
    };
    props?.getListStay(customFilter);
  },
  ON_LIST: ({ history }: any) => () => {
    history.push(ROUTERS.LIST_CONVENIENT);
  },

  ON_DETAIL_USER: ({ history }: any) => (userId: string) => {
    history.push(ROUTERS.USER_DETAIL.replace(':id', userId));
  },

  ON_DELETE: () => () => {
    SweetAlert.confirm(t('APP.TABLE.DELETE'), t('APP.TABLE.ANWSER'), () => {
      ('');
    });
  },
};
