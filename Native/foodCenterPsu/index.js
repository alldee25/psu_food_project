/**
 * @format
 */

import {AppRegistry} from 'react-native';
import PushNotification from 'react-native-push-notification';
import App from './App';
import {name as appName} from './app.json';
import { typography } from './typography';

PushNotification.configure({
    onNotification: function (notification) {
        console.log("NOTIFICATION:", notification);
    
       }, 
        
       requestPermissions: Platform.OS === 'ios'
      
})
typography()
AppRegistry.registerComponent(appName, () => App);
