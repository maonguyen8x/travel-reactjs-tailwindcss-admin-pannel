import { IValues } from './AddPolicy.type';

export default {
  CREATE_POLICY: ({ createPolicy }: any) => (values: IValues) => {
    createPolicy({
      alias: values.alias,
      content: values.content,
    });
  },
};
