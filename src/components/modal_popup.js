import React from 'react';
import {
  Modal,
  Text,
  View,
  TouchableOpacity,
  StyleSheet,
  ImageBackground,
} from 'react-native';
import {COLORS, SIZES} from '../constants/theme';
import IcClose from '../assets/svg/ic_close.svg';
import SvgIcon from '../common/SvgIcon';

export const ModalPopupSuccess = ({svg, visible, textSuccess, onClose}) => {
  return (
    <Modal
      statusBarTranslucent
      animationType="none"
      transparent={true}
      visible={visible}>
      <View style={styles.modal}>
        <View style={styles.container}>
          <TouchableOpacity onPress={onClose} style={styles.closeBtn}>
            <SvgIcon Icon={IcClose} />
          </TouchableOpacity>
          {/* header */}
          <View style={styles.bod}>
            <Text style={styles.text}>Danh mục sản phẩm</Text>
          </View>
        </View>
      </View>
    </Modal>
  );
};
const styles = StyleSheet.create({
  modal: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    // flex: 1,
    marginHorizontal: 16,
    backgroundColor: COLORS.white,
    borderRadius: 10,
    paddingHorizontal: 65,
    paddingVertical: 30,
    alignItems: 'center',
  },
  appBar: {flex: 0.12, justifyContent: 'center', alignItems: 'center'},
  closeBtn: {
    position: 'absolute',
    top: 10,
    left: 10,
    backgroundColor: 'red',
  },
  backgroundImage: {
    position: 'absolute',
    width: 300,
    height: 80,
  },
  text: {
    marginBottom: 20,
    lineHeight: 25,
    fontWeight: '700',
    fontFamily: 'Mulish',
    fontSize: SIZES.h2,
    textAlign: 'center',
    color: COLORS.dotSlide,
  },
});
