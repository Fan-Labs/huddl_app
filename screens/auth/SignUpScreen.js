import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import { connect } from 'react-redux'
import {View, Text, TouchableOpacity} from 'react-native'
import { Button } from 'react-native-elements';
import NavigationService from '../../navigation/NavigationService'
import { signupRoutine } from '../../redux/auth/actions';
import {inputField} from '../../components/forms/InputField'
import styles from './SignInScreen.style'

const SignUpForm = props => {
  const { handleSubmit, loading } = props

  return (
    <View style={styles.wrapper}>
      <View style={styles.column}>
        <Field name="first_name" placeholder="First Name" component={inputField} />
        <Field name="last_name" placeholder="Last Name" component={inputField} />
        <Field name="email" component={inputField} leftIcon={{ type: 'font-awesome', name: 'envelope' }}/>
        <Field name="password" component={inputField} leftIcon={{ type: 'font-awesome', name: 'lock' }} />
        <Button 
          title="Sign Up"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
      <View style={styles.bottom}>
        <Text style={styles.registerText}>Already have an account?</Text>
        <TouchableOpacity onPress={() => NavigationService.navigate('SignIn')}>
          <Text style={styles.registerButton}>Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ConnectedSignUpForm = reduxForm({
  form: 'signup'
})(SignUpForm)

class SignUpScreen extends Component {
  constructor(props) {
    super(props);
    this.handleRegister = this.handleRegister.bind(this);
  }

  handleRegister(values) {
    this.props.onSignUp(values)
  }

  render() {
    return (
      <ConnectedSignUpForm onSubmit={this.handleRegister}  />
    );
  }
}

const mapStateToProps = function(state) {
  return {loading: state.Auth.loading};
};

const mapDispatchToProps = dispatch => {
  return {
    onSignUp: ({email, password}) => {
      dispatch(signupRoutine.trigger({email, password}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(SignUpScreen);