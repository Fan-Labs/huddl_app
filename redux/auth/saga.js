import { loginRoutine, signupRoutine, actions } from './actions';
import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects'
import {AsyncStorage} from 'react-native';

export default function* rootSaga() {
  yield all([
    fork(loginSaga),
    fork(signupSaga),
    fork(sessionLoadSaga),
    fork(persistCurrentSessionSaga)
  ]);
}

export const getSession = (state) => {
  return state.Auth.get('session')
}

function* persistCurrentSessionSaga() {
  yield takeEvery(actions.PERSIST_SESSION, function*() {
    try {
      const currentSession  = yield select(getSession)
      yield call(AsyncStorage.setItem, 'session', JSON.stringify(currentSession))
    } catch (error) {
      console.log(error)
    }
  })
};

function* sessionLoadSaga() {
  console.log('session load saga running')
  yield takeEvery(actions.LOAD_SESSION, function*() {
    try {
      const session = yield call(AsyncStorage.getItem, 'session')
      yield put(actions.setSession(session));
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
  yield takeEvery(loginRoutine.TRIGGER, function*({ email, password }) {
    try {
      // trigger request action
      yield put(loginRoutine.request());
      
      // perform request to '/some_url' to fetch some data
      //const response = yield call(apiClient.request, '/some_url');
        // if request successfully finished
      yield put(fetchData.success(response.data));
    } catch (error) {
        // if request failed
        yield put(fetchData.failure(error.message));
    } finally {
        // trigger fulfill action
        yield put(fetchData.fulfill());
    }
  });
}

function* signupSaga() {
  console.log('signup saga running')
  yield takeEvery(signupRoutine.TRIGGER, function*({ email, password }) {
    try {
      // trigger request action
      yield put(signupRoutine.request());
      
      // perform request to '/some_url' to fetch some data
      //const response = yield call(apiClient.request, '/some_url');
        // if request successfully finished
      yield put(signupRoutine.success(response.data));
    } catch (error) {
        // if request failed
        yield put(signupRoutine.failure(error.message));
    } finally {
        // trigger fulfill action
        yield put(signupRoutine.fulfill());
    }
  });
}