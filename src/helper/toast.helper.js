import _ from 'lodash';
import React from 'react';
import {StyleSheet} from 'react-native';
import Toast from 'react-native-easy-toast';
import {COLORS} from '../constants/theme';

export class ToastHelper {
  static toast;
  static setToast(toast) {
    this.toast = toast;
  }
  static showToast = (message, backgroundColor = 'black', duration = 750) => {
    if (
      !!this.toast &&
      this.toast.props.style.backgroundColor !== backgroundColor
    ) {
      this.toast.props.style.backgroundColor = backgroundColor;
    }
    this.toast?.show(message, duration);
  };

  static showToastFirstError = errors => {
    const firstMessage = _.values(errors)[0];
    if (!!firstMessage) {
      this.showToast(firstMessage, COLORS.title);
    }
  };

  static ToastContainer() {
    return (
      <Toast
        ref={ref => ToastHelper.setToast(ref)}
        positionValue={700}
        fadeInDuration={500}
        fadeOutDuration={1000}
        textStyle={styles.toastText}
        style={styles.container}
      />
    );
  }
}

const styles = StyleSheet.create({
  container: {
    borderRadius: 8,
    backgroundColor: 'black',
  },
  toastText: {color: 'white'},
});
