import { CommonActions } from '@react-navigation/native';
import * as React from 'react';

import Store from '../Store';
import { changeStackStateAction } from '../Store/Actions/appStatusActions';

export const navigationRef: any = React.createRef();
const routeNameRef: any = React.createRef();

const getActiveRouteName: any = (state: any) => {
  const route = state.routes[state.index];
  if (route.state) {
    return getActiveRouteName(route.state);
  }

  return route.name;
};

export const saveCurrentRoute = (state: any) => {
  const previousRouteName = routeNameRef.current;
  const currentRouteName = getActiveRouteName(state);
  if (previousRouteName !== currentRouteName) {
    const stackState = JSON.stringify(state);
    Store.dispatch(changeStackStateAction(stackState));
  }
  routeNameRef.current = currentRouteName;
};

const navigationService = {
  back: () => {
    if (navigationRef.current) {
      navigationRef.current.goBack();
    }
  },
  navigate: (routeName: string, params: any = {}) => {
    if (navigationRef.current) {
      navigationRef.current.navigate(routeName, params);
    }
  },
  popToTop: (routeName: string, params?: any, firstScreen?: string) => {
    if (navigationRef.current) {
      const routes = params ? [{ name: routeName, params }] : [{ name: routeName }];

      if (firstScreen && firstScreen.length > 0) {
        navigationRef.current.dispatch(
          CommonActions.reset({
            index: 1,
            routes: [{ name: firstScreen }, ...routes],
          })
        );
      } else {
        navigationRef.current.dispatch(
          CommonActions.reset({
            index: 1,
            routes,
          })
        );
      }
    }
  },
  replace: (routeName: string, params: any = {}) => {
    if (navigationRef.current) {
      navigationRef.current.replace(routeName, params);
    }
  },
  reset: (routeName: string, params: any) => {
    if (navigationRef.current) {
      navigationRef.current.dispatch(CommonActions.navigate({ name: routeName, params }));
    }
  },
};

export default navigationService;
