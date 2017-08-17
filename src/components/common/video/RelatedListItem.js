import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import {
  LazyloadView,
  LazyloadImage
} from 'react-native-lazyload';
import CacheableImage from 'react-native-cached-image'

const RelatedListItem = (props) => {
  let imageToLoad = undefined;
  if( props.cover_wide != undefined && props.cover_wide != null && props.cover_wide.length > 0 ) {
    imageToLoad = props.cover_wide;
  }
  if( props.lazyload ) {
    return (
      <LazyloadView host={props.host} style={styles.container}>
        <TouchableOpacity style={styles.innercontainer} onPress={props.onPress}>
          <CacheableImage defaultSource={require('../../../assets/imgs/luvevideoplaceholder.png')} host={props.host} source={{uri: imageToLoad}} style={styles.imageStyle}>

          </CacheableImage>
        </TouchableOpacity>
          <View style={styles.caption}>
            <Text style={styles.textStyle}>{props.title}</Text>
          </View>
      </LazyloadView>
    )
  } else {
    console.log('Returning normal view');
    return (
      <View style={styles.container}>
        <TouchableOpacity style={styles.innercontainer} onPress={props.onPress}>
          <Image host={props.host} defaultSource={require('../../../assets/imgs/luvevideoplaceholder.png')} source={{uri: imageToLoad}} style={styles.imageStyle}>

          </Image>
        </TouchableOpacity>
          <View style={styles.caption}>
            <Text style={styles.textStyle}>{props.title}</Text>
          </View>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding:5,
    backgroundColor: 'transparent'
  },
  innercontainer: {
    flex: 1,
    padding:0,
    backgroundColor: 'transparent'
  },
  topSide: {
    flex: 1,
    alignItems: 'flex-end',
  },
  imageStyle: {
    flex: 1,
    height: 160,
    width: undefined,
    backgroundColor:'#00CADC',
    flexDirection: 'column',
    resizeMode: 'cover',
  },
  caption: {
    flex: 1,
    backgroundColor: '#2C2C2D',
    minHeight: 50,
    alignItems: 'center',
    justifyContent: 'center',
  },
  textStyle: {
//    paddingBottom: 5,
    alignSelf: 'center',
//    justifyContent: 'center',
    textAlignVertical: 'center',
//    paddingLeft: 10,
    color: '#FFFFFF',
    fontSize: 13,
    lineHeight: 13,
  },
  iconStyle: {
    flex: 1,
  },
  playButtonStyle: {
    width: 25,
    marginTop: 10,
    marginRight: 10,
  },
});

export default RelatedListItem;
