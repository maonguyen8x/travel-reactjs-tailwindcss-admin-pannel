/* eslint-disable consistent-return */
import { ROUTERS, FILTER } from 'app/constants';
import SweetAlert from 'app/components/SweetAlert';
import { t } from 'app/i18n';
import Api from 'app/services/Api';
import { checkStatusApi } from 'app/utils';

export default {
  ON_ADD_AMENITY: ({ history, match }: any) => () => {
    history.push(ROUTERS.ADD_AMENITY.replace(':id', match.params.id));
  },
  GET_AMENITIES: () => async (amenityCategoryId: number) => {
    const filter = {
      filter: {
        order: FILTER.NEWEST,
        where: {
          amenityCategoryId,
        },
      },
    };
    const res = await Api.getAmenities(filter);
    if (checkStatusApi(res)) {
      return res.data;
    }
    return [];
  },

  ON_EDIT: (props: any) => (amenityId: string) => {
    props.history.push(ROUTERS.EDIT_AMENITY.replace(':id', amenityId));
  },

  ON_DELETE: (props: any) => (id: number, amenityCategoryId: number) => {
    SweetAlert.confirm(t('APP.TABLE.DELETE'), t('APP.TABLE.ANWSER'), () => {
      Api.deleteAmenities(id).then(async (result: any) => {
        if (result.ok) {
          const filter = {
            filter: {
              where: {
                amenityCategoryId,
              },
            },
          };
          const res = await Api.getAmenities(filter);
          if (checkStatusApi(res)) {
            props?.setData(res?.data);
          }
          return [];
        }
      });
    });
  },
};
