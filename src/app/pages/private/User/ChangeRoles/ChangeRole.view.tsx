import React, { useEffect, useState } from 'react';
import { getRolesTypes, getScopeTypes, getRolesByIdTypes } from 'app/utils';
import { t } from 'app/i18n';
import CheckBox from 'app/components/Checkbox';
import { CONVERT_ROLES_TYPE } from 'app/constants';
import {
  getRolesScopes,
  changeRolesScopes,
  getRolesScopesById,
} from './service';
import SelectInput from './SelectInput';
import { IProps } from './ChangeRole.type';

const ChangeRoles = ({ getUserList, id, filter, toggle }: IProps) => {
  const [state, setState]: any = useState({
    data: [],
    roles: '',
    scopes: [],
    scopesById: [],
  });

  const { data, roles, scopes, scopesById } = state;

  useEffect(() => {
    (async () => {
      const [result, scopesDetail]: any = await Promise.all([
        getRolesScopes(),
        getRolesScopesById(id),
      ]);
      setState({
        ...state,
        data: result,
        scopesById: scopesDetail,
      });
    })();
  }, [id]);

  const onChangeRoles = (value: string) => {
    setState({
      ...state,
      roles: value,
    });
  };

  const onChangeScopes = (e: any) => {
    if (scopes?.includes(e?.target?.value)) {
      const index = scopes.indexOf(e?.target?.value);
      if (index > -1) {
        scopes.splice(index, 1);
      }
    } else {
      scopes?.push(e?.target?.value);
    }
    setState({
      ...state,
    });
  };

  const onSubmit = (e: any) => {
    changeRolesScopes({
      id,
      roles: roles || getRolesByIdTypes(scopesById?.roles),
      scopes,
    }).then(() => getUserList(filter), toggle());
  };

  const rolesData = Object.keys(data?.roles || {})?.map((key: any) => ({
    name: getRolesTypes(data?.roles[key]),
  }));

  const scopesData = Object.keys(data?.scopes || {})?.map((key: any) => ({
    name: getScopeTypes(data?.scopes[key]),
    value: key,
  }));

  const customScopesId = scopesById?.scopes?.split(',');

  return (
    <div className="px-2">
      <div className="grid grid-cols-3 gap-3 py-3">
        <div className="col-span-2">
          <SelectInput
            data={rolesData}
            onChange={onChangeRoles}
            value={roles || getRolesByIdTypes(scopesById?.roles)}
            label={t('roles.position')}
          />
        </div>
        <div className="col-span-1 flex justify-center items-end">
          <button
            onClick={onSubmit}
            className="bg-green-400 px-8 py-1  rounded "
          >
            <span className="text-white">{t('roles.apply')}</span>
          </button>
        </div>
      </div>
      <div>
        <label className="font-medium text-xl">
          {t('roles.content_management')}
        </label>
      </div>
      <div className="grid grid-cols-2">
        {scopesData?.map((items: any, index: number) => (
          <div key={index}>
            <CheckBox
              onChange={onChangeScopes}
              label={items?.name}
              value={items?.value}
              checked={
                roles
                  ? roles === CONVERT_ROLES_TYPE.ADMIN ||
                    roles === CONVERT_ROLES_TYPE.MODERATOR
                  : customScopesId?.includes(items?.value)
              }
            />
          </div>
        ))}
      </div>
    </div>
  );
};

export default ChangeRoles;
