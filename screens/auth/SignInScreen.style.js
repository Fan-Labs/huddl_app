import { StyleSheet } from 'react-native';
import styleConstants from '../../constants/styleConstants';

const styles = StyleSheet.create({
  wrapper: {
    flex: 1,
    paddingHorizontal: '20%',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: styleConstants.white,
  },
  column: {
  	width: '100%',
  	alignItems: 'center',
  },
  bottom: {
  	width: '100%',
  	position: 'absolute',
  	bottom: '20%',
  },
  registerText: {
  	textAlign: 'center',
  	marginTop: 20,
  },
  registerButton: {
  	textAlign: 'center',
  	fontWeight: 'bold'
  },
  button: {
  	marginTop: 10,
  	textAlign: 'center',
  	fontWeight: 'bold'  	
  }
 
});
export default styles