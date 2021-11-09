import React from 'react'
import { default as AntDesignRN } from 'react-native-vector-icons/AntDesign';
import { default as EvilIconsRN } from 'react-native-vector-icons/EvilIcons';
import { default as FontAwesomeRN } from 'react-native-vector-icons/FontAwesome';
import { default as FontAwesome5RN } from 'react-native-vector-icons/FontAwesome5';
import { default as IoniconsRN } from 'react-native-vector-icons/Ionicons';
import { default as MaterialCommunityIconsRN } from 'react-native-vector-icons/MaterialCommunityIcons';
import { default as MaterialIconsRN } from 'react-native-vector-icons/MaterialIcons';
import { default as FeatherRN } from 'react-native-vector-icons/Feather';
import { default as EntypoRN } from 'react-native-vector-icons/Entypo';
import { default as FontistoRN } from 'react-native-vector-icons/Fontisto';

interface IconCusProps {
   type: string
   size: number
   name: string
   icon: string
   color: string
   style: {}
}

const IconCus: React.FC<IconCusProps> = ({
    type,
    size,
    name,
    icon,
    color,
    style
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
        Fontisto: FontistoRN
    } 

    type = type == null || type == '' ? 'Ionicons' : type;
    size = size || 24;
    color = color || 'black';
    name = name || icon || '';

    var IconView = Type[type];
    return (
        <IconView style={style} size={size} color={color} name={name} />
    );
}

var Ionicons = (props: any) => {
    return <IconCus {...props} type='Ionicons' />
}

var AntDesign = (props: any) => {
    return <IconCus {...props} type='AntDesign' />
}

var EvilIcons = (props: any) => {
    return <IconCus {...props} type='EvilIcons' />
}

var MaterialIcons = (props: any) => {
    return <IconCus {...props} type='MaterialIcons' />
}

var MaterialCommunityIcons = (props: any) => {
    return <IconCus {...props} type='MaterialCommunityIcons' />
}

var FontAwesome = (props: any) => {
    return <IconCus {...props} type='FontAwesome' />
}

var FontAwesome5 = (props: any) => {
    return <IconCus {...props} type='FontAwesome5' />
}

var Feather = (props: any) => {
    return <IconCus {...props} type='Feather' />
}
var Entypo = (props: any) => {
    return <IconCus {...props} type='Entypo' />
}

var Fontisto = (props: any) => {
    return <IconCus {...props} type='Fontisto' />
}

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
    Fontisto
}

