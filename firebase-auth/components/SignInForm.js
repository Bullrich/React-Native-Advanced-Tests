import React, {Component} from 'react';
import {View} from 'react-native';
import {Button, FormInput, FormLabel} from 'react-native-elements';
import axios from 'axios';
import firebase from 'firebase';

const ROOT_URL = ' https://us-central1-one-time-password-4eace.cloudfunctions.net';

class SignUpForm extends Component {
  state = {phone: '', email: '', code: ''};

  handleSubmit = async () => {
    try {
      let response = await axios.post(`${ROOT_URL}/createUser`,
        {email: this.state.email, code: this.state.code});
      console.log(response);

      firebase.auth().signInWithcustomToken(data.token);
    }
    catch (err) {
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
          <FormLabel>Enter Code</FormLabel>
          <FormInput
            value={this.state.code}
            onChangeText={code => this.setState({code})}
          />
        </View>
        <Button onPress={this.handleSubmit} title="Submit"/>
      </View>
    );
  }
}

export default SignUpForm;