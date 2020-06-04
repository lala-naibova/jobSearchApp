import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import storage from './src/store/Index'

import JobNavigation from './src/navigation/JobNavigation'

export default class App extends React.Component {

render(){
  return (
    <Provider store={storage.store}>
      <PersistGate loading={null} persistor={storage.persistStorage}>
        <JobNavigation/>
      </PersistGate>
    </Provider>
  );
}
}

