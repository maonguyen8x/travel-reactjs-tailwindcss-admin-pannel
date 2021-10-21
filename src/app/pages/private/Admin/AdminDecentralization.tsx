import React from 'react';
import { t } from 'app/i18n';
import { DeSubTitle } from 'app/components/layout/styled';
import { BoxTable, CircelView, BoxTitle } from './styled';
import { DECENTRALIZATION } from './Admin.data';

export default function AdminDecentralization() {
  return (
    <BoxTable>
      <BoxTitle>
        <DeSubTitle>{'Admin'}</DeSubTitle> <i className="fas fa-angle-down" />
      </BoxTitle>
      <table className="table">
        <thead>
          <tr>
            <th scope="col">{t('admin.category')}</th>
            <th scope="col">
              <i className="fas fa-eye" />
              {t('admin.view_detail')}
            </th>
            <th scope="col">
              <i className="fas fa-pen" />
              {t('admin.edit')}
            </th>
            <th scope="col">
              <i className="fas fa-trash-alt" />
              {t('admin.delete')}
            </th>
            <th scope="col">
              <i className="fas fa-plus" />
              {t('admin.create')}
            </th>
            <th scope="col">
              <i className="fas fa-unlock-alt" />
              {t('admin.un_block')}
            </th>
            <th scope="col">
              <i className="fas fa-lock" />
              {t('admin.block')}
            </th>
          </tr>
        </thead>
        <tbody>
          {DECENTRALIZATION.map((items: any, index: number) => (
            <tr key={index}>
              <th scope="row">
                <i className={`${items?.icon} category`} />
                {items?.category}
              </th>
              <td>
                <CircelView active={items?.detail} />
              </td>
              <td>
                <CircelView active={items?.edit} />
              </td>
              <td>
                <CircelView active={items?.delete} />
              </td>
              <td>
                <CircelView active={items?.create} />
              </td>
              <td>
                <CircelView active={items?.unBlock} />
              </td>
              <td>
                <CircelView active={items?.block} />
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </BoxTable>
  );
}
