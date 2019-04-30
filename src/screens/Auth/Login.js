import React from 'react';
import { View, StyleSheet, Dimensions, TouchableHighlight } from 'react-native';
import { Input, Text, Button, Image } from 'react-native-elements';
import { connect } from 'react-redux';

import { login } from '../../store/actions/user';
import bannerLogo from '../../../assets/pokedumb.png';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      control: {
        email: 'test@mail.com',
        password: '12345678'
      }
    };
  }

  static navigationOptions = ({ navigation }) => ({
    title: 'login'
  })

  _emailInputHandler = val => {
    this.setState(state => ({
      control: {
        ...state.control,
        email: val
      }
    }));
  };

  _passwordInputHandler = val => {
    this.setState(state => ({
      control: {
        ...state.control,
        password: val
      }
    }));
  };

  _loginHandler = () => {
    const { control } = this.state;
    this.props.login(control);
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <View style={styles.container}>
        <Image
          source={bannerLogo}
          resizeMode="contain"
          containerStyle={styles.imgWrapper}
          style={styles.img}
        />
        <View style={styles.form}>
          <View style={styles.inputContainer}>
            <Input
              onChangeText={this._emailInputHandler}
              inputStyle={styles.input}
              inputContainerStyle={{ borderBottomColor: 'rgba(0,0,0,0)' }}
              label="email"
              labelStyle={styles.label}
              value={this.state.control.email}
            />
            <Input
              onChangeText={this._passwordInputHandler}
              secureTextEntry={true}
              inputStyle={styles.input}
              inputContainerStyle={{ borderBottomColor: 'rgba(0,0,0,0)' }}
              label="password"
              labelStyle={styles.label}
              containerStyle={{ marginVertical: '3%' }}
              value={this.state.control.email}
            />
          </View>
          <View style={{ flexDirection: 'column', justifyContent: 'space-evenly', alignItems: 'center' }}>
          <Button
            containerStyle={styles.buttonContainer}
            title="login"
            onPress={this._loginHandler}
            buttonStyle={styles.button}
          />
            <View style={{flexDirection: 'row'}}>
            <Text>Don't have an account? register</Text>
            <TouchableHighlight>
              <Text style={{textDecorationLine: 'underline', color: '#9fd3ff'}}>{' '}here</Text>
            </TouchableHighlight>
            </View>
          </View>
        </View>
      </View>
    );
  }
}

export default connect(
  null,
  { login }
)(Login);

const { width, height } = Dimensions.get('window');

const styles = StyleSheet.create({
  container: {
    flexDirection: 'column',
    height: '100%',
    justifyContent: 'flex-end',
    paddingVertical: '2%'
  },
  banner: {
    height: '100%'
  },
  imgWrapper: {
    flexDirection: 'column',
    width: '100%',
    height: '100%',
    alignItems: 'center',
    justifyContent: 'flex-end'
  },
  img: {
    width: '70%',
    height: '30%'
  },
  form: {
    height: '70%',
    padding: width * 0.01
  },
  inputContainer: {
    flexDirection: 'column',
    justifyContent: 'flex-start',
    height: '70%'
  },
  input: {
    marginVertical: '2%',
    borderColor: 'rgba(255,255,255, .76)',
    borderWidth: 2,
    borderRadius: 30,
    backgroundColor: '#fff',
    elevation: 3,
    paddingLeft: '10%'
  },
  label: {
    paddingLeft: '5%'
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
    backgroundColor: '#396BBA'
  }
});
