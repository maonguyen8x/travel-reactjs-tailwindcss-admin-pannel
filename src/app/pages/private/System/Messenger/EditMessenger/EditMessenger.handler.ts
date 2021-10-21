export default {
  EDIT_MESSENGER: (props: any) => ({ messageVi, messageEn }: any) => {
    const { editMessenger, match } = props;
    const messageOldVi = match?.params?.slug.split('__')?.[0];
    const messageOldEn = match?.params?.slug.split('__')?.[1];
    editMessenger({
      messageOld: { en: `${messageOldEn}`, vi: `${messageOldVi}` },
      messageNew: { messageVi, messageEn },
    });
  },
};
