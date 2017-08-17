import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet, Dimensions } from 'react-native'
import CacheableImage from 'react-native-cached-image'

var imageWidth = Math.round(Dimensions.get('window'))-8;

class FeelListItem extends Component {
  render() {
    let src = null;
    let text = null;
    switch (this.props.id) {
      case 1:
        src = require('../../../assets/imgs/feel/lol.jpg')
        text = 'LOL'
        break;
      case 2:
        src = require('../../../assets/imgs/feel/sad.jpg')
        text = 'SAD'
        break;

      case 3:
        src = require('../../../assets/imgs/feel/omg.jpg')
        text = 'WOW'
        break;

      case 4:
        src = require('../../../assets/imgs/feel/inspired.jpg')
        text = 'INSPIRED'
        break;

      case 5:
        src = require('../../../assets/imgs/feel/cute.jpg')
        text = 'CUTE'
        break;

      case 6:
        src = require('../../../assets/imgs/feel/wtf.jpg')
        text = 'OMG'
        break;

      default:
        src = require('../../../assets/imgs/feel/lol.jpg')
        text = 'LOL'
    }

    return (
      <View style={styles.view}>
        <TouchableOpacity onPress={this.props.onPress}>
          <Image
            source={src}
            style={styles.imageStyle}>
            <Text style={styles.text}>{text}</Text>
          </Image>
        </TouchableOpacity>
      </View>
    );
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
    height: 100,
    width: imageWidth,
    // width: 200,
    backgroundColor: 'transparent',
    flexDirection: 'row',
    resizeMode: 'stretch',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: '#00cadc',
  },
  text: {
    backgroundColor: 'transparent',
    color: 'white',
    // fontWeight: 'bold',
    fontSize: 14,
    marginLeft: -100
  }
});

export default FeelListItem
