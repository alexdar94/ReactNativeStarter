import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryMenuSmallItem = (props) => {
  let src = null;

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={{uri: props.cover_long}} style={styles.imageStyle} />
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    paddingTop: 6,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#2C2C2D'
  },
  imageStyle: {
    flex: 1,
    width: 160,
    height: 160,
    backgroundColor:'transparent',
    flexDirection: 'column',
    resizeMode: 'cover',
  },
});

export default CategoryMenuSmallItem
