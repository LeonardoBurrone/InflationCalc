import { applyMiddleware, createStore } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension/developmentOnly';
import createSagaMiddleware from 'redux-saga';

import rootReducer from './Reducers/rootReducer';
import rootSaga from './Sagas/rootSaga';

const create = (): any => {
  const sagaMiddleware: any = createSagaMiddleware();
  const middlewares: any[] = [sagaMiddleware];
  const middleWare: any = applyMiddleware(...middlewares);
  const compose = composeWithDevTools(middleWare);
  const storeCreator: any = createStore(rootReducer, compose);

  sagaMiddleware.run(rootSaga);

  return storeCreator;
};

const Store: any = create();

export default Store;
