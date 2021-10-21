import { t } from 'app/i18n';
import { memo } from 'react';
import { IProps } from './type';

const SelectTypes = ({
  onChangeText,
  value,
  data = [],
  errMessage,
  label,
}: IProps) => {
  return (
    <>
      {label && (
        <label
          htmlFor="accessType"
          className="text-xl font-medium text-gray-700"
        >
          {label}
        </label>
      )}
      <select
        id="accessType"
        name="accessType"
        className="w-full h-10 px-3 border bg-gray-100"
        onChange={(e) => {
          onChangeText(e.target.value);
        }}
        value={value}
      >
        {data?.map((options: any, index: number) => (
          <option key={index} value={options?.value}>
            {t(options.name)}
          </option>
        ))}
      </select>
      <p className="text-md text-red-500 mt-4">{errMessage}</p>
    </>
  );
};

export default memo(SelectTypes);
