import React, {Component} from 'react'
import { connect } from 'react-redux'
import { isLoggedIn } from '../../api/tokens'
import {actions} from '../../redux/auth/actions'
import {
  ActivityIndicator,
  StatusBar,
  StyleSheet,
  View,
} from 'react-native';

class AuthLoadingScreen extends Component {
  constructor(props) {
    super(props);
    this._bootstrapAsync();
  }

  // Fetch the token from storage then navigate to our appropriate place
  _bootstrapAsync = async () => {
    let loggedInStatus
    try {
      loggedInStatus = await isLoggedIn()
    } catch (err) {
      console.log(err)
      loggedInStatus = false
    }

    // This will switch to the App screen or Auth screen and this loading
    // screen will be unmounted and thrown away.
    //TODO CHECK SESSION FOR TOKEN EXPIRATION AND VALIDITY
    if(loggedInStatus) {
      this.props.onLoadSession()
      this.props.navigation.navigate('App')
    } else {
      this.props.navigation.navigate('Auth')
    }
  };

  // Render any loading content that you like here
  render() {
    return (
      <View>
        <ActivityIndicator />
        <StatusBar barStyle="default" />
      </View>
    );
  }
}

const mapStateToProps = function(state) {
  return { };
};

const mapDispatchToProps = dispatch => {
  return {
    onLoadSession: () => {
      dispatch(actions.loadSession());
    },
  };
};

export default connect(mapStateToProps, mapDispatchToProps)(AuthLoadingScreen);