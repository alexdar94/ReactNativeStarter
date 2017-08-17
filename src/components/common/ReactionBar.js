import React from 'react';
import { StyleSheet, Text, Image, View, PanResponder, TouchableOpacity, Animated, Dimensions } from 'react-native';
var EMOJIS = [
  {id: 'lol',   src: require('../../assets/imgs/emotional/lol@1x.png') },
  {id: 'sad',   src: require('../../assets/imgs/emotional/sad@1x.png') },
  {id: 'wow',   src: require('../../assets/imgs/emotional/wow@1x.png') },
  {id: 'love',  src: require('../../assets/imgs/emotional/love@1x.png') },
  {id: 'cute',  src: require('../../assets/imgs/emotional/cute@1x.png') },
  {id: 'angry', src: require('../../assets/imgs/emotional/angry@1x.png') },
  {id: 'omg',   src: require('../../assets/imgs/emotional/omg@1x.png') },
];
var SCREEN_WIDTH = Dimensions.get('window').width;
const WIDTH = 350;
const DISTANCE =  WIDTH / EMOJIS.length;
const REMAINDER = SCREEN_WIDTH - WIDTH;
const GUTTER = REMAINDER / 2;

class ReactionBar extends React.Component {
  constructor(props) {
    super(props);
    this._imgLayouts = {};
    this._imageAnimations = {};
    this._hoveredImg = '';
    this._scaleAnimation = new Animated.Value(0);

    EMOJIS.forEach((img) => {
      this._imageAnimations[img.id] = {
        scale: new Animated.Value(1)
      };
    })

    this.getEmojiContainerStyle = this.getEmojiContainerStyle.bind(this)
    this.getHoveredImage = this.getHoveredImage.bind(this)
    this.animateSelected = this.animateSelected.bind(this)
    this.animateFromSelect = this.animateFromSelect.bind(this)
    this.getImages = this.getImages.bind(this)

    this._panResponder = PanResponder.create({
      onStartShouldSetPanResponder: (evt, gestureState) => true,
      onStartShouldSetPanResponderCapture: (evt, gestureState) => true,
      onMoveShouldSetPanResponder: (evt, gestureState) => true,
      onMoveShouldSetPanResponderCapture: (evt, gestureState) => true,
      onPanResponderGrant: (evt, gestureState) => {
        //console.log('evt.nativeEvent', evt.nativeEvent)
        //this._prevPointerX = evt.nativeEvent.locationX;
        //  var hoveredImg = this.getHoveredImg(this._value)

        //old attempt before snapping
        var hoveredImg = this.getHoveredImage(Math.ceil(evt.nativeEvent.locationX))//this.getHoveredImg(Math.ceil(gestureState.x0))
        //console.log('hoveredImg', hoveredImg, evt.nativeEvent.locationX)
        this.animateSelected(this._imageAnimations[hoveredImg])
        this._hoveredImg = hoveredImg;
      },
      onPanResponderMove: (evt, gestureState) => {
        var hoveredImg = this.getHoveredImage(Math.ceil(evt.nativeEvent.locationX))

        if (hoveredImg && this._hoveredImage !== hoveredImg) {
          this.animateSelected(this._imageAnimations[hoveredImg])
        }
        if (this._hoveredImg !== hoveredImg && this._hoveredImg) {
          this.animateFromSelect(this._imageAnimations[this._hoveredImg]);
        }
        this._hoveredImg = hoveredImg;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this._hoveredImg) {
          this.animateFromSelect(this._imageAnimations[this._hoveredImg], this.close.bind(this, this.afterClose) )
        } else {
          this.close(this.afterClose);
        }
      }
    });
    //console.log('and in constructor', this._imgLayouts, this._imageAnimations)
  }
  animateSelected(imageAnimations) {
    if (imageAnimations) {
      Animated.parallel([
        Animated.timing(imageAnimations.scale, {
          duration: 150,
          toValue: 1.3
        })
      ]).start();
    }
  }
  animateFromSelect(imageAnimations, cb) {
    Animated.parallel([
      Animated.timing(imageAnimations.scale, {
        duration: 50,
        toValue: 1
      })
    ]).start(cb);
  }
  getHoveredImage(x) {
    return Object.keys(this._imgLayouts).find((key) => {
      return x >= this._imgLayouts[key].left &&  x <= this._imgLayouts[key].right;
    })
  }
  close(cb) {
    this.setState({open: false}, () => {
      Animated.stagger(100,[
        Animated.timing(this._scaleAnimation, {
          duration: 100,
          toValue: 0
        })
      ]).start(cb);
    })
  }
  handleLayoutPosition(img, position) {
    this._imgLayouts[img] = {
      left: position.nativeEvent.layout.x,
      right: position.nativeEvent.layout.x + position.nativeEvent.layout.width
    }
    //console.log('not handling layoutposition very well', this._imgLayouts[img], img, position.nativeEvent)
  }
  getEmojiContainerStyle() {
    return {
      //transform: [{scaleY: this._scaleAnimation}],
      overflow: this.props.isShowEmoji === true ? 'visible': 'hidden',
    }
  }
  getImages() {
    return EMOJIS.map((img) => {
      //console.log('get images', img)
      return (
        <View style={styles.smileyWrap} key={img.id} onLayout={this.handleLayoutPosition.bind(this, img.id)}>
            <Animated.Image
              source={img.src}
              style={[styles.smiley, {
                transform: [
                  {scale: this._imageAnimations[img.id].scale}
                ]
              }]}
            />
        </View>
      );
    })
  }
  render() {
    //pointerEvents={'box-only'}//should be animated.view?
      //console.log('this._imgLayouts as found in render', this._imgLayouts)
    if (this.props.isShowEmoji) {
       return (
         <View style={[styles.container, this.getEmojiContainerStyle()]}>
             <View {...this._panResponder.panHandlers}
              style={styles.reactions}
              pointerEvents={'box-only'}
              >
               {this.getImages()}
             </View>
         </View>
       );
     } else {
       return null;
    }
  }
}

export default ReactionBar;

const size = 35;
//if I need to explicitly set with this is a bitch otherwise delete or comment out
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
  },
  reactions: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    backgroundColor: 'transparent',
  },
  smileyWrap: {
    flex: 1,
    width: DISTANCE,
    height: DISTANCE,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
  },
  reactionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    fontWeight: '400',
    fontFamily: 'Avenir',
    marginTop: 5,
  }
});
