import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import { connect } from 'react-redux';
import CacheableImage from 'react-native-cached-image'
import Sound from 'react-native-sound'
import Reactions from '../Reactions'
import {
  requestReactedVideos,
  reactionsToggle,
  addReactedVideo,
  removeReactedVideo,
} from '../../../actions';
import LuvButton from '../LuvButton.js';
import { formatTime } from '../../../helper/FormatterHelper';

class FeedListItem extends Component {

  constructor(props) {
    super(props);

    //Load up mp3 sound
    this.luveclick = new Sound('luveclick.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        // console.log('failed to load the sound', error);
      }
    });

    this._onPressShowEmoji = this._onPressShowEmoji.bind(this)
    this._onPressEmoji = this._onPressEmoji.bind(this)
    this.cancel = this.cancel.bind(this)
    this.onClickLuv = this.onClickLuv.bind(this)
    this.onClickUnluv = this.onClickUnluv.bind(this)
    this.state = {
      formattedDuration: "00:00",
      isShowEmoji: false,
      emotional: 0,
    }
  }

  componentDidMount() {
    let formattedDuration = formatTime(this.props.duration);
    this.setState({
      formattedDuration: formattedDuration,
      luved: this.props.luved,
      emotional: this.props.selected_emotion,
    })
  }
  componentWillReceiveProps(nextProps) {

    this.setState({
      luved: nextProps.luved,
      emotional: nextProps.selectedEmotion,
    })
  }
  _playLuveClick() {
    this.luveclick.stop();
    this.luveclick.play();
  }

  _onPressShowEmoji() {
    this._playLuveClick();
    if (this.state.isShowEmoji === false) {
      //show reactions emoji
      this.setState({
        isShowEmoji: !this.state.isShowEmoji,
      })
      this.props.reactionsToggle();
    } else if (this.state.isShowEmoji === true && this.state.emotional !== 0){
      //hide reactions emoji and unreact previous selection to API, store, state
      this.setState({
        isShowEmoji: !this.state.isShowEmoji,
        emotional: 0,
      })
      //call action to clear selected_emotion on server
      this.props.removeReactedVideo(this.props.id, this.props.emotional)
      this.props.reactionsToggle();
    } else {
      //no need to call action
      this.setState({
        isShowEmoji: !this.state.isShowEmoji,
      })
    }
  }

  _onPressEmoji(emo) {
    //this._playLuveClick();
    this.setState({
      isShowEmoji: false,
      emotional: emo,
    })
    this.props.addReactedVideo(this.props.id, emo);
    this.props.reactionsToggle();
  }

  cancel() {
    this.setState({
      isShowEmoji: !this.state.isShowEmoji,
    })
    this.props.reactionsToggle();
  }

  _renderEmoIcon() {
    if( this.props.selectedEmotion === null) {
      return <Image style={styles.topIcon} source={require('../../../assets/imgs/ic_emo.png')} />
    }
    switch (this.props.selectedEmotion) {
      case 1:
        return <Image style={styles.topIcon} source={require('../../../assets/imgs/emotional/icon-lol.png')} />
        break;
      case 2:
        return <Image style={styles.topIcon} source={require('../../../assets/imgs/emotional/icon-sad.png')} />
        break;
      case 3:
        return <Image style={styles.topIcon} source={require('../../../assets/imgs/emotional/icon-omg.png')} />
        break;
      case 4:
        return <Image style={styles.topIcon} source={require('../../../assets/imgs/emotional/icon-inspired.png')} />
        break;
      case 5:
        return <Image style={styles.topIcon} source={require('../../../assets/imgs/emotional/icon-cute.png')} />
        break;
      case 6:
        return <Image style={styles.topIcon} source={require('../../../assets/imgs/emotional/icon-wtf.png')} />
        break;
      default:
        return <Image style={styles.topIcon} source={require('../../../assets/imgs/ic_emo.png')} />
    }
  }
  onClickLuv() {
    this.props.pressAddLuv();
    this.setState({
      luved: true
    })
  }
  onClickUnluv() {
    this.props.pressRemoveLuv();
    this.setState({
      luved: false
    })
  }
  render() {
    quickie = (<View></View>);

    if( this.props.quickie_timecodes != null ) {
      if( this.props.isQuickie ) {
        quickie = (
          <TouchableOpacity onPress={this.props.onPressQuickie}>
            <Image style={styles.iconFB} source={require('../../../assets/imgs/ic_quickie_selected.png')}/>
          </TouchableOpacity>
        )
      } else {
        quickie = (
          <TouchableOpacity onPress={this.props.onPressQuickie}>
            <Image style={styles.iconFB} source={require('../../../assets/imgs/ic_quickie.png')}/>
          </TouchableOpacity>
        )
      }
    }

    emo_btn = (<View></View>)
    if (!this.props.hideQuickie) {
      emo_btn = (
        <View >
          <TouchableOpacity onPress={this._onPressShowEmoji}>
            {this._renderEmoIcon()}
          </TouchableOpacity>
        </View>
      )
    }

    if (this.props.channel.logo) {
      avatar = {uri: this.props.channel.logo}
    } else {
      avatar = require('../../../assets/imgs/luvevideoplaceholder.png')
    }
    return (
      <View style={styles.rowStyle}>
        <TouchableOpacity onPress={this.props.onPressVideo}>
          <CacheableImage activityIndicatorProps={{color:'white',style: {backgroundColor:'transparent'} }} defaultSource={require('../../../assets/imgs/luvevideoplaceholder.png')} resizeMode='cover' source={{uri: this.props.cover_wide || undefined}} style={styles.imageStyle}>
            <View style={styles.topSide}>
              {emo_btn}
              <LuvButton luved={this.props.isLuved} pressAddLuv={this.onClickLuv} pressRemoveLuv={this.onClickUnluv}/>
            </View>

          <View>
            <View style={styles.duration}>
              <Text style={styles.durationText}>{this.state.formattedDuration}</Text>
            </View>

            <Image source={require('../../../assets/imgs/overlay_1.png')} style={styles.bottomSide}>
              <View style={styles.bottomLeftSide}>
                <Text style={styles.title} numberOfLines={2} ellipsizeMode='tail'>{this.props.title}</Text>
              </View>
              <View style={styles.bottomRightSide}>
                {quickie}
              </View>
            </Image>

            <View style={{backgroundColor: this.props.current_background, height: 3}} />
          </View>

          <TouchableOpacity style={styles.overthumb} onPress={this.props.onPressChannel}>
            <Image defaultSource={require('../../../assets/imgs/luveplaceholder.png')} source={avatar} style={styles.thumb} />
          </TouchableOpacity>

          <Reactions style={styles.emoContainer}
            onPressEmoji={this._onPressEmoji}
            isShowEmoji={this.state.isShowEmoji}
            cancel={this.cancel}
          />

          </CacheableImage>
        </TouchableOpacity>
      </View>
    )
  }
}
// <TouchableOpacity onPress={this.props.onPressShare}>
//   <Image style={styles.iconFB} source={require('../../../assets/imgs/ic_fb.png')} />
// </TouchableOpacity>


const styles = StyleSheet.create({
  rowStyle: {
    //backgroundColor: '#2C2C2D'
    backgroundColor: '#00CADC'
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
    paddingLeft: 16,
    paddingRight: 16,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  bottomSide: {
    height: 56,
    width: undefined,
    flexDirection: 'row',
    paddingLeft: 16,
    paddingRight: 16,
  },
  bottomLeftSide: {
    flex: 1,
    marginTop: 12,
    flexDirection: 'row',
  },
  bottomRightSide: {
    marginTop: 12,
    width: 80,
    flexDirection: 'row',
    justifyContent: 'flex-end',
  },
  title: {
    flex: 1,
    fontSize: 13,
    marginLeft: 80,
    color: '#272728',
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
    width: 22,
    height: 22,
    resizeMode: 'contain'
  },
  iconFB: {
    width: 22,
    height: 22,
    resizeMode: 'contain',
    marginLeft: 10,
  },
  iconLove: {
    width: 30,
    height: 30,
    resizeMode: 'contain'
  },
  overthumb: {
    position: 'absolute',
    left: 10,
    bottom: 10,
    backgroundColor:'transparent',
    width: 70,
    height: 70,
    justifyContent: 'center',
    alignItems: 'center',
  },
  thumb: {
    borderColor: 'white',
    borderWidth: 2,
    width: 70,
    height: 70,
    resizeMode: 'cover',
    borderRadius: 35,
  },
  topIcon: {
    width: 30,
    height: 30,
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
    right: 10,
    top: 45,
  },
  iconEmo: {
    width: 48,
    height: 48,
    resizeMode: 'contain',
  },
  duration: {
    paddingRight: 4,
    paddingBottom: 2,
    alignItems:'flex-end',
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
const mapStateToProps = (state) => {
  return {
    isShowEmoji: state.reactions.reactions_active,
    current_background: state.background.current_background,
  //  isReactionsActive: state.reactions.reactions_active,
  }
}
export default connect(
  mapStateToProps,
  {
    reactionsToggle,
    addReactedVideo,
    removeReactedVideo,
    requestReactedVideos,
  }
)(FeedListItem)
