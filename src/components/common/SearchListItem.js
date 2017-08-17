import React from 'react';
import { View, Image, TouchableOpacity, Text, StyleSheet } from 'react-native';

const SearchListItem = (props) => {
  return (
    <View style={{flex:1, backgroundColor: (props.rowID%2) === 0 ? '#99eaf1' : '#4cd9e6'}}>
      <TouchableOpacity onPress={props.onPress} style={styles.container}>
        <Image source={{uri: props.cover_wide}} style={styles.thumb} />
        <View style={styles.content}>
          <Text style={styles.detail} numberOfLines={1}>{props.title}</Text>
          <Text style={styles.detail}>{'\n'}{parseDuration(props.duration)}</Text>
        </View>
      </TouchableOpacity>
    </View>
  )
}

function parseDuration(secs) {
    secs = Number(secs);
    var hr = Math.floor(secs / 3600);
    var min = Math.floor(secs % 3600 / 60);
    var sec = Math.floor(secs % 3600 % 60);

    var hrDisplay = hr > 0 ? hr + (hr == 1 ? " hr " : " hrs ") : "";
    var minDisplay = min > 0 ? min + (min == 1 ? " min " : " mins ") : "";
    var secDisplay = sec > 0 ? sec + (sec == 1 ? " sec" : " secs") : "";
    return hrDisplay + minDisplay + secDisplay;
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    paddingVertical: 5,
    paddingLeft: 20,
    paddingRight: 20,
    flexDirection: 'row',
  },
  thumb: {
    flex: 1,
    marginVertical: 5,
    width: undefined,
    backgroundColor:'transparent',
  },
  content: {
    flex: 2,
    paddingVertical: 10,
    paddingLeft: 10,
    justifyContent: 'center',
  },
  detail: {
    flex: 1,
    color: '#282828',
  },
  playButtonStyle: {
    width: 25,
    marginTop: 10,
    marginRight: 10,
  }
});

export default SearchListItem
