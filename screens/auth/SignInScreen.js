import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {View, Button, Text, TouchableOpacity} from 'react-native'
import {inputField} from '../../components/forms/InputField'
import styles from './SignInScreen.style'

const SignInForm = props => {
  const { handleSubmit, handleRegister } = props

  return (
    <View style={styles.wrapper}>
      <View style={styles.column}>
        <Field name="email" component={inputField} leftIcon={{ type: 'font-awesome', name: 'envelope' }}/>
        <Field name="password" component={inputField} leftIcon={{ type: 'font-awesome', name: 'lock' }} />
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.button}>Submit</Text>
        </TouchableOpacity>
      </View>
      <View style={styles.bottom}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={handleSubmit}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ConnectedSignInForm = reduxForm({
  form: 'signin'
})(SignInForm)


class SignInScreen extends Component {
  constructor(props) {
    super(props);
    this.handleLogin = this.handleLogin.bind(this);
    this.handleRegister = this.handleRegister.bind(this);

  }

  handleRegister() {
    console.log('register')
  }

  handleLogin(values) {
    console.log(values)
  }

  render() {
    return (
      <ConnectedSignInForm onSubmit={this.handleLogin} handleRegister={this.handleRegister} />
    );
  }


}
export default SignInScreen;