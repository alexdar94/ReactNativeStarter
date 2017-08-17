import React, {
  Component,
} from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  Text,
  Platform,
  Dimensions,
  TouchableOpacity,
  Image,
  StatusBar,
  LayoutAnimation,
  UIManager,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import Layout from '../../constants/Layout'

class LuveTabBar extends Component {
  constructor(props) {
    super(props)

    if (Platform.OS === 'android') {
      UIManager.setLayoutAnimationEnabledExperimental && UIManager.setLayoutAnimationEnabledExperimental(true);
    }

    this.onTabContainerLayout = this.onTabContainerLayout.bind(this);
    this.onContainerLayout = this.onContainerLayout.bind(this);
    this.updateView = this.updateView.bind(this);
    this.necessarilyMeasurementsCompleted = this.necessarilyMeasurementsCompleted.bind(this);
    this.updateTabPanel = this.updateTabPanel.bind(this);
    this.measureTab = this.measureTab.bind(this);
    this.renderTab = this.renderTab.bind(this);
    this.renderTab = this.renderTab.bind(this);

    this._tabsMeasurements = [];

    this.state = {
      _containerWidth: null,
    }
  }

  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
  }

  componentWillReceiveProps(nextProps) {
    if (JSON.stringify(this.props.tabs) !== JSON.stringify(nextProps.tabs) && this.state._containerWidth) {
      this.setState({ _containerWidth: null});
    }
  }

  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < Layout.window.width) {
      width = Layout.window.width;
    }
    this.setState({ _containerWidth: width});
    this.updateView({value: this.props.scrollValue._value});
  }

  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({value: this.props.scrollValue._value});
  }

  updateView(offset) {
    const position = Math.floor(offset.value);
    const pageOffset = offset.value % 1;
    const tabCount = this.props.tabs.length;
    const lastTabPosition = tabCount - 1;

    if (tabCount === 0 || offset.value < 0 || offset.value > lastTabPosition) {
      return;
    }

    if (this.necessarilyMeasurementsCompleted(position, position === lastTabPosition)) {
      this.updateTabPanel(position, pageOffset);
    }
  }

  necessarilyMeasurementsCompleted(position, isLastTab) {
    return this._tabsMeasurements[position] &&
      (isLastTab || this._tabsMeasurements[position + 1]) &&
      this._tabContainerMeasurements &&
      this._containerMeasurements;
  }

  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;

    this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false});
  }

  measureTab(page, event) {
    const { x, width, height} = event.nativeEvent.layout;
    this._tabsMeasurements[page] = {left: x, right: x + width, width, height};
    this.updateView({value: this.props.scrollValue._value});
  }

  renderTab(name, page, isTabActive, onPressHandler, onLayoutHandler) {
    const color = isTabActive ? 'white' : '#FAEBD7';
    const fontWeight = isTabActive ? 'bold' : 'normal';

    return (
      <TouchableOpacity
        key={`${name}_${page}`}
        accessible={true}
        accessibilityLabel={name}
        accessibilityTraits='button'
        onPress={() => onPressHandler(page)}
        onLayout={onLayoutHandler}
      >
        <View style={styles.tab}>
          <Text style={{color, fontWeight, fontSize: 13}}>
            {name}
          </Text>
        </View>
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
          <Image source={require('../../assets/imgs/LUVE_textlogo_white.png')} style={styles.logo} />
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
    return (
      <View
        style={{backgroundColor: this.props.current_background}}
        onLayout={this.onContainerLayout}
      >
        {this.renderLogo()}
        <ScrollView
          automaticallyAdjustContentInsets={false}
          ref={(scrollView) => { this._scrollView = scrollView; }}
          horizontal={true}
          showsHorizontalScrollIndicator={false}
          showsVerticalScrollIndicator={false}
          directionalLockEnabled={true}
          onScroll={this.props.onScroll}
          bounces={false}
          scrollsToTop={false}
          scrollEnabled={false}
        >
          <View
            style={[styles.tabs, {width: this.state._containerWidth}]}
            ref={'tabContainer'}
            onLayout={this.onTabContainerLayout}
          >
            {this.props.tabs.map((name, page) => {
              const isTabActive = this.props.activeTab === page;
              const renderTab = this.props.renderTab || this.renderTab;
              return renderTab(name, page, isTabActive, this.props.goToPage, this.measureTab.bind(this, page));
            })}
          </View>
        </ScrollView>
      </View>
    );
  }
}

const styles = StyleSheet.create({
  tab: {
    alignItems: 'center',
    justifyContent: 'center',
    paddingVertical: 7,
    paddingHorizontal: 20,
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
  },
  logoContainer: {
    alignItems: 'center',
    paddingTop: (Platform.OS === 'ios') ? 20 : 10,
  },
  logo: {
    resizeMode: 'contain',
    width: 58,
    height: 20
  }
});

const mapStateToProps = (state) => {
  return {
    current_background: state.background.current_background,
    navbarHidden: state.navbar.navbar_hidden,
  };
};

export default connect(mapStateToProps)(LuveTabBar);
