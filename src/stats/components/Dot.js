import React from 'react';
import {View} from 'react-native';

const Dot = ({color}) => {
  return (
    <View
      style={{
        width: 8,
        height: 8,
        borderRadius: 5,
        backgroundColor: color,
      }}
    />
  );
};

export default Dot;
