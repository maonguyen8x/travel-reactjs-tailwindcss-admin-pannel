import { history } from 'app/services/History';
import { IProps } from './type';

const ButtonForm = (props: IProps) => {
  const {
    onSubmit,
    onCancel = history.goBack,
    submitLabel,
    cancelLabel,
    isLoading = false,
    isShow = true,
  } = props;
  if (!isShow) return null;
  return (
    <div className="mt-4 flex flex-row justify-end w-full">
      <button
        className="mx-2 px-14 py-3 bg-gray-300 uppercase text-xl"
        onClick={onCancel}
      >
        {cancelLabel}
      </button>
      <button
        type="button"
        className="mx-2 px-6 py-3 bg-green-600 text-xl text-white uppercase"
        onClick={onSubmit}
        disabled={isLoading}
      >
        {isLoading ? (
          <div>
            <i className="fa fa-spinner fa-spin" />
            Loading...
          </div>
        ) : (
          submitLabel
        )}
      </button>
    </div>
  );
};
export default ButtonForm;
