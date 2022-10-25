import {Dimensions, NativeModules} from 'react-native';
const {StatusBarManager} = NativeModules;

const width = Dimensions.get('window').width;
const height = Dimensions.get('window').height;
const statusHeight = StatusBarManager.HEIGHT || 24;
const headerHeight = 45;
const headerAva = 35;
const scrollSize = 60;

export {width, height, statusHeight, headerAva, headerHeight, scrollSize};
