import React from 'react'
import styles from './InputField.styles'
import { Input } from 'react-native-elements';


const inputField = ({ input: { onChange, ...restInput }, meta, ...custom}) => {
  return <Input 
  	style={styles.input}
  	onChangeText={onChange}
		autoCapitalize = 'none'
  	{...restInput}
  	{...custom} 
  />
}

export {inputField}