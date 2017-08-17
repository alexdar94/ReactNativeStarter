import React from 'react';
import {
  Dimensions,
  Text,
  StyleSheet,
} from 'react-native';

const { width, height } = Dimensions.get('window');
const flattenStyle = StyleSheet.flatten;
const realWidth = height > width ? width : height;

const ResponsiveText = ({ style, children, ...props }) => {
  const fontSize = flattenStyle(style).fontSize || 14;
  const scaledFontSize = Math.round(fontSize * realWidth / 375);

  return (
    <Text style={[style, { fontSize: scaledFontSize }]} {...props}>
      {children}
    </Text>
  );
};

ResponsiveText.defaultProps = {
  style: {}
};

export default ResponsiveText;
