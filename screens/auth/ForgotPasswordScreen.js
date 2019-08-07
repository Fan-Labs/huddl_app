import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {View, Text, TouchableOpacity} from 'react-native'
import { connect } from 'react-redux'
import { Button } from 'react-native-elements';
import { recoverRoutine } from '../../redux/auth/actions';
import NavigationService from '../../navigation/NavigationService'
import {inputField} from '../../components/forms/InputField'
import styles from './SignInScreen.style'

const RecoverForm = props => {
  const { handleSubmit, loading } = props

  return (
    <View style={styles.wrapper}>
      <View style={styles.column}>
        <Field name="email" placeholder="Email" component={inputField} leftIcon={{ type: 'font-awesome', name: 'envelope' }}/>
        <Button 
          title="Send Password Recovery Email"
          onPress={handleSubmit}
          loading={loading}
        />
      </View>
      <View style={styles.bottom}>
        <TouchableOpacity onPress={() => NavigationService.navigate('SignIn')}>
          <Text style={styles.registerButton}>Back to Login</Text>
        </TouchableOpacity>
      </View>
    </View>
  )
}

const ConnectedRecoverForm = reduxForm({
  form: 'recoverpassword'
})(RecoverForm)


class ForgotPasswordScreen extends Component {
  constructor(props) {
    super(props);
    this.submitRecoverEmail = this.submitRecoverEmail.bind(this);
  }

  submitRecoverEmail(values) {
    this.props.onSubmitRecoverEmail(values)
  }

  render() {
    return (
      <ConnectedRecoverForm onSubmit={this.submitRecoverEmail} />
    );
  }
}

const mapStateToProps = function(state) {
  return { loading: state.Auth.loading };
};

const mapDispatchToProps = dispatch => {
  return {
    onSubmitRecoverEmail: ({email}) => {
      dispatch(recoverRoutine.trigger({email}));
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(ForgotPasswordScreen);