import { fetchTeamsRoutine } from './actions';
import { fetchTeams } from '../../api'
import NavigationService from '../../navigation/NavigationService'
import { all, takeEvery, put, fork, call, select } from 'redux-saga/effects'


export default function* rootSaga() {
  yield all([
    fork(fetchTeamsSaga),
  ]);
}

function* fetchTeamsSaga() {
  console.log('fetch team saga running')
  yield takeEvery(fetchTeamsRoutine.TRIGGER, function*() {
    try {
      yield put(fetchTeamsRoutine.request())
      const response = yield call(fetchTeams)
      debugger
      yield put(fetchTeamsRoutine.success(response.data))
      //yield call(NavigationService.navigate, 'App')
    } catch (error) {
        // if request failed
        yield put(fetchTeamsRoutine.failure(error.message))
    } finally {
        // trigger fulfill action
        yield put(fetchTeamsRoutine.fulfill())
    }
  });
}
