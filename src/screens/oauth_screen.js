import React, {useState, useRef} from 'react';
import {
  View,
  Text,
  Button,
  TouchableOpacity,
  ImageBackground,
} from 'react-native';
import WebView from 'react-native-webview';
import SvgIcon from '../common/SvgIcon';
import icBack from '../assets/svg/icBack.svg';
import {useNavigation} from '@react-navigation/native';

function OAuthScreen({oauthUrl, onCodeReceived}) {
  const navigation = useNavigation();

  const webViewRef = useRef(null);
  const handleNavigationStateChange = newNavState => {
    if (newNavState.url.includes('code=')) {
      const codeStartIndex = newNavState.url.indexOf('code=') + 5;
      const codeEndIndex = newNavState.url.indexOf('&', codeStartIndex);
      const code = newNavState.url.substring(
        codeStartIndex,
        codeEndIndex !== -1 ? codeEndIndex : undefined,
      );

      if (code) {
        onCodeReceived(code);
      }
    }
  };

  return (
    <View style={{flex: 1}}>
      <ImageBackground
        resizeMode="stretch"
        source={require('../assets/images/appbar1.png')}
        style={{flex: 0.1}}
        // imageStyle={styles.backgroundImage}
      >
        <View style={{flexDirection: 'row', marginVertical: 15, top: 15}}>
          <TouchableOpacity
            onPress={() => {
              navigation.replace('Main');
            }}
            style={{left: 10, top: 5}}>
            <SvgIcon Icon={icBack} />
          </TouchableOpacity>
        </View>
      </ImageBackground>
      <WebView
        ref={webViewRef}
        incognito={true}
        source={{uri: oauthUrl}}
        onNavigationStateChange={handleNavigationStateChange}
      />
    </View>
  );
}

export default OAuthScreen;
