import React, {Component} from 'react';
import {StyleSheet} from 'react-native';
import Slides from '../components/Slides';

const SLIDE_DATA = [
  {text: 'Welcome to JobApp', color: '#03A9F4'},
  {text: 'Use this app to get a job', color: '#009688'},
  {text: 'Set your location, then swipe away', color: '#03A9F4'}
];

class WelcomeScreen extends Component {
  onSlidesComplete = () => {
    this.props.navigation.navigate('auth')
  };

  render() {
    return (
      <Slides data={SLIDE_DATA} onComplete={this.onSlidesComplete} />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#fff',
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default WelcomeScreen;