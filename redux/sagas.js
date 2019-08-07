import { all } from 'redux-saga/effects'
import authSagas from './auth/saga'
import teamSagas from './teams/saga'
//import appSagas from './app/saga'

export default function* rootSaga(getState) {
  yield all([
    authSagas(),
    teamSagas()
    //appSagas()
  ]);
}
