import React, { Component, PropTypes } from 'react';
import NavigationBar from 'react-native-navbar';
import {
  Text, View, TouchableOpacity, ScrollView, Dimensions, Image,
  StyleSheet
} from 'react-native'
import { Actions } from 'react-native-router-flux';

export default class MenuNavBar extends Component {
  static propTypes: {
    goToPage: React.PropTypes.func,
    activeTab: React.PropTypes.number,
    tabs: React.PropTypes.array,
  }

  menuTabs = [];

  constructor(props) {
    super(props)
    var screenWidth = Dimensions.get('window').width +500 ;
    this._tabsMeasurements = [];
    this.state = {
      paddingLeft: 5,
      paddingRight: 5,
      titleMenuWidth: screenWidth
    };

    //this._onClickMenu = this._onClickMenu.bind(this);
    this._onMeasure = this._onMeasure.bind(this);
    this._onScroll = this._onScroll.bind(this);
    this._onClickMenu = this._onClickMenu.bind(this)
  }
  componentDidMount() {
    this._listener = this.props.scrollValue.addListener(this.setAnimationValue.bind(this));

    setTimeout(this._onMeasure);
  }
  _onMeasure() {
    this.refs['tab_0'].measure( (fx, fy, width, height, px, py) => {
      /*console.log('Component width is: ' + width)
      console.log('Component height is: ' + height)
      console.log('X offset to frame: ' + fx)
      console.log('Y offset to frame: ' + fy)
      console.log('X offset to page: ' + px)
      console.log('Y offset to page: ' + py)*/

      device_width = Dimensions.get('window').width;
      device_height = Dimensions.get('window').height;
      this.setState({
        paddingLeft: (device_width / 2) - px - (width / 2)
      });
    });

    this.refs['tab_' + (this.props.tabs.length-1)].measure( (fx, fy, width, height, px, py) => {
      device_width = Dimensions.get('window').width;
      device_height = Dimensions.get('window').height;
      this.setState({
        paddingRight: (device_width / 2) - 50 - (width / 2)
      });


    })

    /*this.setState({
      paddingLeft: 5,
      paddingRight: 5
    });*/
  }

  _onClickMenu(index) {
    this.props.goToPage(index);
    this._scrollMenuToCenter(index);
  }

  _scrollMenuToCenter(index) {
    const containerWidth = this.state.titleMenuWidth;

/*
    if (index==0) {
      pos = 0;
    } else {
      pos = this.menuTabs[0] / 2;
    }

    for (i=1 ; i<=index ; i++) {
      if (i==index) {
        pos += this.menuTabs[i] / 2;
      } else {
        pos += this.menuTabs[i];
      }
    }

    this.refs['menuScrollView'].scrollTo({x: pos});
*/
  }

  _onTabLayout(event, i) {
    this.menuTabs[i] = (this.menuTabs[i]) ? this.menuTabs[i] : event.nativeEvent.layout.width;
  }

  setAnimationValue({ value }) {
    //console.log("SCROLL VALUE: " + value);
    if (value % 1 === 0) {
      this._scrollMenuToCenter(value);
    }
    /*this.tabIcons.forEach((icon, i) => {
      const progress = (value - i >= 0 && value - i <= 1) ? value - i : 1;
      icon.setNativeProps({
        style: {
          color: this.iconColor(progress),
        },
      });
    });*/
  }

  _onScroll(event) {
    let {
      contentSize,
      contentInset,
      contentOffset,
      layoutMeasurement,
    } = event.nativeEvent;

    //console.log("CONTENT SIZE:" + contentSize.width);
    //console.log("OFFSET: " + contentOffset.x);
  }

  _renderMain() {
    return (
      <NavigationBar
        title={
          <ScrollView ref='menuScrollView' onScroll={this._onScroll} onLayout={this._onLayout} style={{width: this.state.titleMenuWidth}} horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.props.tabs.map((tab, i) => {
              //console.log('tab an i', tab, i, this.props.activeTab)
              if (i == 0) {
                ref_name = 'tab_' + i;
                component_style = {
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: this.state.paddingLeft,
                  paddingRight: 5,
                };
              } else if (i == this.props.tabs.length - 1) {
                ref_name = 'tab_' + i;
                component_style = {
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 5,
                  paddingRight: this.state.paddingRight,
                };
              } else if (i == this.props.activeTab) {
                //console.log('to the middle', tab, this.props.activeTab)
                component_style = {
                  justifyContent: 'center',

                }
              } else if(i == (this.props.activeTab - 1)) {
                //console.log('to the left', tab)
                component_style = {

                }
              } else if(i == this.props.activeTab + 1) {

                  //console.log('to the right', tab, )

              } else {
                ref_name = "tab_" + i;
                component_style = styles.navbarMenuButton;
              }
              return <TouchableOpacity ref={ref_name} key={tab} onLayout={(event) => this._onTabLayout(event, i)} onPress={() => this._onClickMenu(i)} style={component_style}>
                <Text style={this.props.activeTab === i ? styles.navbarMenuTextActive : styles.navbarMenuText}>{tab}</Text>
              </TouchableOpacity>;
            })}
          </ScrollView>
        }
        style={styles.headerStyle}
        statusBar={{tintColor: '#6C0104'}} />
    );
  }

  _renderTrend() {
    return (
      <NavigationBar
        title={
          <ScrollView ref='menuScrollView' onScroll={this._onScroll} onLayout={this._onLayout} style={{width: this.state.titleMenuWidth, justifyContent: 'space-between'}} horizontal={true} showsHorizontalScrollIndicator={false}>
            {this.props.tabs.map((tab, i) => {
              //console.log('tab, i, this.props.activeTab', tab, i, this.props.activeTab)
              if (i == 0) {
                ref_name = 'tab_' + i;
                component_style = {
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: this.state.paddingLeft,
                  paddingRight: 5,
                };
              } else if (i == this.props.tabs.length - 1) {
                ref_name = 'tab_' + i;
                component_style = {
                  paddingTop: 5,
                  paddingBottom: 5,
                  paddingLeft: 5,
                  paddingRight: this.state.paddingRight,
                };
              } else {
                ref_name = "tab_" + i;
                component_style = styles.navbarMenuButton;
              }
              return <TouchableOpacity ref={ref_name} key={tab} onLayout={(event) => this._onTabLayout(event, i)} onPress={() => this._onClickMenu(i)} style={component_style}>
                <Text style={this.props.activeTab === i ? styles.navbarMenuTextActive : styles.navbarMenuText}>{tab}</Text>
              </TouchableOpacity>;
            })}
          </ScrollView>
        }
        rightButton={
          <View>
            <TouchableOpacity onPress={() => Actions.country()}>
              <Image source={require('../../assets/imgs/ic_world.png')} style={styles.worldLogo} />
            </TouchableOpacity>
          </View>
        }
        style={styles.headerStyle}
        statusBar={{tintColor: '#6C0104'}} />
    );
  }

  render() {
    return (this.props.mode == 'main') ? this._renderMain() : this._renderTrend();
  }
}

const styles = StyleSheet.create({
  navbarLogo: {
    marginTop: 5,
    marginLeft: 10,
    height: 30,
    width: 30
  },
  worldLogo: {
    marginTop: 15,
    marginRight: 15,
  },
  navbarMenuLeftButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 50,
    paddingRight: 5,
  },
  navbarMenuRightButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 50,
  },
  navbarMenuButton: {
    paddingTop: 5,
    paddingBottom: 5,
    paddingLeft: 5,
    paddingRight: 5,
  },
  navbarMenuText: {
    color: '#D0021B'
  },
  navbarMenuTextActive: {
    color: '#FFFFFF'
  },
  headerStyle: {
    backgroundColor: '#6C0104',
  },
});
