import { onDeteleTour } from 'app/utils';

export default {
  LOCK_FOOD: (props: any) => () => {},

  UN_LOCK_FOOD: (props: any) => () => {},

  ON_DEL: (props: any) => () => {
    onDeteleTour(props?.foodPageDetail?.id, () => props?.history?.goBack());
  },
};
