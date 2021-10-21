/* eslint-disable react/jsx-props-no-spreading */
import React, { useEffect, useState } from 'react';
import { t } from 'app/i18n';
import { Row } from 'reactstrap';
import { CustomInput } from 'app/utils';
import TextEditor from 'app/components/Editor';
import { dataOrder } from './DetailOrderTour.data';
import { IProps } from './DetailOrderTour.type';
import { getBookingStayById } from './service';

const OrderTourDetail = ({ match }: IProps) => {
  const [data, setData]: any = useState([]);
  const id = match?.params?.id;

  useEffect(() => {
    (async () => {
      const bookingDetail = await getBookingStayById(id);
      setData(bookingDetail);
    })();
  }, []);

  return (
    <Row>
      {dataOrder(data).map((item, index) => (
        <CustomInput {...item} key={index} />
      ))}

      {data?.tourReservation?.note && (
        <TextEditor
          md={12}
          as="Col"
          value={data?.tourReservation?.note}
          label={t('APP.ORDER_TOUR.NOTE')}
          readOnly
        />
      )}
    </Row>
  );
};

export default OrderTourDetail;
