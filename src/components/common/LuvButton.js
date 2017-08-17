import React, { Component } from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'
import Sound from 'react-native-sound';

class LuvButton extends Component {
  constructor(props) {
    super(props)
    //Load up mp3 sound
    this.luveclick = new Sound('luveclick.mp3', Sound.MAIN_BUNDLE, (error) => {
      if (error) {
        // console.log('failed to load the sound', error);
      }
    });
    this.onClickLuv = this.onClickLuv.bind(this)
    this.onClickUnluv = this.onClickUnluv.bind(this)
    this.state = {

    }
  }
  componentDidMount() {
    //console.log('luv vutton', this.props)
    this.setState({
      luved: this.props.luved
    })
  }
  componentWillReceiveProps(nextProps) {
    //console.log('luv vutton nextprops', nextProps)
    this.setState({
      luved: nextProps.luved
    })
  }
  _playLuveClick() {
    this.luveclick.stop();
    this.luveclick.play();
  }
  onClickLuv() {
    this._playLuveClick();
    this.props.pressAddLuv();
    this.setState({
      luved: true
    })
  }
  onClickUnluv() {
    this._playLuveClick();
    this.props.pressRemoveLuv();
    this.setState({
      luved: false
    })
  }
  render() {
    var luv_btn;
    if (this.state.luved == true) {
      luv_btn = (
        <TouchableOpacity onPress={this.onClickUnluv}>
        <Image style={styles.topIcon} source={require('../../assets/imgs/ic_luved_on.png')} />
        </TouchableOpacity>
      )
    } else {
      luv_btn = (
        <TouchableOpacity onPress={this.onClickLuv}>
        <Image style={styles.topIcon} source={require('../../assets/imgs/ic_luved.png')} />
        </TouchableOpacity>
      )
    }
    return (
      <View>
      {luv_btn}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  topIcon: {
    width: 30,
    height: 30,
    resizeMode: 'contain',
    marginLeft: 10,
  },
})

export default LuvButton;
