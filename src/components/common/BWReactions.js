import React from 'react';
import { StyleSheet, Text, Image, View, PanResponder, TouchableOpacity, Animated, Dimensions } from 'react-native';
var EMOJIS = [
  {id: 'lol',   src: require('../../assets/imgs/emotional/icon-lol.png') },
  {id: 'sad',   src: require('../../assets/imgs/emotional/icon-sad.png') },
  {id: 'omg',   src: require('../../assets/imgs/emotional/icon-omg.png') },
  {id: 'ins',   src: require('../../assets/imgs/emotional/icon-inspired.png') },
  {id: 'cute',  src: require('../../assets/imgs/emotional/icon-cute.png') },
  {id: 'wtf',   src: require('../../assets/imgs/emotional/icon-wtf.png') },
];

var emojiMap = new Map();
emojiMap.set(1,require('../../assets/imgs/emotional/icon-lol.png'));
emojiMap.set(2,require('../../assets/imgs/emotional/icon-sad.png'));
emojiMap.set(3,require('../../assets/imgs/emotional/icon-omg.png'));
emojiMap.set(4,require('../../assets/imgs/emotional/icon-inspired.png'));
emojiMap.set(5,require('../../assets/imgs/emotional/icon-cute.png'));
emojiMap.set(6,require('../../assets/imgs/emotional/icon-wtf.png'));

var SCREEN_WIDTH = Dimensions.get('window').width;
const WIDTH = 350;
const DISTANCE =  WIDTH / EMOJIS.length;
const REMAINDER = SCREEN_WIDTH - WIDTH;
const GUTTER = REMAINDER / 2

class BWReactions extends React.Component {
  constructor(props) {
    super(props);
    this.topSet = new Set();
  }

  componentDidMount() {
    this.topSet.clear();

    let maxCount = 0;
    //Get top images
    for( let i=0;i<this.props.emotions.length;i++){
      maxCount = Math.max(maxCount,this.props.emotions[i].count);
    }
    if(maxCount>0) {
      for( let i=0;i<this.props.emotions.length;i++){
        if( maxCount == this.props.emotions[i].count) {
          this.topSet.add(this.props.emotions[i].id);
        }
      }
    }
    if( this.topSet.size > 1 ) {
      //Randomly pick one
      let topSetArray = Array.from(this.topSet);
      let max = topSetArray.length;
      let min = 0;
      let randomEmotion = Math.floor(Math.random() * (max - min)) + min;

      this.topSet.clear();
      this.topSet.add(topSetArray[randomEmotion]);
    }

  }

  getTitle(emotionId) {
    let breakLoop = true;
    for( let i=0;((i<this.props.emotions.length)&&(breakLoop));i++){
      if(emotionId == this.props.emotions[i].id) {
        breakLoop = false;
        return this.props.emotions[i].name.toUpperCase();
      }
    }
  }

  getEmotionImages() {
    let returnImages = [];

    for (let [emotionId, emotionSource] of emojiMap.entries()) {
      if( this.topSet.has(emotionId)) {
        let topImageRow = (
          <View style={styles.smileyWrap} key={emotionId}>
            <Image
              source={emotionSource}
              style={[styles.smiley,{
              transform: [
                {scale: 1.5}
              ]
            }]}
            />
          </View>
        );
        returnImages.push(topImageRow);
      } else {
        let imageRow = (
          <View style={styles.smileyWrap} key={emotionId}>
            <Image
              source={emotionSource}
              style={styles.smiley}
            />
          </View>
        );
        returnImages.push(imageRow);
      }
    }
    return returnImages;
  }

  pressEmotions() {
    if( this.topSet.size > 0 ) {
      let firstTopEmotion = undefined;
      for (let emotion of this.topSet) {
        firstTopEmotion = emotion;
        break;
      };
      if( firstTopEmotion != undefined ) {
        this.props.pressVideoFeel(firstTopEmotion,this.getTitle(firstTopEmotion));
      }
    }
  }

  render() {
    //Navigates to related emotions page
    return (
        <View style={[styles.container, this.props.style]}>
          <TouchableOpacity onPress={() => this.pressEmotions()}
           style={styles.reactions}
           >
            {this.getEmotionImages()}
          </TouchableOpacity>
        </View>
    )
  }
}
const size = 45;
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: WIDTH,
    marginLeft: GUTTER,
    marginRight: GUTTER,
    height: 50,
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    resizeMode: 'contain',
  },
  smileyWrap: {
    flex: 1,
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  }
})
export default BWReactions;
