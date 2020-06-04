import React from 'react';
import { Provider } from 'react-redux'
import { PersistGate } from 'redux-persist/integration/react'
import storage from './src/store/Index'
import { Notifications } from 'expo'
import { Alert } from 'react-native'

import registeredNatification from './src/services/push_natifications'
import JobNavigation from './src/navigation/JobNavigation'

export default class App extends React.Component {
  // componentDidMount(){
  //   registeredNatification();
  //   Notifications.addListener((notification)=>{
  //     const { data : { text }, origin } = notification;
  //     console.log(notification);
      
  //     //const text = notification.data.text
  //     if (origin === 'received' && text) {
  //         Alert.alert(
  //         'New push notification',
  //         text,
  //         [{text : 'Ok.'}]
  //       )
  //     }
  //   })
  // }
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

