import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {View, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements';
import { loginRoutine } from '../../redux/auth/actions';
import NavigationService from '../../navigation/NavigationService'
import {inputField} from '../../components/forms/InputField'
import styles from './SignInScreen.style'

const SignInForm = props => {
  const { handleSubmit, loading } = props

  return (
    <View style={styles.wrapper}>
      <View style={styles.column}>
        <Text style={styles.registerText}>Huddle Sign In</Text>
        <Field name="email" component={inputField} leftIcon={{ type: 'font-awesome', name: 'envelope' }}/>
        <Field name="password" component={inputField} leftIcon={{ type: 'font-awesome', name: 'lock' }} />
        <Button 
          title="Sign In"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.registerText}>Don't have an account?</Text>
        <TouchableOpacity onPress={() => NavigationService.navigate('SignUp')}>
          <Text style={styles.registerButton}>Register</Text>
        </TouchableOpacity>
        <TouchableOpacity onPress={() => NavigationService.navigate('ForgotPassword')}>
          <Text style={styles.registerButton}>Forgot Password?</Text>
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
  }

  handleLogin(values) {
    this.props.onSignIn(values)
  }

  render() {
    return (
      <ConnectedSignInForm onSubmit={this.handleLogin} handleRegister={this.handleRegister}  />
    );
  }
}

const mapStateToProps = function(state) {
  return { loading: state.Auth.loading };
};

const mapDispatchToProps = dispatch => {
  return {
    onSignIn: ({email, password}) => {
      dispatch(loginRoutine.trigger({email, password}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignInScreen);