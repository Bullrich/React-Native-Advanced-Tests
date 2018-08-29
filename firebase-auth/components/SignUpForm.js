import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, FormInput, FormLabel} from 'react-native-elements';
import axios from 'axios';

const ROOT_URL = ' https://us-central1-one-time-password-4eace.cloudfunctions.net';

class SignUpForm extends Component {
  state = {phone: '', email: ''};

  handleSubmit = async () => {
    try {
      await axios.post(`${ROOT_URL}/createUser`, {email: this.state.email});
      await axios.post(`${ROOT_URL}/requestOneTimePassword`, {email: this.state.email});
    } catch (err) {
      console.log(err);
    }
  };

  render() {
    return (
      <View>
        <View style={{marginBottom: 10}}>
          <FormLabel>Enter Email</FormLabel>
          <FormInput
            value={this.state.email}
            onChangeText={email => this.setState({email})}
          />
        </View>
        <View style={{marginBottom: 10}}>
          <FormLabel>Enter Phone Number</FormLabel>
          <FormInput
            value={this.state.phone}
            onChangeText={phone => this.setState({phone})}
          />
        </View>
        <Button onPress={this.handleSubmit} title="Submit"/>
      </View>
    );
  }
}

export default SignUpForm;