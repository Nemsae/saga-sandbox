import test from 'tape';

import { put, call } from 'redux-saga/effects';
import { delay } from 'redux-saga';
import { incrementAsync } from './sagas';

test('incrementAsync Saga test', (assert) => {
  const gen = incrementAsync();
  //  incrementAsync is a 'generator' function
  //  when run it returns an iterator object, and the iterator's
  //  next method returns an object that looks like this:
  //  gen.next()  //  => { done; boolean, value: any }
  //  value is the result of the expression after the yield, or the yielded expression

  assert.deepEqual(
    gen.next().value,
    call(delay, 1000),
    'incrementAsync Saga must call delay(1000)'
  )

  assert.deepEqual(
    gen.next().value,
    put({ type: 'INCREMENT' }),
    'incrementAsync Saga must disptach an INCREMENT action'
  )

  assert.deepEqual(
    gen.next(),
    { done: true, value: undefined },
    'incrementAsync Saga must be done'
  )

  assert.end()

  // gen.next() // => { done: false, value: <result of calling delay(1000)> }
  // gen.next() // => { done: false, value: <result of calling put({type: 'INCREMENT'})> }
  // gen.next() // => { done: true, value: undefined }
})
