import React from 'react';
import {
  Modal,
  StyleSheet,
  TouchableOpacity,
  TouchableWithoutFeedback,
  View,
} from 'react-native';
import {width} from '../Constants';
import {Color} from '../Utils';
import {FontCustom, TextCus} from './textCustom';

interface ModalOptionImgPickerCus {
  modalPickerVisible: boolean;
  closeModalPicker: () => void;
  takePhoto: () => void;
  pickFromLibrary: () => void;
}

const ModalOptionImgPickerCus: React.FC<ModalOptionImgPickerCus> = ({
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
      <TouchableWithoutFeedback onPress={closeModalPicker}>
        <View style={styles.modalBackground}>
          <TouchableWithoutFeedback onPress={() => {}}>
            <View style={styles.modalPicker}>
              <View style={styles.imgPicker}>
                <TouchableOpacity style={styles.takePhoto} onPress={takePhoto}>
                  <TextCus children="Chụp ảnh" style={styles.modalImageText} />
                </TouchableOpacity>
                <View style={styles.underlinePicker}></View>
                <TouchableOpacity
                  style={styles.libraryPhoto}
                  onPress={pickFromLibrary}>
                  <TextCus
                    children="Chọn ảnh có sẵn"
                    style={styles.modalImageText}
                  />
                </TouchableOpacity>
              </View>
              <TouchableOpacity
                style={styles.cancel}
                onPress={closeModalPicker}>
                <TextCus children="Huỷ" style={styles.modalImageText} />
              </TouchableOpacity>
            </View>
          </TouchableWithoutFeedback>
        </View>
      </TouchableWithoutFeedback>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalBackground: {
    alignItems: 'center',
    backgroundColor: 'rgba(0,0,0,0.4)',
    flex: 1,
    justifyContent: 'flex-end',
    paddingBottom: 20,
  },
  modalPicker: {
    height: 160,
    width: width / 1.1,
  },
  imgPicker: {
    height: 100,
    backgroundColor: '#fff',
    borderRadius: 10,
    marginBottom: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  cancel: {
    height: 50,
    backgroundColor: '#fff',
    borderRadius: 10,
    justifyContent: 'center',
    alignItems: 'center',
  },
  takePhoto: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.1,
  },
  underlinePicker: {
    width: width / 1.3,
    borderBottomWidth: 0.5,
    borderColor: Color.borderGray,
  },
  libraryPhoto: {
    height: 50,
    justifyContent: 'center',
    alignItems: 'center',
    width: width / 1.1,
  },
  modalImageText: {
    fontFamily: FontCustom.Roboto_Regular,
  },
});

export {ModalOptionImgPickerCus};
