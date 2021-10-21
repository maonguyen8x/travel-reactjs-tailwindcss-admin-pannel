import { t } from 'app/i18n';
import React, { useState, memo } from 'react';
import { useDispatch } from 'react-redux';
import TableTypes from 'app/store/redux/TableRedux';
import { compareArray } from '../../utils';

interface ICustomField {
  allColumns: any;
  name?: string;
}

const CustomField = ({ allColumns = [], name = '' }: ICustomField) => {
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);

  const handleField = (id: any) => {
    allColumns.map((item: any) => {
      const newItem = item;
      newItem.id === id
        ? (newItem.show = !newItem.isVisible)
        : (newItem.show = newItem.isVisible);
      return newItem;
    });
    dispatch(TableTypes.updateCustomFields(name, allColumns));
  };

  if (!allColumns || allColumns.length === 0) return null;

  return (
    <div className="flex items-center justify-center relative">
      <button
        className="bg-button-default py-3 px-10 text-white text-xl shadow"
        onClick={() => setShowDropdown(!showDropdown)}
      >
        {t('search.custom_field')}
      </button>

      <ul
        className={`absolute top-20 right-0 z-40 bg-default w-80 max-h-120 overflow-y-scroll transition-all duration-150 ease-out ${
          showDropdown ? 'block' : 'hidden'
        }	`}
      >
        {allColumns.map((column: any, index: string) => (
          <li
            className={
              'flex flex-wrap items-center justify-start text-white p-4 hover:bg-button-default text-xl'
            }
            key={index}
          >
            <div key={column.id}>
              <label className="flex flex-row items-center cursor-pointer">
                <input
                  type="checkbox"
                  onClick={() => handleField(column.id)}
                  {...column.getToggleHiddenProps()}
                  className="mr-3 flex"
                />
                {column.Header}
              </label>
            </div>
          </li>
        ))}
      </ul>
      {showDropdown && (
        <div
          onClick={() => setShowDropdown(false)}
          className="fixed top-0 right-0 left-0 bottom-0 bg-transparent z-30"
        />
      )}
    </div>
  );
};

export default CustomField;
