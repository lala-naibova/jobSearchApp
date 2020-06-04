import { Notifications } from 'expo'
import * as Permissions from 'expo-permissions'
import { AsyncStorage, Vibration, Platform } from 'react-native'
import axios from 'axios'

const PUSH_ENDPOINT = 'http://rallycoding.herokuapp.com/api/tokens'

export default async ()=>{
    let previousToken = await AsyncStorage.getItem('pushtoken')
    console.log(previousToken);
    
    if (previousToken) return

    let { status } = await Permissions.askAsync(Permissions.NOTIFICATIONS)

    if (status !== 'granted') return

    let token = await Notifications.getExpoPushTokenAsync()


    // if (Platform.OS === 'android') {
    //     Notifications.createChannelAndroidAsync('default', {
    //       name: 'default',
    //       sound: true,
    //       priority: 'max',
    //       vibrate: [0, 250, 250, 250],
    //     });
    //   }

      await axios.post(PUSH_ENDPOINT, {token : { token }})
      AsyncStorage.setItem('pushtoken', token);

}