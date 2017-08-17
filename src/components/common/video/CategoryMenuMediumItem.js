import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const CategoryMenuMediumItem = (props) => {
  let src = null;

  return (
    <View style={styles.container}>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={{uri: props.cover_square}} style={styles.imageStyle}>
          <View style={styles.topSide}>
            <Image style={styles.playButtonStyle} source={require('../../../assets/imgs/luve-icon.png')} />
          </View>
          <Image source={require('../../../assets/imgs/overlay_1.png')} style={styles.bottomSide}>
            <Text style={styles.textStyle}>{props.title}{"\n"}Episode 5 • 5 mins</Text>
          </Image>
        </Image>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingTop: 6,
    paddingLeft: 3,
    paddingRight: 3,
    backgroundColor: '#2C2C2D'
  },
  topSide: {
    flex: 1,
    alignItems: 'flex-end',
  },
  bottomSide: {
    flex: 1,
    height: undefined,
    width: undefined,
    justifyContent: 'flex-end',
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: 160,
    backgroundColor:'transparent',
    flexDirection: 'column'
  },
  textStyle: {
    paddingBottom: 5,
    paddingLeft: 10,
    color: '#FFFFFF',
    fontSize: 13,
  },
  iconStyle: {
    flex: 1,
  },
  playButtonStyle: {
    width: 25,
    marginTop: 10,
    marginRight: 10,
  }
});

export default CategoryMenuMediumItem
