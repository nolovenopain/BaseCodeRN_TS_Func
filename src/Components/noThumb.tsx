import {View, ViewStyle} from 'react-native';
import {iconSize24} from '../Constants';
import {FontAwesome} from './iconCustom';
import {Color} from '../Utils';

interface NoThumbProps {
  width?: string | number;
  height?: string | number;
  backgroundColor?: string;
  styleViewCus?: ViewStyle;
  iconSize?: number;
  iconColor?: string;
}

export const NoThumb: React.FC<NoThumbProps> = ({
  width = '100%',
  height = '100%',
  styleViewCus,
  backgroundColor,
  iconSize = iconSize24 * 4,
  iconColor = Color.noThumb,
}) => {
  return (
    <View
      style={[
        {
          width,
          height,
          backgroundColor,
          alignItems: 'center',
          justifyContent: 'center',
        },
        styleViewCus,
      ]}>
      <FontAwesome name="picture-o" size={iconSize} color={iconColor} />
    </View>
  );
};
