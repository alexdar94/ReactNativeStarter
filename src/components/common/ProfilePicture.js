import React, {
  Component,
} from 'react';
import {
  View,
  Image,
  Text,
  TouchableOpacity,
} from 'react-native';
import {
  connect,
} from 'react-redux';
import ImagePicker from 'react-native-image-picker';

import {
  registerData,
} from '../../actions';
import ResponsiveText from './ResponsiveText';

class ProfilePicture extends Component {
  selectPhotoTapped() {
    const options = {
      mediaType: 'photo',
      maxWidth: 500,
      maxHeight: 500,
      quality: 1.0,
      noData: true,
      storageOptions: {
        skipBackup: true,
        path: 'luve'
      }
    };

    ImagePicker.showImagePicker(options, (response) => {
      if (!response.didCancel && !response.error) {
        const source = { uri: response.uri, name: response.fileName || 'profile.jpg', type: response.type || 'image/jpg' };
        this.props.registerData({key:'profile_picture', val: source});
      }
    });
  }

  render() {
    if (this.props.profile_picture) {
      return (
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
          <Image style={[styles.avatar, {borderWidth: 0}]} borderRadius={75} source={{uri: this.props.profile_picture.uri}} />
        </TouchableOpacity>
      );
    } else {
      return (
        <TouchableOpacity onPress={this.selectPhotoTapped.bind(this)}>
            <Image style={[styles.avatar, {borderWidth: 2, overflow: 'hidden'}]} borderRadius={75} source={require('../../assets/imgs/profile/profilepictureplaceholder.png')}>
              <View style={{backgroundColor: 'rgba(0,0,0,0)', alignItems: 'center', justifyContent: 'flex-end', flex: 1, paddingBottom: 20}}>
                <ResponsiveText style={{fontWeight: 'bold', color: 'white'}}>ADD PHOTO</ResponsiveText>
              </View>
            </Image>
        </TouchableOpacity>
      );
    }
  }
}

const styles= {
  avatar: {
    width: 150,
    height: 150,
    borderColor: 'white',
    borderRadius: 75,
  },
}

const mapStateToProps = ({auth}) => {
  const { profile_picture } = auth;

  return { profile_picture };
};

export default connect(mapStateToProps, { registerData })(ProfilePicture);
