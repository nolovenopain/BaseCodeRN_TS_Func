import React, {ReactNode} from 'react';
import {Platform, View} from 'react-native';
import {Ionicons} from './iconCustom';
import LinearGradient from 'react-native-linear-gradient';
import {headerHeight, statusHeight, width} from '../Constants';
import {goBack} from '../Navigations/rootNavigations';
import {FontCustom, TextCus} from './textCustom';
import {ButtonCus} from './buttonCustom';
import {Color} from '../Utils';

interface HeaderCus {
  isBack?: boolean;
  isClose?: boolean;
  rightComponent?: ReactNode;
  leftComponent?: ReactNode;
  backgroundGradient?: boolean;
  clearForm?(): void;
  title?: string;
  styleContainer?: {};
  styleTitle?: {};
  styleIconBack?: {};
  styleIconClose?: {};
  styleRightComponent?: {};
  styleLeftComponent?: {};
  children?: ReactNode;
}

export const HeaderCus: React.FC<HeaderCus> = ({
  isBack = false,
  isClose = false,
  rightComponent = null,
  leftComponent = null,
  backgroundGradient = true,
  clearForm,
  title,
  styleContainer,
  styleTitle,
  styleIconBack,
  styleIconClose,
  styleRightComponent,
  styleLeftComponent,
  children,
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
          marginTop: Platform.OS == 'ios' ? statusHeight : 5,
        }}>
        {children ? (
          children
        ) : (
          <TextCus
            style={[
              {
                fontSize: 18,
                textAlign: 'center',
                fontFamily: FontCustom.Roboto_Bold,
                paddingHorizontal: 60,
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
                }}
                onPress={goback}>
                <Ionicons
                  name="chevron-back"
                  size={25}
                  color={Color.baseText}
                  style={styleIconBack}
                />
              </ButtonCus>
            ) : null}
            {isClose ? (
              <ButtonCus
                style={{
                  backgroundColor: Color.transparent,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={goback}>
                <Ionicons
                  name="close"
                  size={25}
                  color={Color.baseText}
                  style={styleIconClose}
                />
              </ButtonCus>
            ) : null}
          </View>
          {leftComponent != null && (
            <View
              style={[
                {
                  position: 'absolute',
                  left: 10,
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
                  right: 10,
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
      {backgroundGradient ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Color.white, '#516ac5']}
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
