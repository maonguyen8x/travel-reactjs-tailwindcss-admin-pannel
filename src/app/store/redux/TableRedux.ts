import { createReducer, createActions } from 'reduxsauce';
import Immutable from 'seamless-immutable';

import {
  getFieldChangeLocation,
  getFieldsAttractions,
  getFieldsLocation,
  getFieldDuplicateLocation,
  getFiledUsers,
  getFieldFood,
  getFieldTour,
  getFieldActivity,
  getFieldPost,
  getFieldReport,
  getFieldFeedback,
  getFieldMessenger,
} from 'app/utils';
/* ------------- Types and Action Creators ------------- */

const { Types, Creators } = createActions<any, any>({
  updateCustomFields: ['name', 'newCustomFields'],
});

export const TableTypes = Types;
export default Creators;

/* ------------- Initial State ------------- */

export const INITIAL_STATE = Immutable({
  fieldsOfTable: {
    changeLocation: getFieldChangeLocation(),
    attractions: getFieldsAttractions(),
    location: getFieldsLocation(),
    duplicateLocation: getFieldDuplicateLocation(),
    listUser: getFiledUsers(),
    listUserBlock: getFiledUsers(),
    listFood: getFieldFood(),
    listTour: getFieldTour(),
    listActivity: getFieldActivity(),
    listPost: getFieldPost(),
    listReport: getFieldReport(),
    listFeedback: getFieldFeedback(),
    listMessenger: getFieldMessenger(),
  },
});
/* ------------- Reducers ------------- */

const updateCustomFields = (state: any, { name, newCustomFields }: any) =>
  state.merge({
    fieldsOfTable: { ...state.fieldsOfTable, [name]: newCustomFields },
  });

/* ------------- Hookup Reducers To Types ------------- */
export const TableReducer = createReducer(INITIAL_STATE, {
  [Types.UPDATE_CUSTOM_FIELDS]: updateCustomFields,
});
