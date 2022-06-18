import React, {ReactNode} from 'react';
import {SafeAreaView, View} from 'react-native';
import {Ionicons} from './iconCustom';
import LinearGradient from 'react-native-linear-gradient';
import {headerHeight, width} from '../Constants';
import {hasNotch} from '../Utils/helper';
import {goBack} from '../Navigations/rootNavigations';
import {FontCustom, TextCus} from './textCustom';
import {ButtonCus} from './buttonCustom';
import {Color} from '../Utils';

interface HeaderCus {
  isBack?: boolean;
  isClose?: boolean;
  rightComponent?: ReactNode;
  backgroundGradient?: boolean;
  clearForm?(): void;
  title?: string;
  styleContainer?: {};
  styleTitle?: {};
  styleIconBack?: {};
  styleIconClose?: {};
  styleRightComponent?: {};
}

export const HeaderCus: React.FC<HeaderCus> = ({
  isBack = false,
  isClose = false,
  rightComponent = null,
  backgroundGradient = true,
  clearForm,
  title,
  styleContainer,
  styleTitle,
  styleIconBack,
  styleIconClose,
  styleRightComponent,
}) => {
  const props = {
    isBack,
    isClose,
    rightComponent,
    backgroundGradient,
    clearForm,
    title,
    styleContainer,
    styleTitle,
    styleIconBack,
    styleIconClose,
    styleRightComponent,
  };

  const goback = () => {
    clearForm ? clearForm() : null;
    goBack();
  };

  const _render = (props: any) => {
    var title = props.title || '';
    return (
      <View
        style={{
          height: headerHeight,
          width,
          justifyContent: 'center',
        }}>
        {props.children != null ? (
          props.children
        ) : (
          <TextCus
            style={[
              {
                fontSize: 18,
                textAlign: 'center',
                fontFamily: FontCustom.Roboto_Bold,
                paddingHorizontal: 60,
              },
              props.styleTitle,
            ]}
            numberOfLines={1}>
            {title}
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
            {props.isBack ? (
              <ButtonCus
                style={{
                  backgroundColor: Color.transparent,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={goback}>
                <Ionicons
                  icon="chevron-back"
                  size={25}
                  color={Color.baseText}
                  style={props.styleIconBack}
                />
              </ButtonCus>
            ) : null}
            {props.isClose ? (
              <ButtonCus
                style={{
                  backgroundColor: Color.transparent,
                  justifyContent: 'center',
                  alignItems: 'center',
                }}
                onPress={goback}>
                <Ionicons
                  icon="close"
                  size={25}
                  color={Color.baseText}
                  style={props.styleIconClose}
                />
              </ButtonCus>
            ) : null}
          </View>
          {props.rightComponent != null && (
            <View
              style={[
                {
                  position: 'absolute',
                  right: 10,
                  justifyContent: 'center',
                },
                props.styleRightComponent,
              ]}>
              {props.rightComponent}
            </View>
          )}
        </>
      </View>
    );
  };

  return (
    <SafeAreaView>
      {backgroundGradient ? (
        <LinearGradient
          start={{x: 0, y: 0}}
          end={{x: 1, y: 0}}
          colors={[Color.white, '#516ac5']}
          style={[
            {
              width: '100%',
              paddingTop: hasNotch() ? 0 : 5,
            },
            styleContainer,
          ]}>
          {_render(props)}
        </LinearGradient>
      ) : (
        <View
          style={[
            {
              width: '100%',
              paddingTop: hasNotch() ? 0 : 5,
            },
            styleContainer,
          ]}>
          {_render(props)}
        </View>
      )}
    </SafeAreaView>
  );
};
