import { createStore, combineReducers, applyMiddleware } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import createSagaMiddleware from 'redux-saga';
import reducers from './reducers';
import rootSaga from './sagas';

const sagaMiddleware = createSagaMiddleware();
const middlewares = [sagaMiddleware];

let store = createStore(
  combineReducers({
    ...reducers
  }),
  composeWithDevTools(applyMiddleware(...middlewares))
)
// let persistor = persistStore(store)
sagaMiddleware.run(rootSaga);
export { store };
