import React, {useState} from 'react';
import {
  Image,
  Modal,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import {Image as ImageCP} from 'react-native-image-crop-picker';
import ImageZoom from 'react-native-image-pan-zoom';
import {height, width} from '../Constants';
import {ButtonCus} from './buttonCustom';
import {Ionicons} from './iconCustom';

interface ShowImage {
  image: ImageCP | null;
  modalShowImageVisible: boolean;
  closeModalShowImg(): void;
  setShowImg(img: ImageCP | null): void;
  deleteImg?(img: ImageCP | null): void;
}

export const ShowImage: React.FC<ShowImage> = ({
  image,
  modalShowImageVisible,
  closeModalShowImg,
  setShowImg,
  deleteImg,
}) => {
  const [showControls, setShowControls] = useState(false);

  const handleShowControls = () => {
    showControls ? setShowControls(false) : setShowControls(true);
  };

  const deleteImage = () => {
    deleteImg ? deleteImg(image) : null;
    closeModalShowImg();
    setShowImg(null);
    setShowControls(false);
  };

  const goBack = () => {
    closeModalShowImg();
    setShowImg(null);
    setShowControls(false);
  };

  return (
    <Modal
      visible={modalShowImageVisible}
      animationType="fade"
      statusBarTranslucent={true}>
      <ScrollView
        contentContainerStyle={{
          flexGrow: 1,
          justifyContent: 'center',
          backgroundColor: 'black',
        }}
        onScrollEndDrag={({
          nativeEvent,
        }: NativeSyntheticEvent<NativeScrollEvent>) => {
          const scrolledTop = nativeEvent.contentOffset.y <= 0;
          if (scrolledTop) {
            goBack();
          }
        }}
        showsVerticalScrollIndicator={false}>
        <TouchableWithoutFeedback onPress={handleShowControls}>
          <ImageZoom
            cropWidth={width}
            cropHeight={height}
            imageWidth={width}
            imageHeight={height}>
            <Image
              source={{uri: image?.path}}
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </ImageZoom>
        </TouchableWithoutFeedback>
      </ScrollView>
      {showControls && (
        <ButtonCus
          style={{
            paddingBottom: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
            position: 'absolute',
            top: 30,
          }}
          onPress={goBack}>
          <Ionicons name="close-circle" size={25} color="white" />
        </ButtonCus>
      )}
      {showControls && deleteImg && (
        <ButtonCus
          style={{
            paddingBottom: 12,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: 5,
            position: 'absolute',
            top: 30,
            right: 15,
          }}
          onPress={deleteImage}>
          <Ionicons name="trash" size={20} color="white" />
        </ButtonCus>
      )}
    </Modal>
  );
};
