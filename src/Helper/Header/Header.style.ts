import { Platform, StyleSheet } from 'react-native';

interface IProps {
  backgroundColor?: string;
}

export const styles = (props?: IProps) =>
  StyleSheet.create({
    closeBtn: {
      alignSelf: 'flex-end',
      marginRight: Platform.OS === 'ios' ? 10 : 0,
    },
    closeIcon: {
      alignSelf: 'center',
      color: '#FFF',
      fontSize: 30,
    },
    container: {
      backgroundColor: props && props.backgroundColor ? props.backgroundColor : '#FFF',
      borderBottomWidth: 0,
      shadowColor: 'transparent',
    },
    headerLeftOnAndroid: {
      alignItems: 'center',
      flexDirection: 'row',
      left: -15,
    },
    headerTitleOnAndroid: {
      fontWeight: 'bold',
      marginLeft: 20,
    },
    title: {
      color: '#FFF',
    },
  });
