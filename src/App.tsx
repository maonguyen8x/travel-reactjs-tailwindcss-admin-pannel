import React from 'react';
import { Provider } from 'react-redux';
import { BrowserRouter } from 'react-router-dom';
import Routes from 'app/routers/Routers';
import { PersistGate } from 'redux-persist/integration/react';
import 'mapbox-gl/dist/mapbox-gl.css';
import { setLocale } from 'app/i18n';
import './index.css';

export default function App({ store, persistor, basename }: any) {
  const onBeforeLift = () => {
    const { lang } = store.getState().app;
    setLocale(lang);
  };

  return (
    <Provider store={store}>
      <PersistGate persistor={persistor} onBeforeLift={onBeforeLift}>
        <React.Suspense fallback={<div>Loading...</div>}>
          <BrowserRouter basename={basename}>
            <Routes />
          </BrowserRouter>
        </React.Suspense>
      </PersistGate>
    </Provider>
  );
}
