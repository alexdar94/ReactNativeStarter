import React from 'react';
import LinearGradient from 'react-native-linear-gradient';
import { StyleSheet, Image } from 'react-native';
import { DefaultRenderer, Actions } from 'react-native-router-flux';

class FooterBar extends React.Component {
  render() {
  const state = this.props.navigationState;
  const children = state.children;

      return (
        <LinearGradient key="gradientWrap" colors={['transparent', 'rgba(0, 0, 0, 0.5)']} style={styles.linearGradient}>
        <DefaultRenderer navigationState={children[0]} onNavigate={this.props.onNavigate} />
        </LinearGradient>
      );
      }
};

let styles = StyleSheet.create({
  linearGradient: {
      borderColor    : '#6C0104',
      backgroundColor: '#6C0104',
  }
})

export default FooterBar;
