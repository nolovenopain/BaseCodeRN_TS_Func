import {Dimensions, StatusBar} from 'react-native';
import deviceInfoModule from 'react-native-device-info';

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusHeight =
  (StatusBar.currentHeight || 24) + (deviceInfoModule.hasNotch() ? 20 : 0);
const headerHeight = 45;
const headerAva = 35;
const scrollSize = 60;

export {
  width,
  height,
  statusHeight,
  headerAva,
  headerHeight,
  scrollSize,
};
