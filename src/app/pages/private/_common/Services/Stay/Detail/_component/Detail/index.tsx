import React from 'react';
import { Row } from 'reactstrap';
import HomeStay from './component/homestay';
import Convenient from './component/convenient';
import RoomRates from './component/roomrates';

const Detail = ({ data }: any) => (
  <Row>
    <HomeStay
      acreage={data?.acreage}
      numberOfBedroom={data?.numberOfBedroom}
      numberOfBed={data?.numberOfBed}
      numberOfSingleBed={data?.numberOfSingleBed}
      numberOfDoubleBed={data?.numberOfDoubleBed}
      numberOfLargeDoubleBed={data?.numberOfLargeDoubleBed}
      numberOfLargeBed={data?.numberOfLargeBed}
      numberOfSuperLargeBed={data?.numberOfSuperLargeBed}
      numberOfMattress={data?.numberOfMattress}
      numberOfSofa={data?.numberOfSofa}
      numberOfBunk={data?.numberOfBunk}
      numberOfBathroom={data?.numberOfBathroom}
      numberOfPrivateBathroom={data?.numberOfPrivateBathroom}
      numberOfSharedBathroom={data?.numberOfSharedBathroom}
      numberOfKitchen={data?.numberOfKitchen}
      numberOfPrivateKitchen={data?.numberOfPrivateKitchen}
      numberOfSharedKitchen={data?.numberOfSharedKitchen}
      numberOfStandardGuest={data?.numberOfStandardGuest}
    />
    <Convenient
      amenities={data?.amenities}
      facilities={data?.facilities}
      values={data?.values}
    />
    <RoomRates
      price={data?.price}
      priceWeekend={data?.priceWeekend}
      feeIncreaseAdult={data?.feeIncreaseAdult}
      feeIncreaseChild={data?.feeIncreaseChild}
      feeIncreaseInfant={data?.feeIncreaseInfant}
      feeCleaning={data?.feeCleaning}
      discountMonthlyRental={data?.discountMonthlyRental}
      discountYearlyRental={data?.discountYearlyRental}
      discountWeeklyRental={data?.discountWeeklyRental}
    />
  </Row>
);
export default Detail;
