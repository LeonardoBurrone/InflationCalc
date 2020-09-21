import { all } from 'redux-saga/effects';

import { testSagas } from './testSagas';

export default function* rootSaga() {
  yield all([testSagas]);
}
