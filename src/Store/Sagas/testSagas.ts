// TODO: delete this saga example when a functional one is created
import { all, takeLatest } from 'redux-saga/effects';

export function* test(action: any) {
  // TODO: delete this saga example when a functional one is created
}

export const testSagas = all([takeLatest('TEST', test)]);
