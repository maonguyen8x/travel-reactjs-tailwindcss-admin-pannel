import { t } from 'app/i18n';

export default function NoDataView() {
  return (
    <div className="flex items-center justify-center h-full">
      <div className="bg-gray-300 text-default w-80 h-28 flex justify-center items-center ">
        {t('no_data')}
      </div>
    </div>
  );
}
