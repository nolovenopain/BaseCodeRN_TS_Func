import React, {useState, useEffect} from 'react';
import {
  ActivityIndicator,
  Image as ImageRN,
  StyleSheet,
  View,
} from 'react-native';
import FastImage, {FastImageProps, ImageStyle} from 'react-native-fast-image';
import {px5} from '../Constants';
import Config from 'react-native-config';
import {NoThumb} from './noThumb';
import {Color} from '../Utils';

interface ImageCusProps extends FastImageProps {
  source: any;
  autoHeight?: boolean;
  indicatorSize?: number | 'small' | 'large' | undefined;
  indicatorColor?: string;
  iconSizeNoImg?: number;
}

export const ImageCus: React.FC<ImageCusProps> = ({
  source = null,
  autoHeight = false,
  style,
  indicatorSize = 'small',
  indicatorColor = 'rgba(0,0,0,0.4)',
  resizeMode = 'contain',
  iconSizeNoImg,
  ...props
}) => {
  const genericUri = (uri: string) => {
    if (!uri.startsWith('https')) {
      if (uri.startsWith('/')) {
        uri = uri.replace('/', '');
      } else if (
        Config.IMAGE_BASE_URL &&
        uri.startsWith(Config.IMAGE_BASE_URL)
      ) {
        uri = uri.replace(Config.IMAGE_BASE_URL, '');
      }
      uri = Config.IMAGE_BASE_URL + uri;
    }
    return uri;
  };

  const [src, setSrc] = useState<any>(source);
  const [isLoaded, setIsLoaded] = useState<boolean>(false);
  const [isError, setIsError] = useState<boolean>(false);
  const [width, setWidth] = useState<number>(px5 * 12);
  const [height, setHeight] = useState<number>(px5 * 12);

  useEffect(() => {
    let isMounted = true;
    isMounted && loading();
    return () => {
      isMounted = false;
    };
  }, [source]);

  const loading = () => {
    try {
      if (source.constructor == Number) {
        setIsLoaded(true);
        setIsError(false);
        setSrc(source);
      } else if (source.uri.constructor == String) {
        var uri = genericUri(source.uri);
        setSrc({uri, priority: FastImage.priority.high});

        ImageRN.prefetch(uri).then(
          status => {
            if (autoHeight) {
              ImageRN.getSize(uri, (w, h) => {
                console.log(w, h);
                setIsLoaded(status);
                setIsError(false);
                setWidth(w);
                setHeight(h);
              });
            } else {
              setIsLoaded(status);
              setIsError(false);
            }
          },
          error => {
            setIsError(true);
          },
        );
      }
    } catch (error) {
      setIsError(true);
    }
  };

  var styleCus = StyleSheet.flatten<ImageStyle>(style);

  return isError ? (
    <NoThumb
      backgroundColor={Color.borderInput}
      styleViewCus={{
        width: styleCus.width,
        height: styleCus.height,
        ...styleCus,
      }}
      iconSize={iconSizeNoImg}
    />
  ) : !isLoaded ? (
    <View
      style={{
        width: styleCus.width,
        height: styleCus.height,
        justifyContent: 'center',
        alignItems: 'center',
      }}>
      <ActivityIndicator color={indicatorColor} size={indicatorSize} />
    </View>
  ) : (
    <FastImage
      {...props}
      resizeMode={resizeMode}
      style={styleCus}
      source={src}
    />
  );
};
