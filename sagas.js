import { delay } from 'redux-saga';
import { put, takeEvery, all, call } from 'redux-saga/effects';
//  'effects' are simple JavaScript objects that contain instructiosn to be fulfilled by the middleware
//  'put' is an example of an 'Effect'
//  when middleware retrieves a effect yielded by a Saga, the Saga is paused until the effect is fulfilled

export function* incrementAsync() {
  /* EFFECTS */
  //  THESE EFFECTS, both 'call' and 'put' doesn't perform any dispatch or async call
  //  they simply return plain Javascript objects. The MIDDLEWARE itself examines each
  //  of these yielded 'EFFECTS' the decides how to fulfill that EFFECT.

  yield call(delay, 1000);
  //  call : instructs the middleware to call a given function with given arguments
  yield put({ type: 'INCREMENT' });
  //  put : instructs the middleware to dispatch an action

  // yield delay(1000);
  //  delay : utility function that returns a a Promise that will resolve after a specified amount of miliseconds
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
