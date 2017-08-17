import React, { Component } from 'react';
import { View, Text } from 'react-native';

export class Detail extends Component {
  render() {
    return (
      <View>
        <Text>DETAIL</Text>

        <View>
          <ReadMore
            numberOfLines={3}
            renderTruncatedFooter={this._renderTruncatedFooter}
            renderRevealedFooter={this._renderRevealedFooter}>
            <Text></Text>
          </ReadMore>
        </View>
      </View>
    );
  }

  _renderTruncatedFooter = (handlePress) => {
    return (
      <Text onPress={handlePress}>
        Read more
      </Text>
    );
  }

  _renderRevealedFooter = (handlePress) => {
    return (
      <Text onPress={handlePress}>
        Show less
      </Text>
    );
  }
}

export class Rate extends Component {
  render() {
    return (
      <View>
        <Text>RATE THIS</Text>
      </View>
    );
  }
}

export class Related extends Component {
  render() {
    return (
      <View>
        <Text>RELATED</Text>
      </View>
    );
  }
}

export class Promoted extends Component {
  render() {
    return (
      <View>
        <Text>PROMOTED</Text>
      </View>
    );
  }
}

export class Cast extends Component {
  render() {
    return (
      <View>
        <Text>CAST</Text>
      </View>
    );
  }
}

export class Buffet extends Component {
  render() {
    return (
      <View>
        <Text>BUFFET</Text>
      </View>
    );
  }
}
