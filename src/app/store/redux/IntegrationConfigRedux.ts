import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

const { Types, Creators } = createActions<any, any>({
  createIntegrationConfigurationRequest: ['integrationconfig'],
  createIntegrationConfigurationSuccess: null,
  createIntegrationConfigurationFailure: null,
});

export const IntegrationConfigTypes = Types;
export default Creators;

export const INITIAL_STATE = Immutable({
  fetching: false,
  error: null,
  pages: 0,
});

const createIntegrationConfigurationRequest = (state: any) =>
  state.merge({ fetchingCreate: true });

const createIntegrationConfigurationSuccess = (state: any) =>
  state.merge({
    fetchingCreate: false,
    error: null,
  });

const createIntegrationConfigurationFailure = (state: any) =>
  state.merge({ fetchingCreate: false, error: true });

export const IntegrationConfigurationReducer = createReducer(INITIAL_STATE, {
  [Types.CREATE_INTEGRATION_CONFIGURATION_REQUEST]: createIntegrationConfigurationRequest,
  [Types.CREATE_INTEGRATION_CONFIGURATION_SUCCESS]: createIntegrationConfigurationSuccess,
  [Types.CREATE_INTEGRATION_CONFIGURATION_FAILURE]: createIntegrationConfigurationFailure,
});
