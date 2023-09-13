import * as React from "react";
import { Image, StyleSheet, View } from "react-native";

const Bg = () => {
  return (
    <View style={styles.bg}>
      <Image
        style={[styles.groupIcon, styles.groupIconLayout]}
        resizeMode="cover"
        source={require("../assets/group.png")}
      />
      <Image
        style={[styles.groupIcon1, styles.groupIconLayout]}
        resizeMode="cover"
        source={require("../assets/group1.png")}
      />
      <Image
        style={[styles.groupIcon2, styles.groupIconLayout]}
        resizeMode="cover"
        source={require("../assets/group2.png")}
      />
      <Image
        style={[styles.groupIcon3, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/group3.png")}
      />
      <Image
        style={[styles.vectorIcon, styles.iconPosition]}
        resizeMode="cover"
        source={require("../assets/vector.png")}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  groupIconLayout: {
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  iconPosition: {
    left: "0%",
    maxHeight: "100%",
    maxWidth: "100%",
    position: "absolute",
    overflow: "hidden",
  },
  groupIcon: {
    height: "95.21%",
    width: "91.73%",
    top: "4.63%",
    right: "4.85%",
    bottom: "0.16%",
    left: "3.41%",
  },
  groupIcon1: {
    height: "84.79%",
    width: "83.93%",
    right: "6.87%",
    bottom: "15.21%",
    left: "9.2%",
    top: "0%",
  },
  groupIcon2: {
    height: "78.14%",
    width: "49.1%",
    top: "21.71%",
    right: "19.14%",
    left: "31.76%",
    bottom: "0.15%",
  },
  groupIcon3: {
    height: "99.85%",
    width: "50.17%",
    right: "49.83%",
    bottom: "0.15%",
    top: "0%",
  },
  vectorIcon: {
    height: "0.31%",
    top: "99.69%",
    right: "0%",
    bottom: "0%",
    width: "100%",
    left: "0%",
  },
  bg: {
    flex: 1,
    height: 48,
    overflow: "hidden",
    width: "100%",
  },
});

export default Bg;
