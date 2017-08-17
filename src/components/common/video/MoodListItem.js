import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const MoodListItem = (props) => {
  let src = null;

  return (
    <View style={styles.view}>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={{uri: props.cover_long}} style={styles.imageStyle}>
          <Text style={styles.textStyle}>{props.title}</Text>
        </Image>
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
    width: undefined,
    height: 160,
    backgroundColor:'transparent',
    flexDirection: 'column',
    alignItems:'center',
    justifyContent:'center',
    resizeMode: 'cover',
  },
  textStyle: {
    color: '#FFFFFF',
    fontSize: 12,
    textShadowColor: '#000000',
    textShadowOffset: {width: 0, height: 2},
    textShadowRadius: 1
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

export default MoodListItem
