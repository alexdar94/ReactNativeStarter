import React from 'react';
import {
  StyleSheet,
  Text,
  View,
  TouchableOpacity,
  Image,
  Platform,
  UIManager,
  LayoutAnimation,
  StatusBar,
} from 'react-native';
import { connect } from 'react-redux';

import Layout from '../../constants/Layout'
import { Lang } from '../../lang';

class LuveTabBar extends React.Component {
  constructor(props) {
    super(props)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }
  }

  renderTab(name, page) {
    let fontSize = 12;
    if( Lang.getLanguage() === 'th' && name != 'LUVEFEED') {
      fontSize = 16;
    }
    const isTabActive = this.props.activeTab === page;
    const fontWeight = isTabActive ? 'bold' : 'normal';
    const color = isTabActive ? 'white' : '#FAEBD7';
    return (
      <TouchableOpacity
        key={name}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => this.props.goToPage(page)}
        style={{width: 110, justifyContent: 'center', alignItems: 'center'}}>
        <Text style={{color, fontWeight, fontSize}}>
          {name}
        </Text>
      </TouchableOpacity>
    );
  }

  componentWillUpdate() {
    LayoutAnimation.easeInEaseOut();
  }

  renderLogo() {
    if (!this.props.navbarHidden) {
      return (
        <View style={styles.logoContainer}>
          <Image source={require('../../assets/imgs/LUVE_logo.png')} style={styles.logo} />
        </View>
      );
    } else {
      if (Platform.OS === 'android') {
        return;
      }
      return <StatusBar hidden />;
    }
  }

  render() {
    let marginLeft = null;
    switch (this.props.activeTab) {
      case 0: marginLeft = Layout.window.width/2-55;break;//110/2
      case 1: marginLeft = Layout.window.width/2-165;break;//110+55
      case 2: marginLeft = Layout.window.width/2-275;break;//110+110+55
      case 3: marginLeft = Layout.window.width/2-385;break;//110+110+110+55
    }
    return (
      <View style={[styles.container, {backgroundColor: this.props.current_background, }]}>
        {this.renderLogo()}
        <View style={[styles.tabmenu, {backgroundColor: this.props.current_background}]}>
          <View style={{flexDirection: 'row', marginLeft}}>
            {this.props.tabs.map((name, page) => this.renderTab(name, page))}
          </View>
        </View>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  container: {
    alignItems: 'center',
  },
  tabmenu: {
    flexDirection: 'row',
    paddingVertical: 7,
    width: Layout.window.width,
  },
  logo: {
    resizeMode: 'contain',
    width: 58,
    height: 20,
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 10,
  },
});

const mapStateToProps = (state) => {
  return {
    current_background: state.background.current_background,
    navbarHidden: state.navbar.navbar_hidden
  };
};

export default connect(mapStateToProps)(LuveTabBar);
