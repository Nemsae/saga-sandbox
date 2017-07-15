import { delay } from 'redux-saga';
import { put, takeEvery, all } from 'redux-saga/effects';
//  'effects' are simple JavaScript objects that contain instructiosn to be fulfilled by the middleware
//  'put' is an example of an 'Effect'
//  when middleware retrieves a effect yielded by a Saga, the Saga is paused until the effect is fulfilled

export function* incrementAsync() {
  yield delay(1000);
  console.log('Sanity:');
  //  delay : utility function that returns a a Promise that will resolve after a specified amount of miliseconds
  yield put({ type: 'INCREMENT' });
  //  put : instructs the middleware to dispatch an action
}

export function* watchIncrementAsync() {
  yield takeEvery('INCREMENT_ASYNC', incrementAsync);
}

export function* helloSaga() {
  console.log('Hello Sagas!');
}

export default function* rootSaga() {
  yield all([
      helloSaga(),
      watchIncrementAsync()
  ])
}
