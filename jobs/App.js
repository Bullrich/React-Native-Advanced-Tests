import React, {Component} from 'react';
import {StyleSheet, View} from 'react-native';
import {createBottomTabNavigator, createStackNavigator} from 'react-navigation';
import {Provider} from 'react-redux';
import store from './store';

import AuthScreen from './screens/AuthScreen';
import WelcomeScreen from './screens/WelcomeScreen';
import MapScreen from './screens/MapScreen';
import DeckScreen from './screens/DeckScreen';
import ReviewScreen from './screens/ReviewScreen';
import SettingsScreen from './screens/SettingsScreen';


class App extends Component {
  render() {
    const MainNavigator = createBottomTabNavigator({
      welcome: WelcomeScreen,
      auth: AuthScreen,
      main: {
        screen: createBottomTabNavigator({
          map: MapScreen,
          deck: DeckScreen,
          review: {
            screen: createStackNavigator({
              review: ReviewScreen,
              settings: SettingsScreen
            })
          }
        })
      }
    }, {
      lazy: true,
      navigationOptions: {
        tabBarVisible: false
      }
    });

    return (
      <Provider store={store}>
        <View style={styles.container}>
          <MainNavigator/>
        </View>
      </Provider>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    // alignItems: 'center',
    justifyContent: 'center',
  },
});

export default App;