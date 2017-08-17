import React, { Component } from 'react';
import {
  View,
  Animated,
  StyleSheet,
  ScrollView,
  TouchableOpacity,
  Text,
  Platform,
  findNodeHandle,
  Dimensions,
  Image
  } from 'react-native';
import NavigationBar from 'react-native-navbar';
import { Button, Icon } from 'native-base';
import { Actions } from 'react-native-router-flux';
import { connect } from 'react-redux';

const WINDOW_WIDTH = Dimensions.get('window').width;

class ScrollableTabBar extends Component {
  static propTypes = {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
    backgroundColor: React.PropTypes.string,
    activeTextColor: React.PropTypes.string,
    inactiveTextColor: React.PropTypes.string,
    scrollOffset: React.PropTypes.number,
    style: View.propTypes.style,
    tabStyle: View.propTypes.style,
    tabsContainerStyle: View.propTypes.style,
    textStyle: Text.propTypes.style,
    renderTab: React.PropTypes.func,
    distanceToLoadMore: React.PropTypes.number,
  }
  static defaultProps = {
    scrollOffset: 52,
    activeTextColor: '#FFFFFF',
    inactiveTextColor: '#FAEBD7', //default state overwritten by defaultprops
    backgroundColor: null,
    style: {},
    tabStyle: {},
    tabsContainerStyle: {},
    distanceToLoadMore: 60
  }
  constructor(props) {
    super(props)
    this._tabsMeasurements = [];
    var screenWidth = Dimensions.get('window').width;

    this.updateView = this.updateView.bind(this);
    this.necessarilyMeasurementsCompleted = this.necessarilyMeasurementsCompleted.bind(this);
    this.updateTabPanel = this.updateTabPanel.bind(this);
    this.renderTabOption = this.renderTabOption.bind(this);
    this.measureTab = this.measureTab.bind(this);
    this.onTabContainerLayout = this.onTabContainerLayout.bind(this);
    this.onContainerLayout = this.onContainerLayout.bind(this);
    this.shouldAppendLastIndex = this.shouldAppendLastIndex.bind(this);
    this._distanceFromEnd = this._distanceFromEnd.bind(this);
    this.state = {
      scrollOffset: 52,
      activeTextColor: '#FFFFFF',
      inactiveTextColor: '#FAEBD7',
      backgroundColor: null,
      style: {},
      tabStyle: {},
      tabsContainerStyle: {},
      _containerWidth: null,
      titleMenuWidth: screenWidth,
    }
  }
  componentDidMount() {
    this.props.scrollValue.addListener(this.updateView);
    this.props.scrollValue.addListener(this.shouldAppendLastIndex);
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
  necessarilyMeasurementsCompleted(position) {
    return this._tabsMeasurements[position] && this._tabsMeasurements[position + 1];
  }
  updateTabPanel(position, pageOffset) {
    const containerWidth = this._containerMeasurements.width;
    const tabWidth = this._tabsMeasurements[position].width;
    const nextTabMeasurements = this._tabsMeasurements[position + 1];
    const nextTabWidth = nextTabMeasurements && nextTabMeasurements.width || 0;
    const tabOffset = this._tabsMeasurements[position].left;
    const absolutePageOffset = pageOffset * tabWidth;
    let newScrollX = tabOffset + absolutePageOffset;

    // center tab and smooth tab change (for when tabWidth changes a lot between two tabs)
    newScrollX -= (containerWidth - (1 - pageOffset) * tabWidth - pageOffset * nextTabWidth) / 2;
    newScrollX = newScrollX >= 0 ? newScrollX : 0;

    if (Platform.OS === 'android') {
      // this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
    } else {
      const rightBoundScroll = this._tabContainerMeasurements.width - (this._containerMeasurements.width);
      newScrollX = newScrollX > rightBoundScroll ? rightBoundScroll : newScrollX;
      // this._scrollView.scrollTo({x: newScrollX, y: 0, animated: false, });
    }
  }
  renderTabOption(name, page) {
    const isTabActive = this.props.activeTab === page;
    const { activeTextColor, inactiveTextColor, textStyle, } = this.props;
    const textColor = isTabActive ? activeTextColor : inactiveTextColor;
    const fontWeight = isTabActive ? 'bold' : '100';
    const fontSize = 14;

    return <TouchableOpacity
      key={`${name}_${page}`}
      ref={'tab_' + page}
      accessible={true}
      accessibilityLabel={name}
      accessibilityTraits='button'
      style={[styles.tab, this.props.tabStyle]}
      onPress={() => this.props.goToPage(page)}
      onLayout={this.measureTab.bind(this, page)}
    >
      <Text style={[{color: textColor, fontWeight, fontSize}, textStyle, ]}>
        {name}
      </Text>
    </TouchableOpacity>;
  }
  measureTab(page) {
    const tabContainerhandle = findNodeHandle(this.refs.tabContainer);
    this.refs['tab_' + page].measureLayout(tabContainerhandle, (ox, oy, width, height, pageX, pageY) => {
      this._tabsMeasurements[page] = {left: ox, right: ox + width, width: width, height: height, };

      this.updateView({value: this.props.scrollValue._value, });
    });
  }
  render() {

    country_btn = (<View></View>)
    if (this.props.showCountry) {
      country_btn = (
        <TouchableOpacity onPress={() => this.props.onPressCountry()}>
          <Image source={require('../../assets/imgs/ic_world.png')} style={styles.worldLogo} />
        </TouchableOpacity>
      )
    }

    return (
        <NavigationBar
        title={<View style={{backgroundColor: this.props.current_background, alignItems: 'center', borderColor:'yellow', borderWidth:1}}><Image source={require('../../assets/imgs/LUVE_logo.png')} style={{height: 20, width: 58}} /><View
            style={[styles.container, {backgroundColor: this.props.backgroundColor}, this.props.style ]}
            onLayout={this.onContainerLayout}
          >
         {/* <ScrollView
           ref={(scrollView) => { this._scrollView = scrollView; }}
           horizontal={true}
           showsHorizontalScrollIndicator={false}
           showsVerticalScrollIndicator={false}
           directionalLockEnabled={true}
           bounces={false}
           scrollsToTop={false} */}
           <View
           style={{height: 30, width: this.state._containerWidth, backgroundColor: this.props.current_background}}
         >
           <View
             style={[styles.tabs, {width: this.state._containerWidth }, this.props.tabsContainerStyle ]}
             ref={'tabContainer'}
             onLayout={this.onTabContainerLayout}
           >
             {this.props.tabs.map((tab, i) => this.renderTabOption(tab, i))}
             <Animated.View />
             {country_btn}
           </View>

         </View>
         {/* </ScrollView> */}
       </View></View>}
      //  rightButton={
      //    <View style={{height:49, width:30, flexDirection: 'row', alignItems: 'flex-start',
      //   justifyContent: 'flex-start' }}>
      //      <TouchableOpacity onPress={() => Actions.country()}>
      //        <Image source={require('../../assets/imgs/ic_world.png')} style={styles.worldLogo} />
      //      </TouchableOpacity>
      //    </View>
      //  }
       style={[styles.headerStyle, {height: 57, backgroundColor: this.props.current_background}]}
       statusBar={{tintColor: this.props.current_background}} />
    );
  }
  onTabContainerLayout(e) {
    this._tabContainerMeasurements = e.nativeEvent.layout;
    let width = this._tabContainerMeasurements.width;
    if (width < WINDOW_WIDTH) {
      width = WINDOW_WIDTH;
    }
    this.setState({ _containerWidth: width, });
    this.updateView({value: this.props.scrollValue._value, });
  }
  onContainerLayout(e) {
    this._containerMeasurements = e.nativeEvent.layout;
    this.updateView({value: this.props.scrollValue._value, });
  }
  shouldAppendLastIndex(e) {
    return this._distanceFromEnd(e) < this.props.distanceToLoadMore;//what do I put here lol
  }
  shouldPrependFirstIndex(e) {
    return 50;
  }
  _distanceFromEnd(e) { //returns a number
    return 50;
  }
}

const styles = StyleSheet.create({
  tab: {
    height: 30,
    alignItems: 'center',
    justifyContent: 'center',
    paddingLeft: 20,
    paddingRight: 20,
  },
  container: {
    height: 30,
    backgroundColor: '#00CADC',
    justifyContent: 'center',
    marginLeft: 0,
    flexDirection: 'row',
  },
  tabs: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    alignItems: 'center',
    paddingTop: 0,
  },
  navbarLogo: {
    marginTop: 5,
    marginLeft: 10,
    height: 30,
    width: 30
  },
  worldLogo: {
    marginTop: 2,
    marginRight: 0,
  },
  headerStyle: {
    backgroundColor: '#00CADC',
  },
});

const mapStateToProps = (state) => {
  return { current_background: state.background.current_background };
};

export default connect(mapStateToProps)(ScrollableTabBar);
