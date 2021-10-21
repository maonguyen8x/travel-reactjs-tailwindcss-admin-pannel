import { ALL_ROLES } from 'app/constants';
import API from 'app/services/Api';
import { t } from 'app/i18n';
import { parseRoleTypes, checkDataApi } from 'app/utils';
import SweetAlert from 'app/components/SweetAlert';

const getRolesScopes = async () => {
  const getRoles = await API.getRolesScopes();
  return checkDataApi(getRoles);
};

const getRolesScopesById = async (id: string) => {
  const getRolesById = await API.getRolesScopesById(id);
  return checkDataApi(getRolesById);
};

const changeRolesScopes = async (body: any) => {
  const customData = {
    userId: Number(body?.id),
    newRole: parseRoleTypes(body?.roles),
    newScopes:
      !!body && body?.roles !== t('roles.normal_user')
        ? ALL_ROLES
        : body?.scopes,
  };
  const changeRoles = await API.changeRoles(customData).then((result: any) => {
    if (checkDataApi(result)) {
      SweetAlert.toastSuccess(t('sweet.user.changed.role.successfully'));
    } else {
      SweetAlert.error(result?.data?.message);
    }
  });
  return changeRoles;
};

export { getRolesScopes, changeRolesScopes, getRolesScopesById };
