import React, {useEffect, useRef} from 'react';
import {Animated, StyleProp, ViewStyle} from 'react-native';
import {Color} from '../Utils';

interface SkeletonProps {
  variant?: 'box' | 'circle';
  width: string | number;
  height: number;
  style?: StyleProp<ViewStyle>;
}

export const Skeleton: React.FC<SkeletonProps> = ({
  width,
  height,
  variant = 'box',
  style,
}) => {
  const opacity = useRef(new Animated.Value(0.3));

  var borderRadius = 0;

  if (variant === 'circle') {
    borderRadius =
      typeof height == 'string' ? parseInt(height, 10) / 2 : height / 2;
  }

  useEffect(() => {
    Animated.loop(
      Animated.sequence([
        Animated.timing(opacity.current, {
          toValue: 1,
          useNativeDriver: true,
          duration: 500,
        }),
        Animated.timing(opacity.current, {
          toValue: 0.3,
          useNativeDriver: true,
          duration: 800,
        }),
      ]),
    ).start();
  }, [opacity]);

  return (
    <Animated.View
      style={[
        {
          opacity: opacity.current,
          height,
          width,
          backgroundColor: Color.contentLoading,
          borderRadius: borderRadius,
        },
        style,
      ]}
    />
  );
};
