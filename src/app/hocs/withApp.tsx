import React from 'react';
import { withRouter } from 'react-router-dom';

const WithApp = (WrapComponent: any) =>
  withRouter((props: any) => {
    const ON_GO_BACK = () => {
      props.history.goBack();
    };

    const ON_NAVIGATE = (router: any) => {
      props.history.push(router);
    };

    return (
      <WrapComponent
        {...props}
        ON_GO_BACK={ON_GO_BACK}
        ON_NAVIGATE={ON_NAVIGATE}
      />
    );
  });

export default WithApp;
