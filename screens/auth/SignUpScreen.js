import React, {Component} from 'react'
import { Field, reduxForm } from 'redux-form'
import {View, Button, AsyncStorage} from 'react-native'
import {inputField} from '../../components/forms/InputField'

const SignUpForm = props => {
  const { handleSubmit } = props

  return (
    <View style={styles.container}>
      <Text>Email:</Text>
      <Field name="email" component={inputField} />
      <TouchableOpacity onPress={handleSubmit(submit)}>
        <Text style={styles.button}>Submit</Text>
      </TouchableOpacity>
    </View>
  )
}

export default reduxForm({
  form: 'signup'
})(SignUpForm)