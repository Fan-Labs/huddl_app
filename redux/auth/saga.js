import { loginRoutine, signupRoutine, recoverRoutine, actions } from './actions';
import { signup, login, requestResetEmail } from '../../api'
import { clearSession } from '../../tokens'
import NavigationService from '../../navigation/NavigationService'
import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects'
import {AsyncStorage, Alert} from 'react-native';

export default function* rootSaga() {
  yield all([
    fork(logoutSaga),
    fork(loginSaga),
    fork(signupSaga),
    fork(recoverSaga),
    fork(sessionLoadSaga),
    fork(persistCurrentSessionSaga)
  ]);
}

export const getSession = (state) => {
  return state.Auth.session
}

function* persistCurrentSessionSaga() {
  yield takeEvery(actions.PERSIST_SESSION, function*() {
    try {
      debugger
      const currentSession  = yield select(getSession)
      debugger
      yield call(AsyncStorage.setItem, 'session', JSON.stringify(currentSession))
    } catch (error) {
      console.log(error)
    }
  })
};

function* logoutSaga() {
  console.log('logout saga running')
  yield takeEvery(actions.LOGOUT, function*() {
    try {
      yield call(clearSession)
      yield call(NavigationService.navigate, 'Auth')
      
    } catch (error) {
        // if request failed
        console.log(error)
    } finally {
        // trigger fulfill action
        console.log('logged out')
    }
  });
}

function* sessionLoadSaga() {
  console.log('session load saga running')
  yield takeEvery(actions.LOAD_SESSION, function*() {
    try {
      const session = yield call(AsyncStorage.getItem, 'session')
      yield put(actions.setSession(JSON.parse(session)));
      //TODO routing based on what's in session object
      
    } catch (error) {
        // if request failed
        console.log(error)
    } finally {
        // trigger fulfill action
        console.log('session loaded')
    }
  });
}

function* loginSaga() {
  console.log('login saga running')
  yield takeEvery(loginRoutine.TRIGGER, function*({ payload: { email, password }}) {
    try {
      yield put(loginRoutine.request())
      const response = yield call(login, email, password)
      yield put(loginRoutine.success(response.data.accessToken))
      yield put(actions.persistSession())
      yield call(NavigationService.navigate, 'App')
    } catch (error) {
        // if request failed
        yield put(loginRoutine.failure(error.message))
    } finally {
        // trigger fulfill action
        yield put(loginRoutine.fulfill())
    }
  });
}

function* signupSaga() {
  console.log('signup saga running')
  yield takeEvery(signupRoutine.TRIGGER, function*({ payload: { email, password }}) {
    try {
      // trigger request action
      debugger
      // perform request to '/some_url' to fetch some data
      const response = yield call(signup, email, password);
        // if request successfully finished
      yield put(signupRoutine.success(response.data));
      yield put(actions.persistSession())
      Alert.alert(
        'Registration Email Sent',
        `Check your inbox to verify ${email}`,
        [
          {text: 'Sign In', onPress: () => NavigationService.navigate('SignIn') },
        ],
        {cancelable: false},
      )
    } catch (error) {
        // if request failed
        yield put(signupRoutine.failure(error.message));
    } finally {
        // trigger fulfill action
        yield put(signupRoutine.fulfill());
    }
  });
}

function* recoverSaga() {
  console.log('recover saga running')
  yield takeEvery(recoverRoutine.TRIGGER, function*({ payload: { email }}) {
    try {
      // trigger request action
      debugger
      // perform request to '/some_url' to fetch some data
      const response = yield call(requestResetEmail, email);
        // if request successfully finished
      yield put(recoverRoutine.success(response.data));
      Alert.alert(
        'Password Reset Email Sent',
        `Please check your inbox.`,
        [
          {text: 'Sign In', onPress: () => NavigationService.navigate('SignIn') },
        ],
        {cancelable: false},
      )
    } catch (error) {
        // if request failed
        yield put(recoverRoutine.failure(error.message));
    } finally {
        // trigger fulfill action
        yield put(recoverRoutine.fulfill());
    }
  });
}