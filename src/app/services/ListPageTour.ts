/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { BASE_API, TRAVEL_TYPES } from 'app/constants';
import { formatHeaders, formatToken } from 'app/utils';

export class listPageTour {
  static async getListPageTour(token: string) {
    try {
      const filter = {
        filter: {
          where: {
            type: TRAVEL_TYPES.TOUR
          }
        }
      };

      const headers = formatHeaders(token);

      const response: any = await axios.get(`${BASE_API}pages`, {
        headers,
        params: filter
      });

      return response.data;
    } catch (e) {
      return e.message;
    }
  }

  static async getListFacilityCategory(token: string) {
    try {
      const headers = formatHeaders(token);

      const response: any = await axios.get(`${BASE_API}facility-categories`, {
        headers
      });
      return response.data;
    } catch (e) {
      return e.message;
    }
  }

  static async getListAmenitiesCategory(token: string) {
    try {
      const headers = formatHeaders(token);

      const response: any = await axios.get(`${BASE_API}amenity-categories`, {
        headers
      });
      return response.data;
    } catch (e) {
      return e.message;
    }
  }
}
