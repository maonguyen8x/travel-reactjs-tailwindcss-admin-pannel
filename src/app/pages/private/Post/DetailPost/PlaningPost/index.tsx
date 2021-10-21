import {
  TASKS_STATUS_TYPES,
  TRAVEL_TYPES,
  KEY_TRAVEL_TYPES,
} from 'app/constants';
import { t } from 'app/i18n';
import {
  checkPageTypes,
  groupTypePlan,
  countTasksTypePlan,
  compareArray,
} from 'app/utils';
import React, { memo } from 'react';

const PlaningPost = ({ data }: any) => {
  return (
    <div className="grid grid-cols-4 gap-10">
      {Object.keys(KEY_TRAVEL_TYPES)?.map((key: any, index: number) => {
        return (
          <>
            <div className="flex flex-col py-4 w-full" key={index}>
              <button
                className={`py-2 px-10 rounded-lg text-white text-2xl font-semibold bg-${checkPageTypes(
                  key
                )}`}
              >
                {`${t(`${key}`)}/${countTasksTypePlan(data, key)}`}
              </button>
              {groupTypePlan(data)[key]?.map((items: any, index: number) => {
                const typeImage = (type: any) => {
                  if (
                    type === TRAVEL_TYPES.WHERE ||
                    type === TRAVEL_TYPES.TOUR
                  ) {
                    return items?.location?.posts?.[0]?.mediaContents?.[0]
                      ?.urlTiny;
                  }
                  return items?.location?.page?.avatar?.urlTiny;
                };
                return (
                  <div className="flex items-start space-x-4 py-4" key={index}>
                    <i
                      className={`mt-4 text-${checkPageTypes(
                        items?.taskType
                      )} ${
                        items?.status === TASKS_STATUS_TYPES.COMPLETED
                          ? 'far fa-check-square'
                          : 'far fa-square'
                      }`}
                    />
                    <img
                      className={`flex flex-0 w-16 h-16 rounded-full ring-2 ring-${checkPageTypes(
                        items?.taskType
                      )}`}
                      src={typeImage(items?.taskType)}
                      alt={key}
                    />
                    <span className="flex flex-1">{items?.location?.name}</span>
                  </div>
                );
              })}
            </div>
          </>
        );
      })}
    </div>
  );
};

export default memo(PlaningPost);
// , (oldProps, newProps) => {
//   if (!compareArray(oldProps?.data, newProps?.data)) {
//     return false;
//   }
//   return true;
// });
