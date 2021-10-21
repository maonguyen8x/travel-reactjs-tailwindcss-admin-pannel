import { t } from 'app/i18n';
import { ACCESS_TYPES } from 'app/constants';

const AccessTypeSelect = ({ onChangeText, value, errMessage }: any) => {
  return (
    <div className="mb-8">
      <label htmlFor="accessType" className="text-xl font-medium text-gray-700">
        {t('post.mode')}
      </label>
      <select
        id="accessType"
        name="accessType"
        className="w-full h-16 px-3 border bg-gray-100"
        onChange={(e) => {
          onChangeText(e.target.value);
        }}
        value={value}
      >
        <option value={ACCESS_TYPES.PUBLIC}>{t('post.public')}</option>
        <option value={ACCESS_TYPES.FOLLOW}>{t('post.friend')}</option>
        <option value={ACCESS_TYPES.PRIVATE}>{t('post.private')}</option>
      </select>
      <p className="text-xl text-red-500 mt-4">{errMessage}</p>
    </div>
  );
};

export default AccessTypeSelect;
