import React, { useEffect, useState } from 'react';
import { InjectedFormikProps } from 'formik';
import { t } from 'app/i18n';
import ButtonForm from 'app/components/ButtonForm';
import { IProps, IValues } from './IntegrationConfig.type';

export type EnhancedProps = InjectedFormikProps<IProps, IValues>;

const FormIntegrationConfiguration = (props: EnhancedProps) => {
  const { values } = props;

  const [state, setState] = useState({
    searchTxt: '',
    resultSearching: [],
  });

  useEffect(() => {}, []);

  return (
    <>
      <div>
        <div className="">
          <div className="text-gray-700 md:flex md:items-center w-full">
            <div className="text-2xl">{t('admin.integration.grafana')}</div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="mt-2">
              <div className="md:flex md:items-center mt-3">
                <div className="pl-6 pr-3">
                  <label>{t('admin.integration.url')}</label>
                </div>
                <div className="w-full">
                  <input
                    className="flex flex-1 h-16 px-3 py-2 w-full placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-10">
              <div className="col-span-2 grid grid-cols-2 gap-10">
                <div className="md:flex md:items-center mt-3">
                  <div className="pl-6 pr-3">
                    <label>{t('admin.integration.username')}</label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="flex flex-1 h-16 px-3 py-2 w-80 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      type="text"
                    />
                  </div>
                  <div className="pl-6 pr-3">
                    <label>{t('admin.integration.password')}</label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="flex flex-1 h-16 px-3 py-2 w-80 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-gray-700 md:flex md:items-center w-full">
            <div className="text-2xl">{t('admin.integration.zabbix')}</div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="mt-2">
              <div className="md:flex md:items-center mt-3">
                <div className="pl-6 pr-3">
                  <label>{t('admin.integration.url')}</label>
                </div>
                <div className="w-full">
                  <input
                    className="flex flex-1 h-16 px-3 py-2 w-full placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text"
                  />
                </div>
              </div>
            </div>

            <div className="mt-2 grid grid-cols-2 gap-10">
              <div className="col-span-2 grid grid-cols-2 gap-10">
                <div className="md:flex md:items-center mt-3">
                  <div className="pl-6 pr-3">
                    <label>{t('admin.integration.username')}</label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="flex flex-1 h-16 px-3 py-2 w-80 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      type="text"
                    />
                  </div>
                  <div className="pl-6 pr-3">
                    <label>{t('admin.integration.password')}</label>
                  </div>
                  <div className="md:w-2/3">
                    <input
                      className="flex flex-1 h-16 px-3 py-2 w-80 placeholder-gray-600 border rounded-lg focus:shadow-outline"
                      type="text"
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-8">
          <div className="text-gray-700 md:flex md:items-center w-full">
            <div className="text-2xl">{t('admin.integration.sustainment')}</div>
          </div>
          <div className="grid grid-cols-2 gap-10">
            <div className="mt-2">
              <div className="md:flex md:items-center mt-3">
                <div className="pl-6 pr-3">
                  <label>{t('admin.integration.url')}</label>
                </div>
                <div className="w-full">
                  <input
                    className="flex flex-1 h-16 px-3 py-2 w-full placeholder-gray-600 border rounded-lg focus:shadow-outline"
                    type="text"
                  />
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="my-8"></div>
        <div className="text-right">
          <ButtonForm
            onSubmit={() => {}}
            submitLabel={t('button.submit')}
            cancelLabel={t('button.cancel')}
          />
        </div>
      </div>
    </>
  );
};

export default FormIntegrationConfiguration;
