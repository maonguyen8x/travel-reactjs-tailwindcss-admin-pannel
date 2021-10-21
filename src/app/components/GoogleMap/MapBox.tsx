import React, { memo, useEffect } from 'react';
import Mapboxgl from 'mapbox-gl';
import { MAP_BOX } from 'app/constants';

const MapBox = ({ onChangeCoordinates, center }: any) => {
  Mapboxgl.accessToken = MAP_BOX.TOKEN;
  let map: any = null;
  const marker = new Mapboxgl.Marker({
    draggable: true,
  });
  useEffect(() => {
    map = new Mapboxgl.Map({
      container: 'my-map',
      style: 'mapbox://styles/mapbox/streets-v11',
      center: [center.lng || 0, center.lat || 0],
      zoom: 12,
    });

    if (map) {
      map.addControl(
        new Mapboxgl.GeolocateControl({
          positionOptions: {
            enableHighAccuracy: true,
          },
          trackUserLocation: true,
        })
      );

      marker
        .setLngLat([center.lng || 0, center.lat || 0])
        .addTo(map)
        .on('dragend', () => {
          const lngLat = marker.getLngLat();
          onChangeCoordinates({
            lat: lngLat.lat,
            lng: lngLat.lng,
          });
        });
    }
  }, [center]);

  return <div id="my-map" className="h-50vh" />;
};

export default memo(MapBox, (props, nextProps) => {
  if (
    props.center.lat !== nextProps.center.lat ||
    props.center.lng !== nextProps.center.lng
  )
    return false;

  return true;
});
