import React from 'react'
import styles from './InputField.styles'
import { Input } from 'react-native-elements';


const inputField = ({ input: { onChange, ...restInput }, meta, ...custom}) => {
  return <Input style={styles.input} onChangeText={onChange} {...restInput} {...custom} />
}

export {inputField}