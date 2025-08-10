import { Provider } from 'react-redux';
import { PersistGate } from 'redux-persist/integration/react';

import RootNavigator from './src/navigation/RootNavigator';
import { persistor, store } from './src/store';
import AppInitializer from './src/app/AppInitializer';

function App() {
  return (
    <Provider store={store}>
      <PersistGate loading={null} persistor={persistor}>
        <AppInitializer />
        <RootNavigator />
      </PersistGate>
    </Provider>
  );
}

export default App;
