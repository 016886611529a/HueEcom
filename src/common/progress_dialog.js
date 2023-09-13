import React from 'react';
import {Modal, View, StyleSheet, Text, ActivityIndicator} from 'react-native';
import {COLORS} from '../constants/theme';

const ProgressDialog = ({visible}) => (
  <Modal
    transparent
    statusBarTranslucent
    onRequestClose={() => null}
    visible={visible}>
    <View
      style={{
        flex: 1,
        backgroundColor: 'rgba(0, 0, 0, .2)',
        alignItems: 'center',
        justifyContent: 'center',
      }}>
      <View
        style={{
          borderRadius: 10,
          backgroundColor: 'rgba(0, 0, 0, .5)',
          padding: 5,
        }}>
        <ActivityIndicator size="large" color={COLORS.primaryBlue} />
      </View>
    </View>
  </Modal>
);
export default ProgressDialog;
