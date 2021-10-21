import React, { useEffect } from 'react';
import { Col, Row } from 'reactstrap';
import NormalInput from 'app/components/Form/NormalInput';
import { t } from 'app/i18n';
import { formatTime, formatMoney } from 'app/utils';

const FoodDetailService = (props: any) => {
  const { foodDetail, currencies } = props;

  useEffect(() => {
    const { id } = props.match.params;
    props.getFoodById(id);
  }, []);

  const codeCurrency = currencies[foodDetail?.currencyId - 1]?.code || 'VND';

  return (
    <Row>
      <NormalInput
        as="Col"
        md={6}
        className="mb-2"
        value={foodDetail?.name}
        label={t('APP.PAGE.FOOD.NAME')}
        disabled
      />
      <NormalInput
        as="Col"
        md={6}
        className="mb-2"
        value={formatMoney(codeCurrency, foodDetail?.price)}
        label={t('APP.PAGE.FOOD.PRICE')}
        disabled
      />
      <NormalInput
        as="Col"
        md={6}
        className="mb-2"
        value={formatTime(foodDetail?.createdAt)}
        label={t('APP.PAGE.FOOD.CREATE')}
        disabled
      />
    </Row>
  );
};

export default FoodDetailService;
