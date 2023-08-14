import React from 'react';
import {
  Modal,
  StyleSheet,
  View,
} from 'react-native';
import {px5, width} from '../Constants';
import {Color} from '../Utils';
import {ButtonCus} from './buttonCustom';
import {FontCustom, TextCus} from './textCustom';
import {translate} from '../Language';
import {store} from '../Redux';

interface ModalOptionImgPickerCusProps {
  modalPickerVisible: boolean;
  closeModalPicker(): void;
  takePhoto(): void;
  pickFromLibrary(): void;
}

const ModalOptionImgPickerCus: React.FC<ModalOptionImgPickerCusProps> = ({
  modalPickerVisible,
  closeModalPicker,
  takePhoto,
  pickFromLibrary,
}) => {
  return (
    <Modal
      visible={modalPickerVisible}
      transparent={true}
      animationType="fade"
      statusBarTranslucent={true}>
      <ButtonCus
        children={
          <View style={styles.modalBackground}>
            <ButtonCus
              children={
                <View style={styles.modalPicker}>
                  <View style={styles.imgPicker}>
                    <ButtonCus
                      style={styles.takePhoto}
                      children={
                        <TextCus
                          children={translate(
                            'takePhoto',
                            store.getState().globalReducer.language,
                          )}
                          style={styles.modalImageText}
                        />
                      }
                      isOpacity
                      onPress={takePhoto}
                    />
                    <View style={styles.underlinePicker}></View>
                    <ButtonCus
                      style={styles.libraryPhoto}
                      children={
                        <TextCus
                          children={translate(
                            'pickFromLib',
                            store.getState().globalReducer.language,
                          )}
                          style={styles.modalImageText}
                        />
                      }
                      isOpacity
                      onPress={pickFromLibrary}
                    />
                  </View>
                  <ButtonCus
                    style={styles.cancel}
                    children={
                      <TextCus
                        children={translate(
                          'cancel',
                          store.getState().globalReducer.language,
                        )}
                        style={styles.modalImageText}
                      />
                    }
                    isOpacity
                    onPress={closeModalPicker}
                  />
                </View>
              }
              onPress={() => {}}
            />
          </View>
        }
        onPress={closeModalPicker}
      />
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: px5 * 10,
  },
  modalPicker: {
    height: px5 * 32,
    width: width / 1.1,
  },
  imgPicker: {
    height: px5 * 20,
    backgroundColor: '#fff',
    borderRadius: px5,
    marginBottom: px5 * 2,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {
    height: px5 * 10,
    backgroundColor: '#fff',
    borderRadius: px5,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePhoto: {
    height: px5 * 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.1,
  },
  underlinePicker: {
    width: width / 1.3,
    borderBottomWidth: 1,
    borderColor: Color.borderGray,
  },
  libraryPhoto: {
    height: px5 * 10,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.1,
  },
  modalImageText: {
    fontFamily: FontCustom.Roboto_Regular,
  },
});

export {ModalOptionImgPickerCus};
