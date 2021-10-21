export default {
  SEND_MESSENGER: (props: any) => ({ messageVi, messageEn }: any) => {
    const { sendMessenger } = props;
    sendMessenger({ messageVi, messageEn });
  },
};
