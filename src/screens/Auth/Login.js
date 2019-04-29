import React from 'react';
import {View, StyleSheet} from 'react-native';
import {Input, Text, Button} from 'react-native-elements';
import {connect} from 'react-redux';

import {login} from '../../store/actions/user';

class Login extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      control: {
        email: '',
        password: '',
      },
    };
  }
  _emailInputHandler = val => {
    this.setState(state => ({
      control: {
        ...state.control,
        email: val,
      },
    }));
  };

  _passwordInputHandler = val => {
    this.setState(state => ({
      control: {
        ...state.control,
        password: val,
      },
    }));
  };

  _loginHandler = () => {
    const {control} = this.state;
    this.props.login(control);
    this.props.navigation.navigate('Home');
  };
  render() {
    return (
      <View style={styles.container}>
        <View style={styles.inputContainer}>
          <Input onChangeText={this._emailInputHandler} />
          <Input
            onChangeText={this._passwordInputHandler}
            secureTextEntry={true}
          />
        </View>
        <Button title="login" onPress={this._loginHandler} />
      </View>
    );
  }
}

export default connect(
  null,
  {login},
)(Login);

const styles = StyleSheet.create({
  inputContainer: {
    flexDirection: 'column',
    height: '70%',
  },
  container: {
    flexDirection: 'column',
    height: '100%',
  },
});
