import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const TrendListItem = (props) => {
  let src = null;

  return (
    <View style={styles.rowStyle}>
      <TouchableOpacity onPress={props.onPress}>
        <Image source={{uri: props.cover_wide}} style={styles.imageStyle}>
          <Image source={require('../../../assets/imgs/overlay_4.png')} style={styles.overlay}>
            <View>
            <Text style={styles.textStyle}>{props.title}</Text>
            <Text style={styles.smallTextStyle}>{props.count} videos</Text>
            </View>
          </Image>
        </Image>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    paddingTop: 6,
    backgroundColor: '#2C2C2D'
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: 220,
    backgroundColor:'transparent',
    flexDirection: 'column',
    alignItems: 'center',
    justifyContent: 'center',
    resizeMode: 'cover',
  },
  overlay: {
    backgroundColor:'transparent',
    resizeMode: 'cover',
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
    paddingTop: 10,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 16
  },
  smallTextStyle: {
    paddingTop: 5,
    textAlign: 'center',
    color: '#FFFFFF',
    fontSize: 12,
  },
  iconStyle: {
    flex: 1,
  },
  playButtonStyle: {
    flex: 1,
    width: undefined,
    marginTop: 10,
    marginRight: 10,
  }
})

export default TrendListItem
