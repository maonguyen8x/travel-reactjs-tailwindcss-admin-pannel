import React, { useState } from 'react';
import { ListGroup, ListGroupItem } from 'reactstrap';
import { t } from 'app/i18n';
import {
  LableStyle,
  IconCheckStyled,
  ContentStyled,
  WrapList,
} from '../styled';

const ServiceLocations = ({ services }: any) => {
  const [state, setState] = useState({
    travler: false,
    cuisine: false,
    shopping: false,
    entertainment: false,
    medical: false,
    agencies: false,
  });
  return (
    <WrapList>
      <LableStyle>{t('APP.STAY.SERVICES_LOCATIONS')}</LableStyle>
      <ListGroup flush>
        <ListGroupItem
          onClick={() => setState({ ...state, travler: !state?.travler })}
        >
          <span>{t('APP.STAY.RULE.TRAVEL')}</span>
          <IconCheckStyled className="fas fa-check-circle" />
          {state.travler && services?.famousPlace && (
            <ContentStyled>{services?.famousPlace}</ContentStyled>
          )}
        </ListGroupItem>
        <ListGroupItem
          onClick={() => setState({ ...state, cuisine: !state?.cuisine })}
        >
          <span>{t('APP.STAY.RULE.CUISINE')}</span>
          <IconCheckStyled className="fas fa-check-circle" />
          {state.cuisine && services?.cuisine && (
            <ContentStyled>{services?.cuisine}</ContentStyled>
          )}
        </ListGroupItem>
        <ListGroupItem
          onClick={() => setState({ ...state, shopping: !state?.shopping })}
        >
          <span>{t('APP.STAY.RULE.SHOPPING')}</span>
          <IconCheckStyled className="fas fa-check-circle" />
          {state.shopping && services?.shopping && (
            <ContentStyled>{services?.shopping}</ContentStyled>
          )}
        </ListGroupItem>
        <ListGroupItem
          onClick={() =>
            setState({ ...state, entertainment: !state?.entertainment })
          }
        >
          <span>{t('APP.STAY.RULE.ENTERTAINMENT')}</span>
          <IconCheckStyled className="fas fa-check-circle" />
          {state.entertainment && services?.entertainment && (
            <ContentStyled>{services?.entertainment}</ContentStyled>
          )}
        </ListGroupItem>
        <ListGroupItem
          onClick={() => setState({ ...state, medical: !state?.medical })}
        >
          <span>{t('APP.STAY.RULE.MEDICAL')}</span>
          <IconCheckStyled className="fas fa-check-circle" />
          {state.medical && services?.medical && (
            <ContentStyled>{services?.medical}</ContentStyled>
          )}
        </ListGroupItem>
        <ListGroupItem
          onClick={() => setState({ ...state, agencies: !state?.agencies })}
        >
          <span>{t('APP.STAY.RULE.AGENCIES')}</span>
          <IconCheckStyled className="fas fa-check-circle" />
          {state.agencies && services?.departments && (
            <ContentStyled>{services?.departments}</ContentStyled>
          )}
        </ListGroupItem>
      </ListGroup>
    </WrapList>
  );
};
export default ServiceLocations;
