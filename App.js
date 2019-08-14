/**
*Name: Lew Wen Khai
*Reg. No.: 1303023
*/

import {
	createStackNavigator,
} from 'react-navigation';
import HomeScreen from './HomeScreen';
import ViewScreen from './ViewScreen';
import CreateScreen from './CreateScreen';

export default createStackNavigator({
  Home: {
    screen: HomeScreen,
  },
  View: {
    screen: ViewScreen
  },
  Create: {
    screen: CreateScreen
  },
}, {
  initialRouteName: 'Home',
  headerLayoutPreset: 'center',
  navigationOptions: {
    headerStyle: {
      backgroundColor: '#00b38f',
    },
    headerTintColor: '#fff',
    headerTitleStyle: {
      fontWeight: 'bold',
	  textAlign: 'center'
    },
  },
});