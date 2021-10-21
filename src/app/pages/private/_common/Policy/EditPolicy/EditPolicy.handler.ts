import { IValues } from './EditPolicy.type';

export default {
  EDIT_POLICY: (props: any) => (values: IValues) => {
    const { editPolicy, policyDetail } = props;
    const { id } = policyDetail;
    editPolicy(id, {
      alias: values.alias,
      content: values.content,
    });
  },
};
