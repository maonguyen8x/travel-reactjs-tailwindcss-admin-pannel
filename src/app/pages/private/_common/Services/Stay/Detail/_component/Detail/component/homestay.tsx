import React from 'react';
import { Col, Breadcrumb, BreadcrumbItem } from 'reactstrap';
import { t } from 'app/i18n';
import { LableStyle } from '../styled';

interface IProps {
  numberOfBedroom: number;
  numberOfBed: number;
  numberOfStandardGuest: number;
  acreage: number;
  numberOfSingleBed: number;
  numberOfDoubleBed: number;
  numberOfLargeDoubleBed: number;
  numberOfLargeBed: number;
  numberOfSuperLargeBed: number;
  numberOfMattress: number;
  numberOfSofa: number;
  numberOfBunk: number;
  numberOfBathroom: number;
  numberOfPrivateBathroom: number;
  numberOfSharedBathroom: number;
  numberOfKitchen: number;
  numberOfPrivateKitchen: number;
  numberOfSharedKitchen: number;
}

const HomeStay = ({
  acreage,
  numberOfBedroom,
  numberOfBed,
  numberOfSingleBed,
  numberOfDoubleBed,
  numberOfLargeDoubleBed,
  numberOfLargeBed,
  numberOfSuperLargeBed,
  numberOfMattress,
  numberOfSofa,
  numberOfBunk,
  numberOfBathroom,
  numberOfPrivateBathroom,
  numberOfSharedBathroom,
  numberOfKitchen,
  numberOfPrivateKitchen,
  numberOfSharedKitchen,
}: IProps) => (
  <Col md={12} className="mb-2">
    <LableStyle>{t('APP.STAY.HOME_STAY')}</LableStyle>
    <Breadcrumb>
      <BreadcrumbItem>
        {acreage}
        &#160;
        {t('APP.STAY.ACREAGE(M2)')}
      </BreadcrumbItem>
      <BreadcrumbItem>
        {numberOfBedroom}
        &#160;
        {t('APP.STAY.BEDROOM')}
      </BreadcrumbItem>
      <BreadcrumbItem>
        {numberOfBed}
        &#160;
        {t('APP.STAY.BED')}
      </BreadcrumbItem>
      {numberOfSingleBed > 0 && (
        <BreadcrumbItem>
          {numberOfSingleBed}
          &#160;
          {t('APP.STAY.SIMPLE_BED(1M2)')}
        </BreadcrumbItem>
      )}

      {numberOfDoubleBed > 0 && (
        <BreadcrumbItem>
          {numberOfDoubleBed}
          &#160;
          {t('APP.STAY.SIMPLE_BED(1M2)')}
        </BreadcrumbItem>
      )}

      {numberOfLargeDoubleBed > 0 && (
        <BreadcrumbItem>
          {numberOfLargeDoubleBed}
          &#160;
          {t('APP.STAY.LARGE_DOUBLE_BED(1M6)')}
        </BreadcrumbItem>
      )}
      {numberOfLargeBed > 0 && (
        <BreadcrumbItem>
          {numberOfLargeBed}
          &#160;
          {t('APP.STAY.LARGE_BED(1M8)')}
        </BreadcrumbItem>
      )}
      {numberOfSuperLargeBed > 0 && (
        <BreadcrumbItem>
          {numberOfSuperLargeBed}
          &#160;
          {t('APP.STAY.SUPER_LARGE_BED(2M)')}
        </BreadcrumbItem>
      )}
      {numberOfMattress > 0 && (
        <BreadcrumbItem>
          {numberOfMattress}
          &#160;
          {t('APP.STAY.CUSHION_JAPAN')}
        </BreadcrumbItem>
      )}
      {numberOfSofa > 0 && (
        <BreadcrumbItem>
          {numberOfSofa}
          &#160;
          {t('APP.STAY.SOFA')}
        </BreadcrumbItem>
      )}
      {numberOfBunk > 0 && (
        <BreadcrumbItem>
          {numberOfBunk}
          &#160;
          {t('APP.STAY.BUNK')}
        </BreadcrumbItem>
      )}
      <BreadcrumbItem>
        {numberOfBathroom}
        &#160;
        {t('APP.STAY.BATHROOM')}
      </BreadcrumbItem>
      {numberOfPrivateBathroom > 0 && (
        <BreadcrumbItem>
          {numberOfPrivateBathroom}
          &#160;
          {t('APP.STAY.PRIVATE_BATHROOM')}
        </BreadcrumbItem>
      )}
      {numberOfSharedBathroom > 0 && (
        <BreadcrumbItem>
          {numberOfSharedBathroom}
          &#160;
          {t('APP.STAY.SHARE_BATHROOM')}
        </BreadcrumbItem>
      )}
      <BreadcrumbItem>
        {numberOfKitchen}
        &#160;
        {t('APP.STAY.KITCHEN')}
      </BreadcrumbItem>
      {numberOfPrivateKitchen > 0 && (
        <BreadcrumbItem>
          {numberOfPrivateKitchen}
          &#160;
          {t('APP.STAY.PRIVATE_KITCHEN')}
        </BreadcrumbItem>
      )}
      {numberOfSharedKitchen > 0 && (
        <BreadcrumbItem>
          {numberOfSharedKitchen}
          &#160;
          {t('APP.STAY.SHARE_KITCHEN')}
        </BreadcrumbItem>
      )}
    </Breadcrumb>
  </Col>
);
export default HomeStay;
