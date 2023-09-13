import React, {useState, useEffect} from 'react';
import {
  View,
  StyleSheet,
  Text,
  StatusBar,
  TextInput,
  TouchableOpacity,
  Dimensions,
  Linking,
} from 'react-native';
import {COLORS, FontFamily, FontWeight, SIZES} from '../../constants/theme';
import SvgIcon from '../../common/SvgIcon';
import Logo from '../../assets/svg/logo.svg';
import Icon from 'react-native-vector-icons/FontAwesome';
import {FontSize} from '../../GlobalStyles';
import {validatePassword, validateUsername} from '../../helper/validations';
import {useNavigation} from '@react-navigation/native';
import OAuthScreen from '../oauth_screen';
import AsyncStorage from '@react-native-async-storage/async-storage';
import ProgressDialog from '../../common/progress_dialog';
import {ToastHelper} from '../../helper/toast.helper';

const LoginScreen = () => {
  const oauthRedirectUrl = 'https://hueecom.thuathienhue.gov.vn';
  const oauthClientId = 'huecit-ecommerce';
  const oauthClientSecret = 'hWd8y1Tg2XbovbohSaYRUFBhoYLUuDKS';
  const oauthAuthorizeUrl = `https://sso.huecity.vn/auth/realms/hues/protocol/openid-connect/auth?response_type=code&client_id=${oauthClientId}&redirect_uri=${oauthRedirectUrl}`;
  const tokenExchangeUrl =
    'https://sso.huecity.vn/hues/protocol/openid-connect/token';
  const userInfourl =
    'https://sso.huecity.vn/hues/protocol/openid-connect/userinfo';

  const navigation = useNavigation();
  const screenWidth = Dimensions.get('window').width - 30 * 1.2;

  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [isUsernameFocused, setIsUsernameFocused] = useState(false);
  const [isPasswordFocused, setIsPasswordFocused] = useState(false);
  const [usernameError, setUsernameError] = useState('');
  const [passwordError, setPasswordError] = useState('');
  const [showOAuthScreen, setShowOAuthScreen] = useState(false);
  const [code, setCode] = useState(null);
  const [accessToken, setAccessToken] = useState(null);
  const [refreshToken, setRefreshToken] = useState(null);
  const [dataField, setDataField] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [isAlreadyAuth, setIsAlreadyAuth] = useState(false);

  const onChangeUsername = value => {
    setUsername(value);
  };
  const onChangePassword = value => {
    setPassword(value);
  };
  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  const handleCodeReceived = code => {
    if (code == '' || code.length < 70) {
      ToastHelper.showToast('Đăng nhập không thành công', 'red');
    } else {
      setCode(code);
      setShowOAuthScreen(false);
    }
  };

  const handleLogin = () => {
    const usernameValidation = validateUsername(username);
    const passwordValidation = validatePassword(password);

    setIsLoading(true);
    setShowOAuthScreen(true);
  };

  useEffect(() => {
    async function loadData() {
      setIsLoading(true);
      var refreshToken = await AsyncStorage.getItem('access_token');
      var accessToken = await AsyncStorage.getItem('refresh_token');
      var data = await AsyncStorage.getItem('data');
      var type = await AsyncStorage.getItem('type');

      if (
        refreshToken &&
        accessToken &&
        data &&
        type &&
        refreshToken !== '' &&
        accessToken !== '' &&
        data !== '' &&
        type !== ''
      ) {
        var tdata = JSON.parse(data);
        if (tdata) {
          global.data = tdata;
          global.normal = type == '1';
          setIsLoading(false);
          navigation.replace('User', {data: global.data});
          return;
        }
      }
      setIsLoading(false);
    }
    loadData();
  }, []);

  useEffect(() => {
    if (code) {
      fetch(tokenExchangeUrl, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/x-www-form-urlencoded',
        },
        body: `code=${code}&client_id=${oauthClientId}&client_secret=${oauthClientSecret}&redirect_uri=${oauthRedirectUrl}&grant_type=authorization_code`,
      })
        .then(response => response.json())
        .then(data => {
          const receivedAccessToken = data.access_token;
          const refreshToken = data.refresh_token;
          if (receivedAccessToken && refreshToken) {
            setAccessToken(receivedAccessToken);
            setRefreshToken(refreshToken);
          } else {
            setIsLoading(false);
            ToastHelper.showToast('Đăng nhập không thành công', 'red');
          }
        })
        .catch(error => {
          setIsLoading(false);
          ToastHelper.showToast('Đăng nhập không thành công', 'red');
          console.error('Lỗi khi trao đổi mã code:', error);
        });
    }
  }, [code]);

  useEffect(() => {
    if (accessToken) {
      fetch(userInfourl, {
        headers: {
          Authorization: `Bearer ${accessToken}`,
        },
      })
        .then(response => response.json())
        .then(data => {
          if (data) {
            setDataField(data);
          } else {
            setIsLoading(false);
            ToastHelper.showToast('Đăng nhập không thành công', 'red');
          }
        })
        .catch(error => {
          setIsLoading(false);
          ToastHelper.showToast('Đăng nhập không thành công', 'red');
          console.error('Lỗi khi gọi API:', error);
        });
    }
  }, [accessToken]);

  useEffect(() => {
    if (dataField && dataField.preferred_username) {
      fetch(
        `https://hueecom.thuathienhue.gov.vn/API/QuanLyApi/AppApi/Login?UserName=${dataField.preferred_username}`,
        {
          method: 'GET',
          headers: {
            'Content-Type': 'application/x-www-form-urlencoded',
          },
        },
      )
        .then(response => response.json())
        .then(data => {
          if (data && data.thongtindoanhgnhiep) {
            global.data = dataField;
            if (data.thongtindoanhgnhiep == '-1') {
              global.normal = true;
            } else {
              global.normal = false;
            }

            AsyncStorage.setItem('access_token', accessToken);
            AsyncStorage.setItem('refresh_token', refreshToken);
            AsyncStorage.setItem('data', JSON.stringify(global.data));
            AsyncStorage.setItem('type', global.normal ? '1' : '0');
            setIsLoading(false);
            navigation.replace('User', {data: global.data});
          } else {
            setIsLoading(false);
            ToastHelper.showToast('Đăng nhập không thành công', 'red');
          }
        })
        .catch(error => {
          setIsLoading(false);
          ToastHelper.showToast('Đăng nhập không thành công', 'red');
          console.error('Lỗi khi trao đổi mã code:', error);
        });
    }
  }, [dataField]);

  return (
    <View style={styles.container}>
      <StatusBar
        barStyle={'dark-content'}
        backgroundColor="transparent"
        translucent
      />

      {showOAuthScreen ? (
        <OAuthScreen
          oauthUrl={oauthAuthorizeUrl}
          onCodeReceived={handleCodeReceived}
        />
      ) : (
        <>
          <View style={styles.header}>
            <SvgIcon Icon={Logo} />
          </View>
          <View style={styles.body}>
            {/* <Text style={styles.bodyTxt}>Đăng nhập</Text> */}
            <View style={[styles.formLogin, {width: screenWidth}]}>
              {/* tài khoản */}

              {/* <Text style={styles.subtitle}>Tài khoản</Text> */}
              <View
              // style={[
              //   styles.line,
              //   {
              //     borderRadius: isUsernameFocused ? 8 : 8,
              //     borderColor: isUsernameFocused
              //       ? COLORS.primaryBlue
              //       : COLORS.itemCategory,
              //   },
              // ]}
              >
                <View style={{margin: -5}}>
                  {/* <TextInput
                    style={styles.input}
                    placeholder={'Số định danh cá nhân (CCCD)'}
                    placeholderTextColor={COLORS.primaryBlueOpacity}
                    value={username}
                    onChangeText={onChangeUsername}
                    onFocus={() => setIsUsernameFocused(true)}
                    onBlur={() => setIsUsernameFocused(false)}
                  /> */}
                </View>
              </View>
              {/* {usernameError !== '' && (
                <Text style={styles.errorText}>{usernameError}</Text>
              )} */}
              {/* mật khẩu */}
              <View style={{marginVertical: 20}}>
                {/* <Text style={styles.subtitle}>Mật khẩu</Text> */}
                <View
                // style={[
                //   styles.line,
                //   {
                //     flexDirection: 'row',
                //     borderRadius: isPasswordFocused ? 8 : 8,
                //     borderColor: isPasswordFocused
                //       ? COLORS.primaryBlue
                //       : COLORS.itemCategory,
                //   },
                // ]}
                >
                  {/* <View
                    style={{
                      flex: 1,
                      margin: -5,
                    }}>
                    <TextInput
                      secureTextEntry={!showPassword}
                      style={styles.input}
                      placeholder={'***********'}
                      placeholderTextColor={COLORS.primaryBlueOpacity}
                      value={password}
                      onChangeText={onChangePassword}
                      onFocus={() => setIsPasswordFocused(true)}
                      onBlur={() => setIsPasswordFocused(false)}
                    />
                  </View> */}
                  {/* <View
                    style={{
                      position: 'absolute',
                      top: 10,
                      right: 15,
                    }}>
                    <TouchableOpacity
                      activeOpacity={0.5}
                      onPress={toggleShowPassword}>
                      <Icon
                        name={showPassword ? 'eye' : 'eye-slash'}
                        size={SIZES.h2}
                        color={COLORS.placeholder}
                      />
                    </TouchableOpacity>
                  </View> */}
                </View>
                {passwordError !== '' && (
                  <Text style={styles.errorText}>{passwordError}</Text>
                )}
                {/* button */}
                {isLoading ? (
                  <ProgressDialog />
                ) : (
                  <TouchableOpacity
                    activeOpacity={0.8}
                    onPress={handleLogin}
                    style={styles.button}>
                    <Text style={styles.txtButton}>Đăng nhập với HUE-S</Text>
                  </TouchableOpacity>
                )}
              </View>
              <View
                style={{
                  flexDirection: 'column',
                  top: 20,
                }}>
                {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('User');
              }}
              style={[styles.button, {top: -5}]}>
              <Text style={styles.txtButton}>User</Text>
            </TouchableOpacity> */}
                {/* <TouchableOpacity
              activeOpacity={0.8}
              onPress={() => {
                navigation.navigate('StatsScreen');
              }}
              style={styles.button}>
              <Text style={styles.txtButton}>Doanh nghiep</Text>
            </TouchableOpacity> */}
              </View>
            </View>
          </View>
        </>
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {flex: 1, backgroundColor: COLORS.backGround},
  header: {
    flex: 0.3,

    justifyContent: 'center',
    alignItems: 'center',
  },
  body: {
    flex: 1,
  },
  bodyTxt: {
    alignSelf: 'center',
    lineHeight: 32,
    fontWeight: '700',
    fontSize: SIZES.h0,
    color: COLORS.textColor,
  },
  formLogin: {
    marginVertical: 32,
    marginHorizontal: 18,
  },
  subtitle: {
    fontFamily: FontFamily.roboto,
    fontWeight: '500',
    color: COLORS.textColor,
    fontSize: SIZES.h4,
    lineHeight: 24,
    bottom: 4,
  },

  line: {
    borderWidth: 1,
    borderRadius: 8,
    borderColor: COLORS.itemCategory,
  },
  input: {
    paddingVertical: 12,
    paddingHorizontal: 16,
    fontFamily: FontFamily.roboto,
    fontSize: SIZES.h4,
    fontWeight: FontWeight.fontWeightNormal,
    lineHeight: 24,
  },
  button: {
    backgroundColor: COLORS.primaryBlue,
    borderRadius: 8,
    paddingVertical: 8,
    top: 22,
  },
  txtButton: {
    fontFamily: FontFamily.roboto,
    color: 'white',
    fontSize: 18,
    fontWeight: '600',
    lineHeight: 24,
    alignSelf: 'center',
  },
  errorText: {
    color: 'red',
    fontFamily: FontFamily.roboto,
    fontSize: SIZES.h5,
    marginTop: 5,
  },
});

export default LoginScreen;
