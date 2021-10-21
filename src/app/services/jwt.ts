/* eslint-disable import/prefer-default-export */
import axios from 'axios';
import { BASE_API, TRAVEL_TYPES } from 'app/constants';
import { formatHeaders } from 'app/utils';
import { pathOr } from 'ramda';
import SweetAlert from 'app/components/SweetAlert';

export class Service {
  static async getPage(setData: any, token: string) {
    const filter = {
      filter: {
        where: {
          type: TRAVEL_TYPES.FOOD,
        },
      },
    };

    const headers = formatHeaders(token);
    axios
      .get(`${BASE_API}/pages`, { headers, params: filter })
      .then((response) => setData(response.data.data));
  }

  static async getUser(setData: any, token: string) {
    const filterUsers = {
      filterUsers: {
        where: {
          userTypeAccess: { nin: [TRAVEL_TYPES.PAGE] },
        },
      },
    };

    const headers = formatHeaders(token);

    axios
      .get(`${BASE_API}/admin/user/list`, { headers, params: filterUsers })
      .then((response) => setData(response.data.data));
  }

  static pageAccept(id: number, token: string) {
    const headers = formatHeaders(token);

    axios
      .post(`${BASE_API}pages/accept-verify/${id}`, null, {
        headers,
      })
      .catch((e: any) => {
        const message = pathOr(
          'error',
          ['response', 'data', 'error', 'message'],
          e
        );
        SweetAlert.error(message);
      });
  }

  static pageReject(id: number, token: string, reason: string) {
    const headers = formatHeaders(token);

    axios
      .post(
        `${BASE_API}pages/reject-verify/${id}`,
        {
          reason,
        },
        { headers }
      )
      .catch((e: any) => {
        const message = pathOr(
          'error',
          ['response', 'data', 'error', 'message'],
          e
        );
        SweetAlert.error(message);
      });
  }
}
