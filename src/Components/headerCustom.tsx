import React, {ReactNode} from 'react';
import {Platform, StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import {Ionicons} from './iconCustom';
import LinearGradient from 'react-native-linear-gradient';
import {font18, headerHeight, px5, statusHeight, width} from '../Constants';
import {goBack} from '../Navigations/rootNavigations';
import {FontCustom, TextCus} from './textCustom';
import {ButtonCus} from './buttonCustom';
import {Color} from '../Utils';

interface HeaderCusProps {
  isBack?: boolean;
  isClose?: boolean;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  clearForm?(): void;
  title?: string;
  styleContainer?: StyleProp<ViewStyle>;
  styleTitle?: StyleProp<TextStyle>;
  styleIconBack?: StyleProp<TextStyle>;
  styleIconClose?: StyleProp<TextStyle>;
  styleRightComponent?: StyleProp<ViewStyle>;
  styleLeftComponent?: StyleProp<ViewStyle>;
  children?: ReactNode;
  sizeBack?: number;
  colorBack?: string;
  sizeClose?: number;
  colorClose?: string;
  colorGardients?: (string | number)[];
}

export const HeaderCus: React.FC<HeaderCusProps> = ({
  isBack = false,
  isClose = false,
  rightComponent = null,
  leftComponent = null,
  clearForm,
  title,
  styleContainer,
  styleTitle,
  styleIconBack,
  styleIconClose,
  styleRightComponent,
  styleLeftComponent,
  children,
  sizeBack,
  colorBack,
  sizeClose,
  colorClose,
  colorGardients,
}) => {
  const goback = () => {
    clearForm ? clearForm() : null;
    goBack();
  };

  const _render = () => {
    return (
      <View
        style={{
          height: headerHeight,
          width,
          justifyContent: 'center',
          marginTop: Platform.OS == 'ios' ? statusHeight : px5,
        }}>
        {children ? (
          children
        ) : (
          <TextCus
            style={[
              {
                fontSize: font18,
                textAlign: 'center',
                fontFamily: FontCustom.Roboto_Bold,
                paddingHorizontal: px5 * 12,
              },
              styleTitle,
            ]}
            numberOfLines={1}>
            {title ? title : ''}
          </TextCus>
        )}
        <>
          <View
            style={{
              position: 'absolute',
              bottom: 0,
              justifyContent: 'center',
              flexDirection: 'row',
            }}>
            {isBack ? (
              <ButtonCus
                style={{
                  backgroundColor: Color.transparent,
                  justifyContent: 'center',
                  alignItems: 'center',
                  padding: px5 * 2,
                }}
                children={
                  <Ionicons
                    name="chevron-back"
                    size={sizeBack}
                    color={colorBack}
                    style={styleIconBack}
                  />
                }
                onPress={goback}
              />
            ) : null}
            {isClose ? (
              <ButtonCus
                style={{
                  backgroundColor: Color.transparent,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                children={
                  <Ionicons
                    name="close"
                    size={sizeClose}
                    color={colorClose}
                    style={styleIconClose}
                  />
                }
                onPress={goback}
              />
            ) : null}
          </View>
          {leftComponent != null && (
            <View
              style={[
                {
                  position: 'absolute',
                  left: px5 * 2,
                  justifyContent: 'center',
                },
                styleLeftComponent,
              ]}>
              {leftComponent}
            </View>
          )}
          {rightComponent != null && (
            <View
              style={[
                {
                  position: 'absolute',
                  right: px5 * 2,
                  justifyContent: 'center',
                },
                styleRightComponent,
              ]}>
              {rightComponent}
            </View>
          )}
        </>
      </View>
    );
  };

  return (
    <View>
      {colorGardients ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={colorGardients}
          style={[
            {
              width: '100%',
            },
            styleContainer,
          ]}>
          {_render()}
        </LinearGradient>
      ) : (
        <View
          style={[
            {
              width: '100%',
            },
            styleContainer,
          ]}>
          {_render()}
        </View>
      )}
    </View>
  );
};
