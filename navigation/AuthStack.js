import { createMaterialTopTabNavigator } from 'react-navigation';
import SignInScreen from '../screens/auth/SignInScreen'
import SignUpScreen from '../screens/auth/SignUpScreen'
import ForgotPasswordScreen from '../screens/auth/ForgotPasswordScreen'

const AuthStack = createMaterialTopTabNavigator({ SignIn: SignInScreen, SignUp: SignUpScreen, ForgotPassword: ForgotPasswordScreen }, {
	tabBarComponent: null,
});

export default AuthStack;