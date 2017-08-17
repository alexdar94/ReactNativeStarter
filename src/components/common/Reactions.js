import React from 'react';
import { StyleSheet, Text, Image, View, PanResponder, TouchableOpacity, Animated, Dimensions } from 'react-native';
var EMOJIS = [
  {text: 'lol', id: 1,   src: require('../../assets/imgs/emotional/icon-lol.png') },
  {text: 'sad', id: 2,   src: require('../../assets/imgs/emotional/icon-sad.png') },
  {text: 'wow', id: 3,   src: require('../../assets/imgs/emotional/icon-omg.png') },
  {text: 'ins', id: 4,   src: require('../../assets/imgs/emotional/icon-inspired.png') },
  {text: 'cute', id: 5,  src: require('../../assets/imgs/emotional/icon-cute.png') },
  {text: 'omg', id: 6,   src: require('../../assets/imgs/emotional/icon-wtf.png') },
];
var SCREEN_WIDTH = Dimensions.get('window').width;
const WIDTH = 350;
const DISTANCE =  WIDTH / EMOJIS.length;
const REMAINDER = SCREEN_WIDTH - WIDTH;
const GUTTER = REMAINDER / 2;

class Reactions extends React.Component {
  constructor(props) {
    super(props);
    this._imgLayouts = {};
    this._imageAnimations = {};
    this._labelAnimations = {};
    this._hoveredImg = '';
    this._scaleAnimation = new Animated.Value(0);
    this.state = {
    //  selectedReaction: ''
    }
    EMOJIS.forEach((img) => {
      this._imageAnimations[img.id] = {
        scale: new Animated.Value(1)
      };
      this._labelAnimations[img.id] = {
        scale: new Animated.Value(0.01) //potential hack because scale 0 android breaks
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
      //  console.log('onPanResponderGrant fire', evt, gestureState)

        //so that emojis do not remain large if opened and a new one is panned
        if (this.state.selectedReaction) {
          this.animateFromSelect(this._imageAnimations[this.state.selectedReaction], this._labelAnimations[this.state.selectedReaction])
        }
        this.props.setScenePanHandlers = null;

        var hoveredImg = this.getHoveredImage(Math.ceil(evt.nativeEvent.locationX), Math.ceil(evt.nativeEvent.locationY))

        this.animateSelected(this._imageAnimations[hoveredImg], this._labelAnimations[hoveredImg])
        this._hoveredImg = hoveredImg;
        return true;
      },
      onPanResponderMove: (evt, gestureState) => {
        var hoveredImg = this.getHoveredImage(Math.ceil(evt.nativeEvent.locationX), Math.ceil(evt.nativeEvent.locationY))

  //      console.log('let us find the bounding box', evt.nativeEvent, hoveredImg)
        if (hoveredImg && this._hoveredImage !== hoveredImg) {
          this.animateSelected(this._imageAnimations[hoveredImg], this._labelAnimations[hoveredImg])
        }
        if (this._hoveredImg !== hoveredImg && this._hoveredImg) {
          this.animateFromSelect(this._imageAnimations[this._hoveredImg], this._labelAnimations[this._hoveredImg]);
        }
        this._hoveredImg = hoveredImg;
        return true;
      },
      onPanResponderRelease: (evt, gestureState) => {
        if (this._hoveredImg) {
          this.animateFromSelect(this._imageAnimations[this._hoveredImg], this._labelAnimations[this._hoveredImg], this.close.bind(this, this.afterClose) )
          this.setState({
            selectedReaction: this._hoveredImg
          })
          this.props.onPressEmoji(this._hoveredImg)
        } else {
          this.props.cancel();
        }
        return true;
      }
    });
  }
  animateSelected(imageAnimations, labelAnimations) {
    if (imageAnimations) {
      Animated.parallel([
        Animated.timing(imageAnimations.scale, {
          duration: 100,
          toValue: 1.3
        })
      ]).start();
    }
    if (labelAnimations) {
      Animated.parallel([
        Animated.timing(labelAnimations.scale, {
          duration: 100,
          toValue: 1,
        })
      ]).start();
    }
  }
  animateFromSelect(imageAnimations, labelAnimations, cb) {
    Animated.parallel([
      Animated.timing(imageAnimations.scale, {
        duration: 50,
        toValue: 1
      }),
      Animated.timing(labelAnimations.scale, {
        duration: 100,
        toValue: 0.01, //potential hack because android scale 0 goes to 1
      })
    ]).start(cb);
  }
  getHoveredImage(x, y) {
    // console.log('just make sure about y', y)
    if (y > -5 && y < 50) {
      return Object.keys(this._imgLayouts).find((key) => {
        return x >= this._imgLayouts[key].left &&  x <= this._imgLayouts[key].right;
      })
    }
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
  //  console.log('handleLayoutPosition correctly?', img, position.nativeEvent)
    this._imgLayouts[img] = {
      left: position.nativeEvent.layout.x,
      right: position.nativeEvent.layout.x + position.nativeEvent.layout.width
    }
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
        <View style={[styles.smileyWrap]} key={img.id} onLayout={this.handleLayoutPosition.bind(this, img.id)}>
        <Animated.View
          style={[styles.tipWrap, {
            transform: [
              {scale: /*0*/this._labelAnimations[img.id].scale},
              {translateY: -30}
            ]
            }
          ]}><Text style={styles.tipText} numberOfLines={1}>{img.text}</Text></Animated.View>
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
    if (this.props.isShowEmoji) {
       return (
         <View style={[styles.container, this.props.style, this.getEmojiContainerStyle()]}>
             <View {...this._panResponder.panHandlers}
              style={[styles.reactions]}
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

export default Reactions;

const size = 35;
//if I need to explicitly set with this is a bitch otherwise delete or comment out
const styles = StyleSheet.create({
  container: {
    flex: 1,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: 'transparent',
    width: WIDTH-25,
    marginLeft: GUTTER,
    marginRight: GUTTER,
    height: 45,
  },
  reactions: {
    flex: 1,
    position: 'relative',
    flexDirection: 'row',
    justifyContent: 'center',
    backgroundColor: 'transparent',
    alignItems: 'center',
  },
  smileyWrap: {
    flex: 1,
    width: size+4,
    height: size+4,
    justifyContent: 'center',
    alignItems: 'center',
  },
  smiley: {
    width: size,
    height: size,
    resizeMode: 'contain',
  },
  reactionText: {
    fontSize: 12,
    textAlign: 'center',
    color: '#999',
    fontWeight: '400',
    fontFamily: 'Avenir',
    marginTop: 5,
  },
  tipWrap: {
    flex: 1,
//    justifyContent: 'center',
    alignItems: 'center',
  //  marginBottom: 10,
    position: 'relative',
    left: 0,//DISTANCE / 2,
    paddingLeft: 6,
    paddingRight: 6,
    width: DISTANCE,
//    height: 35,
    backgroundColor: 'black',
    borderRadius: 20,
  //  top: -10,
  },
  tipText: {
    textAlign: 'center',
  //  whitespace: 'none',
    color: 'white',
  }
});
