
import React from 'react';
import { View, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import {
  Input,
  Text,
  Button,
  Image,
  ThemeProvider
} from 'react-native-elements';
import { connect } from 'react-redux';

import theme from '../../themes/theme';
import { register } from '../../store/actions/user';

class Register extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      control: {
        email: '',
        username: '',
        password: ''
      }
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'register'
  });

  _registerHandler = () => {
    this.props.register(this.state.control);
  };

  render() {
    return (
      <View style={styles.container}>
        <ThemeProvider theme={theme.auth}>
          <View style={styles.form}>
            <View style={styles.inputContainer}>
              <Input
                onChangeText={email => this.setState({control: {...this.state.control, email}})}
                label="email"
                value={this.state.control.email}
              />
              <Input
                onChangeText={username => this.setState({control: { ...this.state.control, username}})} 
                label='username'
                value={this.state.control.username}
                />
              <Input
                onChangeText={password => this.setState({control: {...this.state.control, password}})}
                secureTextEntry={true}
                label="password"
                value={this.state.control.password}
              />
            </View>
            <View
              style={{
                flexDirection: 'column',
                justifyContent: 'flex-end',
                alignItems: 'center'
              }}
            >
              <Button
                containerStyle={styles.buttonContainer}
                title="register"
                onPress={this._registerHandler}
                buttonStyle={styles.button}
              />
              <View style={{ flexDirection: 'row',marginTop: height * .02 }}>
                <Text>Already have an account? login</Text>
                <TouchableHighlight>
                  <Text
                    style={{
                      textDecorationLine: 'underline',
                      color: '#9fd3ff',
                    }}
                  >
                    {' '}
                    here
                  </Text>
                </TouchableHighlight>
              </View>
            </View>
          </View>
        </ThemeProvider>
      </View>
    );
  }
}

export default connect(
  null,
  { register }
)(Register);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: height,
    justifyContent: 'flex-start',
    paddingVertical: '2%'
  },
  form: {
    height: '100%',
    padding: width * 0.01
  },
  buttonContainer: {
    justifyContent: 'flex-end',
    alignSelf: 'center',
    height: '30%',
    width: '80%'
  },
  button: {
    borderRadius: 15,
    elevation: 5,
    backgroundColor: '#396BBA',
  }
});
