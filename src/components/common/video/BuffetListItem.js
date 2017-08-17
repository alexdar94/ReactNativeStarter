import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import CacheableImage from 'react-native-cached-image'

var imageWidth = Math.round(Dimensions.get('window')/2)-8;

class BuffetListItem extends Component {
  render() {
    let src = null;
    switch (this.props.id) {
      case 1:
        src = require('../../../assets/imgs/buffet/movie.jpg')
        break;
      case 2:
        src = require('../../../assets/imgs/buffet/tvseries.jpg')
        break;

      case 3:
        src = require('../../../assets/imgs/buffet/beauty.jpg')
        break;

      case 4:
        src = require('../../../assets/imgs/buffet/sport.jpg')
        break;

      case 5:
        src = require('../../../assets/imgs/buffet/workout.jpg')
        break;

      case 6:
        src = require('../../../assets/imgs/buffet/music.jpg')
        break;

      case 7:
        src = require('../../../assets/imgs/buffet/gaming.jpg')
        break;

      case 8:
        src = require('../../../assets/imgs/buffet/food.jpg')
        break;

      case 9:
        src = require('../../../assets/imgs/buffet/comedy.jpg')
        break;

      case 10:
        src = require('../../../assets/imgs/buffet/info&news.jpg')
        break;

      case 11:
        src = require('../../../assets/imgs/buffet/edu.jpg')
        break;

      case 12:
        src = require('../../../assets/imgs/buffet/popculture.jpg')
        break;

      default:
        src = require('../../../assets/imgs/buffet/workout.jpg')
    }

    if (this.props.mode == 1) {
      return (
        <View style={styles.view}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image
              source={src}
              style={styles.imageStyle}>
              <View style={{backgroundColor:'transparent', flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:'white', opacity:0.9, fontSize: 28}}>{this.props.title}</Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>
      )
    } else {
      return (
        <View style={styles.view}>
          <TouchableOpacity onPress={this.props.onPress}>
            <Image
              source={src}
              style={styles.imageStyle}>
              <View style={{backgroundColor:'transparent', flex:1, justifyContent: 'center', alignItems: 'center'}}>
                <Text style={{color:'white', opacity:0.9, fontSize: 28}}>{this.props.title}</Text>
              </View>
            </Image>
          </TouchableOpacity>
        </View>
      )
    }
  }
}

const styles = StyleSheet.create({
  view: {
    flex: 1,
    padding: 2,
    backgroundColor: '#E8E8E8'
  },
  imageStyle: {
    flex: 1,
    // height: 100,
    width: imageWidth,
    backgroundColor:'transparent',
    flexDirection: 'row',
    resizeMode: 'cover',
    alignItems: 'center',
    backgroundColor: '#E5D774',
  }
});

export default BuffetListItem
