import React, {useState} from 'react';
import {
  Modal,
  ScrollView,
  NativeScrollEvent,
  NativeSyntheticEvent,
  TouchableWithoutFeedback,
} from 'react-native';
import {Image as ImageCP} from 'react-native-image-crop-picker';
import ImageZoom from 'react-native-image-pan-zoom';
import {height, iconSize24, px5, width} from '../Constants';
import {ButtonCus} from './buttonCustom';
import {Ionicons} from './iconCustom';
import {ImageCus} from './imageCustom';

interface ShowImage {
  image: ImageCP | number | string | null | undefined;
  modalShowImageVisible: boolean;
  closeModalShowImg(): void;
  setShowImg?(img: ImageCP | number | string | null | undefined): void;
  deleteImg?(img: ImageCP | number | string | null | undefined): void;
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
    deleteImg && typeof image != 'number' ? deleteImg(image) : null;
    closeModalShowImg();
    setShowImg ? setShowImg(null) : null;
    setShowControls(false);
  };

  const goBack = () => {
    closeModalShowImg();
    setShowImg ? setShowImg(null) : null;
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
            <ImageCus
              source={
                typeof image === 'number'
                  ? image
                  : {uri: typeof image === 'string' ? image : image?.path}
              }
              style={{width: '100%', height: '100%'}}
              resizeMode="contain"
            />
          </ImageZoom>
        </TouchableWithoutFeedback>
      </ScrollView>
      {showControls && (
        <ButtonCus
          style={{
            paddingBottom: px5 * 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: px5 * 3,
            position: 'absolute',
            top: px5 * 12,
          }}
          children={
            <Ionicons
              name="close-circle"
              size={(iconSize24 * 25) / 24}
              color="white"
            />
          }
          onPress={goBack}
        />
      )}
      {showControls && deleteImg && (
        <ButtonCus
          style={{
            paddingBottom: px5 * 2,
            justifyContent: 'center',
            alignItems: 'center',
            marginLeft: px5 * 3,
            position: 'absolute',
            top: px5 * 12,
            right: px5 * 3,
          }}
          children={
            <Ionicons
              name="trash"
              size={(iconSize24 * 22) / 24}
              color="white"
            />
          }
          onPress={deleteImage}
        />
      )}
    </Modal>
  );
};
