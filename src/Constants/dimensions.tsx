import {Dimensions, NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;

const font12 = height / 70.33;
const font13 = height / 64.92;
const font14 = height / 60.28;
const font15 = height / 56.26;
const font16 = height / 52.75;
const font18 = height / 46.88;
const font20 = height / 42.2;

const bottomTabHeight = height / 7.03;

const iconSize24 = height / 38;
const iconSize18 = height / 48.89;
const iconSize16 = height / 55;
const iconSize5 = height / 176;

const px5 = height / 168.8;

const statusHeight = StatusBarManager.HEIGHT || px5 * 5;
const headerHeight = px5 * 9;
const headerAva = px5 * 7;
const scrollSize = px5 * 11;

export {
  width,
  height,
  statusHeight,
  headerAva,
  headerHeight,
  scrollSize,
  font12,
  font14,
  font16,
  font18,
  font20,
  font13,
  font15,
  bottomTabHeight,
  px5,
  iconSize16,
  iconSize24,
  iconSize18,
  iconSize5,
};
