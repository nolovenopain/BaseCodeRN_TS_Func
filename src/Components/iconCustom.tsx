import React from 'react';
import {default as AntDesignRN} from 'react-native-vector-icons/AntDesign';
import {default as EvilIconsRN} from 'react-native-vector-icons/EvilIcons';
import {default as FontAwesomeRN} from 'react-native-vector-icons/FontAwesome';
import {default as FontAwesome5RN} from 'react-native-vector-icons/FontAwesome5';
import {default as IoniconsRN} from 'react-native-vector-icons/Ionicons';
import {default as MaterialCommunityIconsRN} from 'react-native-vector-icons/MaterialCommunityIcons';
import {default as MaterialIconsRN} from 'react-native-vector-icons/MaterialIcons';
import {default as FeatherRN} from 'react-native-vector-icons/Feather';
import {default as EntypoRN} from 'react-native-vector-icons/Entypo';
import {default as FontistoRN} from 'react-native-vector-icons/Fontisto';
import {default as SimpleLineIconsRN} from 'react-native-vector-icons/SimpleLineIcons';
import {default as OcticonsRN} from 'react-native-vector-icons/Octicons';
import {default as FoundationRN} from 'react-native-vector-icons/Foundation';
import {IconProps} from 'react-native-vector-icons/Icon';

interface IconCusProps extends IconProps {
  type?: string;
}

export const IconCus: React.FC<IconCusProps> = ({
  type,
  size,
  name,
  color,
  style,
}) => {
  const Type: any = {
    Ionicons: IoniconsRN,
    AntDesign: AntDesignRN,
    EvilIcons: EvilIconsRN,
    MaterialIcons: MaterialIconsRN,
    MaterialCommunityIcons: MaterialCommunityIconsRN,
    FontAwesome: FontAwesomeRN,
    FontAwesome5: FontAwesome5RN,
    Feather: FeatherRN,
    Entypo: EntypoRN,
    Fontisto: FontistoRN,
    SimpleLineIcons: SimpleLineIconsRN,
    Octicons: OcticonsRN,
    Foundation: FoundationRN,
  };

  type = type == null || type == '' ? 'Ionicons' : type;
  size = size || 24;
  color = color || 'black';
  name = name || '';

  var IconView = Type[type];
  return <IconView style={style} size={size} color={color} name={name} />;
};

var Ionicons = (props: IconCusProps) => {
  return <IconCus {...props} type="Ionicons" />;
};

var AntDesign = (props: IconCusProps) => {
  return <IconCus {...props} type="AntDesign" />;
};

var EvilIcons = (props: IconCusProps) => {
  return <IconCus {...props} type="EvilIcons" />;
};

var MaterialIcons = (props: IconCusProps) => {
  return <IconCus {...props} type="MaterialIcons" />;
};

var MaterialCommunityIcons = (props: IconCusProps) => {
  return <IconCus {...props} type="MaterialCommunityIcons" />;
};

var FontAwesome = (props: IconCusProps) => {
  return <IconCus {...props} type="FontAwesome" />;
};

var FontAwesome5 = (props: IconCusProps) => {
  return <IconCus {...props} type="FontAwesome5" />;
};

var Feather = (props: IconCusProps) => {
  return <IconCus {...props} type="Feather" />;
};
var Entypo = (props: IconCusProps) => {
  return <IconCus {...props} type="Entypo" />;
};

var Fontisto = (props: IconCusProps) => {
  return <IconCus {...props} type="Fontisto" />;
};

var SimpleLineIcons = (props: IconCusProps) => {
  return <IconCus {...props} type="SimpleLineIcons" />;
};

var Octicons = (props: IconCusProps) => {
  return <IconCus {...props} type="Octicons" />;
};

var Foundation = (props: IconCusProps) => {
  return <IconCus {...props} type="Foundation" />;
};

export {
  Ionicons,
  AntDesign,
  EvilIcons,
  MaterialIcons,
  MaterialCommunityIcons,
  FontAwesome,
  FontAwesome5,
  Feather,
  Entypo,
  Fontisto,
  SimpleLineIcons,
  Octicons,
  Foundation,
};
