import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';
import CacheableImage from 'react-native-cached-image';
import Colors from '../../../constants/Colors';
import { formatTime } from '../../../helper/FormatterHelper';

const ContinueListItem = (props) => {

  let totalWatched = props.last_watched_point/props.duration;
  let remainderToWatch = 1 - totalWatched;

  let totalWatchedFormatted = formatTime(props.last_watched_point);
  let durationFormatted = formatTime(props.duration);

  if (props.mode == 1) {
    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={props.onPress}>
          <View style={{backgroundColor: Colors.luveresumebrown}}>
            <CacheableImage activityIndicatorProps={{color:'white',style: {backgroundColor:'transparent'} }} resizeMode='cover' source={{uri: props.cover_long || undefined}} style={styles.imageStyle}>
              <View style={{flex:1}}>
              </View>

              <View style={styles.duration}>
                <Text style={styles.durationText}>{totalWatchedFormatted}/{durationFormatted}</Text>
              </View>
              <View style={styles.caption1}>
                <View style={[styles.progressBar,{flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
                  <View style={[styles.progress,{flex:totalWatched}]}></View>
                  <View style={[styles.progressBar,{flex:remainderToWatch}]}></View>
                </View>
                <Text numberOfLines={2} style={styles.captionText}>{props.title}</Text>
              </View>
            </CacheableImage>
          </View>
        </TouchableOpacity>
      </View>
    )
  } else {
    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={props.onPress}>
          <View style={{backgroundColor: Colors.luveresumebrown}}>
            <CacheableImage activityIndicatorProps={{color:'white',style: {backgroundColor:'transparent'} }} resizeMode='cover' source={{uri: props.cover_long || undefined}} style={styles.imageStyle}>

              <View style={{flex:1}}>
              </View>

              <View style={styles.duration}>
                <Text style={styles.durationText}>{totalWatchedFormatted}/{durationFormatted}</Text>
              </View>

              <View style={styles.caption2}>
                <View style={[styles.progressBar,{flexDirection:'row',justifyContent:'center',alignItems:'center'}]}>
                  <View style={[styles.progress,{flex:totalWatched}]}></View>
                  <View style={[styles.progressBar,{flex:remainderToWatch}]}></View>
                </View>
                <Text numberOfLines={2} style={styles.captionText}>{props.title}</Text>
              </View>
            </CacheableImage>
          </View>
        </TouchableOpacity>
      </View>
    )
  }
};

const styles = StyleSheet.create({
  view: {
    flex: 0.5,
    padding: 2,
    backgroundColor: '#E8E8E8',
  },
  imageStyle: {
    flex: 1,
    width: undefined,
    height: 164,
    backgroundColor: Colors.luveresumebrown,
    flexDirection: 'column',
  },
  caption1: {
    height: 55,
    backgroundColor: '#DDD0C0',
  },
  caption2: {
    height: 55,
    backgroundColor: Colors.luveresumebrown,
  },
  captionText: {
    marginTop: 16,
    marginBottom: 16,
    marginLeft: 16,
    marginRight: 16,
    fontSize: 13,
  },
  progressBar: {
    height: 2,
    backgroundColor: '#2C2C2D'
  },
  progress: {
    height: 2,
    backgroundColor: '#D0021B'
  },
  duration: {
    paddingRight: 4,
    paddingBottom: 2,
    alignItems:'flex-end',
    backgroundColor:'transparent',
  },
  durationText: {
    fontSize:14,
    color:'white',
    textShadowColor: 'black',
    textShadowOffset:{width:2,height:2},
    textShadowRadius: 3,
    paddingRight: 2,
  }
});

export default ContinueListItem;
