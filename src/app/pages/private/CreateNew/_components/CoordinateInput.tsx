import React, { Component } from 'react';
import { toNumber } from '../../../../utils';
import { t } from '../../../../i18n';
import { getGeocodeCoordinates } from '../../../../components/GoogleMap/utils';
import NormalInput from '../../../../components/Form/NormalInput';

let timeoutId: any = 0;

class CoordinateInput extends Component<any, any> {
  constructor(props: any) {
    super(props);
    this.state = {
      lat: props.lat,
      lng: props.lng,
    };
  }

  shouldComponentUpdate(
    nextProps: Readonly<any>,
    nextState: Readonly<any>
  ): boolean {
    const { lat, lng } = this.state;

    if (lat !== nextState.lat || lng !== nextState.lng) {
      return true;
    }
    if (lat !== nextProps.lat || lng !== nextProps.lng) {
      this.setState({
        lat: nextProps.lat,
        lng: nextProps.lng,
      });
    }

    return false;
  }

  getSnapshotBeforeUpdate(prevProps: any, prevState: any) {
    const { onChangeAddress } = this.props;

    const { lat, lng } = this.state;

    if (lat !== prevState.lat || lng !== prevState.lng) {
      if (lat && lng) {
        const coordinates = {
          lat: toNumber(lat),
          lng: toNumber(lng),
        };

        if (timeoutId) {
          clearTimeout(timeoutId);
        }

        timeoutId = setTimeout(async () => {
          const result = await getGeocodeCoordinates(coordinates);

          const newAddress = {
            country: result?.country,
            city: result?.city,
            district: result?.district,
            ward: result?.ward,
            street: result?.street,
            number: result?.number,
            address: result?.formatedAddress,
            lat,
            lng,
          };

          onChangeAddress(newAddress);
        }, 1000);
      }
    }
  }

  render() {
    const { lat, lng } = this.state;
    return (
      <div className="mt-3 mb-2">
        <div className="grid grid-cols-2 gap-10">
          <div className="">
            <NormalInput
              value={lat}
              onChange={(e) => this.setState({ lat: e.target.value })}
              label={t('location.coordinate')}
            />
          </div>
          <div>
            <NormalInput
              value={lng}
              onChange={(e) => this.setState({ lng: e.target.value })}
              label="&emsp;"
            />
          </div>
        </div>
      </div>
    );
  }
}

export default CoordinateInput;
