import React from 'react';
import {Provider} from 'react-redux';
import HomeStack from './src/navigation/HomeStack';
import store, {persistVal} from './src/redux/store';
import MyStatusBar from './src/Components/MyStatusBar';
import {PersistGate} from 'redux-persist/integration/react';
import {NavigationContainer} from '@react-navigation/native';

const App = () => {
  return (
    <NavigationContainer>
      <Provider store={store}>
        <PersistGate loading={null} persistor={persistVal}>
          <MyStatusBar backgroundColor={'white'} />
          <HomeStack />
        </PersistGate>
      </Provider>
    </NavigationContainer>
  );
};

export default App;
