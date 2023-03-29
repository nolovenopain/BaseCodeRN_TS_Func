import React, {ReactNode} from 'react';
import {ScrollView, StyleProp, TextStyle, View, ViewStyle} from 'react-native';
import ReactNativeModal from 'react-native-modal';
import {Color} from '../Utils';
import {ButtonCus} from './buttonCustom';
import {TextCus} from './textCustom';
import * as animatable from 'react-native-animatable';
import {font16, height, px5, width} from '../Constants';

interface ModalCusProps {
  modalVisible: boolean;
  cancel?(): void;
  confirm?(): void;
  modalTitle?: string;
  modalHeader?: ReactNode;
  modalContent: ReactNode;
  modalFooter?: ReactNode;
  cancelTitle?: string | null;
  confirmTitle?: string;
  styleButtonCancel?: StyleProp<ViewStyle>;
  styleTextButtonCancel?: StyleProp<TextStyle>;
  styleButtonConfirm?: StyleProp<ViewStyle>;
  styleTextButtonConfirm?: StyleProp<TextStyle>;
  styleModalTitle?: StyleProp<TextStyle>;
  styleContainer?: StyleProp<ViewStyle>;
  scrollEnabled?: boolean;
  animationIn?:
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInUp'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutUp'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'slideInDown'
    | 'slideInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideOutDown'
    | 'slideOutUp'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInUp'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutUp'
    | 'zoomOutLeft'
    | 'zoomOutRight'
    | animatable.CustomAnimation<
        import('react-native').TextStyle &
          ViewStyle &
          import('react-native').ImageStyle
      >;
  animationOut?:
    | 'bounce'
    | 'flash'
    | 'jello'
    | 'pulse'
    | 'rotate'
    | 'rubberBand'
    | 'shake'
    | 'swing'
    | 'tada'
    | 'wobble'
    | 'bounceIn'
    | 'bounceInDown'
    | 'bounceInUp'
    | 'bounceInLeft'
    | 'bounceInRight'
    | 'bounceOut'
    | 'bounceOutDown'
    | 'bounceOutUp'
    | 'bounceOutLeft'
    | 'bounceOutRight'
    | 'fadeIn'
    | 'fadeInDown'
    | 'fadeInDownBig'
    | 'fadeInUp'
    | 'fadeInUpBig'
    | 'fadeInLeft'
    | 'fadeInLeftBig'
    | 'fadeInRight'
    | 'fadeInRightBig'
    | 'fadeOut'
    | 'fadeOutDown'
    | 'fadeOutDownBig'
    | 'fadeOutUp'
    | 'fadeOutUpBig'
    | 'fadeOutLeft'
    | 'fadeOutLeftBig'
    | 'fadeOutRight'
    | 'fadeOutRightBig'
    | 'flipInX'
    | 'flipInY'
    | 'flipOutX'
    | 'flipOutY'
    | 'lightSpeedIn'
    | 'lightSpeedOut'
    | 'slideInDown'
    | 'slideInUp'
    | 'slideInLeft'
    | 'slideInRight'
    | 'slideOutDown'
    | 'slideOutUp'
    | 'slideOutLeft'
    | 'slideOutRight'
    | 'zoomIn'
    | 'zoomInDown'
    | 'zoomInUp'
    | 'zoomInLeft'
    | 'zoomInRight'
    | 'zoomOut'
    | 'zoomOutDown'
    | 'zoomOutUp'
    | 'zoomOutLeft'
    | 'zoomOutRight'
    | animatable.CustomAnimation<
        import('react-native').TextStyle &
          ViewStyle &
          import('react-native').ImageStyle
      >;
}

export const ModalCus: React.FC<ModalCusProps> = ({
  modalVisible,
  cancel,
  confirm,
  modalTitle,
  modalHeader,
  modalContent,
  modalFooter,
  cancelTitle,
  confirmTitle,
  styleModalTitle,
  styleButtonCancel,
  styleTextButtonCancel,
  styleButtonConfirm,
  styleTextButtonConfirm,
  styleContainer,
  scrollEnabled = false,
  animationIn = 'bounceIn',
  animationOut,
}) => {
  const contentStyle = {
    backgroundColor: Color.white,
    borderRadius: px5 * 3,
    width: width - px5 * 6,
  };

  const renderContent = () => {
    return (
      <View style={scrollEnabled ? {} : contentStyle}>
        {modalHeader}
        {modalTitle && (
          <TextCus
            children={modalTitle}
            style={[
              {
                fontWeight: 'bold',
                color: Color.yellow,
                fontSize: font16,
                marginBottom: px5 * 5,
                marginTop: px5 * 4,
                textAlign: 'center',
              },
              styleModalTitle,
            ]}
          />
        )}
        {modalContent}
        <View
          style={{
            flexDirection: cancelTitle ? 'row' : 'column',
            width: '100%',
            paddingHorizontal: px5 * 4,
            alignItems: 'center',
            justifyContent: 'space-between',
          }}>
          {cancelTitle && (
            <ButtonCus
              children={cancelTitle}
              onPress={cancel ? cancel : () => {}}
              style={[
                {
                  width: '48%',
                  borderRadius: px5 * 3,
                },
                styleButtonCancel,
              ]}
              styleText={[
                {color: Color.green, fontWeight: 'bold'},
                styleTextButtonCancel,
              ]}
            />
          )}
          {confirmTitle && (
            <ButtonCus
              children={confirmTitle}
              onPress={confirm ? confirm : () => {}}
              style={[
                {
                  backgroundColor: Color.green,
                  width: '48%',
                  borderRadius: px5 * 3,
                },
                styleButtonConfirm,
              ]}
              styleText={[
                {color: Color.white, fontWeight: 'bold'},
                styleTextButtonConfirm,
              ]}
            />
          )}
          {modalFooter}
        </View>
      </View>
    );
  };

  return (
    <ReactNativeModal
      avoidKeyboard
      isVisible={modalVisible}
      animationIn={animationIn}
      animationOut={animationOut}
      style={[{alignItems: 'center', margin: 0}, styleContainer]}>
      <View
        style={{
          width: '100%',
          alignItems: 'center',
          maxHeight: height * 0.9,
        }}>
        {scrollEnabled ? (
          <ScrollView
            scrollEnabled={true}
            contentContainerStyle={contentStyle}
            showsHorizontalScrollIndicator={false}
            showsVerticalScrollIndicator={false}>
            {renderContent()}
          </ScrollView>
        ) : (
          renderContent()
        )}
      </View>
    </ReactNativeModal>
  );
};
