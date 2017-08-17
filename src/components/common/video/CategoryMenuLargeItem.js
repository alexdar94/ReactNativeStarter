import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CacheableImage from 'react-native-cached-image'

const CategoryMenuLargeItem = (props) => {
  let src = null;
  return (
    <View style={styles.rowStyle}>
      <TouchableOpacity onPress={props.onPress}>
        <CacheableImage resizeMode='cover' source={{uri: props.cover_wide}} style={styles.imageStyle}>

          <View style={styles.topSide}>
            <TouchableOpacity onPress={props.onPressShare}>
              <Image style={styles.topIcon} source={require('../../../assets/imgs/ic_emo.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressShare}>
              <Image style={styles.topIcon} source={require('../../../assets/imgs/ic_luved.png')} />
            </TouchableOpacity>
          </View>
          <Image source={require('../../../assets/imgs/overlay_1.png')} style={styles.bottomSide}>
            <View style={styles.bottomLeftSide}>
              <Text style={styles.title}>{props.title}</Text>
            </View>
            <View style={styles.bottomRightSide}>
              <TouchableOpacity onPress={props.onPressShare}>
                <Image style={styles.iconFB} source={require('../../../assets/imgs/ic_fb.png')} />
              </TouchableOpacity>
              <TouchableOpacity onPress={props.onPressShare}>
                <Image style={styles.iconLove} source={require('../../../assets/imgs/ic_quickie.png')} />
              </TouchableOpacity>
            </View>
          </Image >
          <View style={styles.emoContainer}>
            <TouchableOpacity onPress={props.onPressShare}>
              <Image style={styles.iconEmo} source={require('../../../assets/imgs/emotional/icon-lol.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressShare}>
              <Image style={styles.iconEmo} source={require('../../../assets/imgs/emotional/icon-sad.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressShare}>
              <Image style={styles.iconEmo} source={require('../../../assets/imgs/emotional/icon-omg.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressShare}>
              <Image style={styles.iconEmo} source={require('../../../assets/imgs/emotional/icon-inspired.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressShare}>
              <Image style={styles.iconEmo} source={require('../../../assets/imgs/emotional/icon-cute.png')} />
            </TouchableOpacity>
            <TouchableOpacity onPress={props.onPressShare}>
              <Image style={styles.iconEmo} source={require('../../../assets/imgs/emotional/icon-wtf.png')} />
            </TouchableOpacity>
          </View>
        </CacheableImage>
      </TouchableOpacity>
    </View>
  )
}

const styles = StyleSheet.create({
  rowStyle: {
    backgroundColor: '#2C2C2D'
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: 250,
    backgroundColor:'transparent',
    flexDirection: 'column',
  },
  topSide: {
    flex: 1,
    paddingTop: 10,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomSide: {
    height: 50,
    width: undefined,
    flexDirection: 'row',
    alignItems: 'flex-end',
    paddingBottom: 10,
    paddingLeft: 20,
    paddingRight: 20,
  },
  bottomLeftSide: {
    flex: 1,
    flexDirection: 'row',
    alignItems: 'flex-end',
  },
  bottomRightSide: {
    width: 80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,

    fontSize: 14,
    marginLeft: 70,

  },
  iconStyle: {
    flex: 1,
  },
  iconPlay: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  iconQuickie: {
    width: 25,
    height: 25,
    resizeMode: 'contain'
  },
  iconFB: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
    marginRight: 10
  },
  iconLove: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  thumb: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 40,
  },
  topIcon: {
    width: 70,
    height: 70,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  emoContainer: {
    position: 'absolute',
    flexDirection: 'row',
    backgroundColor: '#FFFFFF',
    paddingLeft: 5,
    paddingTop: 5,
    paddingRight: 5,
    paddingBottom: 5,
    borderRadius: 25,
    right: 20,
    top: 45,
  },
  iconEmo: {
    width: 45,
    height: 40,
    resizeMode: 'contain',
  }
})

export default CategoryMenuLargeItem
