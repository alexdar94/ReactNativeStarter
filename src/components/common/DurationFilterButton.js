import React, { Component } from 'react'
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native'

class DurationFilterButton extends Component {

  constructor(props) {
    super(props)

    this._onPressShowFilter = this._onPressShowFilter.bind(this)

    this.state = {
      isShowFilter: false,
    }
  }

  _onPressShowFilter() {
    this.setState({
      isShowFilter: !this.state.isShowFilter,
    })
  }

  render() {
    filter1 = (<View></View>)
    filter2 = (<View></View>)
    filter3 = (<View></View>)
    if (this.state.isShowFilter) {
      filter1 = (
          <TouchableOpacity onPress={this.props.onPressShare} style={styles.miniTopButton}>
            <Text>5</Text>
          </TouchableOpacity>
      )
      filter2 = (
          <TouchableOpacity onPress={this.props.onPressShare} style={styles.miniMiddleButton}>
            <Text>10</Text>
          </TouchableOpacity>
      )
      filter3 = (
          <TouchableOpacity onPress={this.props.onPressShare} style={styles.miniBottomButton}>
            <Text>15</Text>
          </TouchableOpacity>
      )
    }

    return (
      <View style={this.props.style}>
        <TouchableOpacity onPress={this._onPressShowFilter} style={styles.actionButton}>
          <Image style={styles.iconEmo} source={require('../../assets/imgs/ic_timer.png')} />
        </TouchableOpacity>
        {filter1}
        {filter2}
        {filter3}
      </View>
    )
  }
}

const styles = StyleSheet.create({
  actionButton: {
    width: 48,
    height: 48,
    backgroundColor: '#FE807E',
    borderRadius: 24,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniContainer: {
    position: 'absolute',
  },
  miniTopButton: {
    position: 'absolute',
    top: 0,
    left: -50,
    width: 36,
    height: 36,
    backgroundColor: '#FE807E',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniMiddleButton: {
    position: 'absolute',
    top: 50,
    left: -40,
    width: 36,
    height: 36,
    backgroundColor: '#FE807E',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
  miniBottomButton: {
    position: 'absolute',
    bottom: -50,
    right: 0,
    width: 36,
    height: 36,
    backgroundColor: '#FE807E',
    borderRadius: 18,
    alignItems: 'center',
    justifyContent: 'center',
  },
});

export default DurationFilterButton
