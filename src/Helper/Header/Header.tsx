import { HeaderBackButton, HeaderTitle } from '@react-navigation/stack';
import * as React from 'react';
import { Platform, Text, TouchableOpacity, View } from 'react-native';

import navigationService from '../../Services/Navigation';

import { styles } from './Header.style';

interface IProps {
  backgroundColor?: string;
  title?: string;
}

const goToRoute = (route: string | undefined) => () => {
  if (route) {
    navigationService.navigate(route);
  } else {
    navigationService.back();
  }
};

export const headerConstructor: any = (
  title: string,
  leftButton?: boolean,
  leftRoute?: string,
  closeBtn?: boolean,
  closeRoute?: string
) => {
  const headerProps = headerProperties({ title });
  const result: any = { ...headerProps };
  if (leftButton) {
    if (Platform.OS === 'android' && leftRoute) {
      result.headerLeft = () => (
        <View style={styles().headerLeftOnAndroid}>
          <HeaderBackButton
            pressColorAndroid='transparent'
            labelVisible={false}
            tintColor={'#FFF'}
            onPress={goToRoute(leftRoute ? leftRoute : undefined)}
          />
          <HeaderTitle style={styles().headerTitleOnAndroid} tintColor={'#FFF'}>
            {title}
          </HeaderTitle>
        </View>
      );
    }
    if (Platform.OS === 'ios') {
      result.headerLeft = () => (
        <HeaderBackButton
          labelVisible={false}
          tintColor={'#FFF'}
          onPress={goToRoute(leftRoute ? leftRoute : undefined)}
        />
      );
    }
  } else {
    result.headerHideBackButton = true;
  }
  if (closeBtn) {
    result.headerRight = () => (
      <TouchableOpacity style={styles().closeBtn} onPress={goToRoute(closeRoute ? closeRoute : undefined)}>
        <Text>Icon</Text>
      </TouchableOpacity>
    );
  }

  return result;
};

export const headerProperties = (props?: IProps) => {
  return {
    headerBackTitle: null,
    headerBackTitleVisible: false,
    headerStyle: styles(props).container,
    headerTintColor: '#FFF',
    headerTitle: props && props.title ? props.title : '',
    headerTitleStyle: styles().title,
  };
};
