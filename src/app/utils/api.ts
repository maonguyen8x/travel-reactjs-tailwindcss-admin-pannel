import SweetAlert from 'app/components/SweetAlert';
import Api from '../services/Api';

const checkStatusApi = (res: any) =>
  res?.ok && (res.status === 200 || res.status === 204)
    ? res?.data
    : SweetAlert.error(res?.data?.error?.message);

const checkDataApi = (res: any) =>
  res?.ok && res?.status === 200
    ? res?.data
    : SweetAlert.error(res?.data?.error?.message);

const upLoadIcon = async (files: any) => {
  const formData = new FormData();
  formData.append('files', files?.[0]);

  const icon: any = await Api.upload(formData);
  const result = checkStatusApi(icon) && icon?.data?.[0];
  return result;
};

const upLoadImages = async (files: any) => {
  const formData = new FormData();

  for (let i = 0; i < files.length; i += 1) {
    formData.append('files', files[i]);
  }

  const image: any = await Api.upload(formData);
  return image?.data;
};

export { checkStatusApi, checkDataApi, upLoadIcon, upLoadImages };
