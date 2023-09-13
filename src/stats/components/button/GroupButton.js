import React, {useState} from 'react';
import {View, StyleSheet, TouchableOpacity, Text, ScrollView} from 'react-native';
import {
  Border,
  Color,
  FontFamily,
  FontSize,
  Padding,
} from '../../../GlobalStyles';

const GroupButton = ({title, onPress, active = false}) => {
  return (
    <TouchableOpacity onPress={onPress}>
      <View style={active ? styles.item : styles.item1}>
        <Text style={[active ? styles.ttC : styles.bLcClr, styles.ttCTypo]}>
          {title}
        </Text>
      </View>
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  bLcClr: {
    color: Color.midnightblue_100,
    textAlign: 'center',
  },
  item1: {
    marginLeft: 8,

    borderWidth: 1,
    borderColor: '#e6ebf1',
    borderStyle: 'solid',
    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_5xs,
    borderRadius: Border.br_13xl,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  container: {
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
    marginVertical: 10,
  },
  item: {
    marginLeft: 8,

    paddingVertical: Padding.p_9xs,
    paddingHorizontal: Padding.p_5xs,
    borderRadius: Border.br_13xl,
    backgroundColor: Color.mediumslateblue_200,
    flexDirection: 'row',
    justifyContent: 'center',
    alignItems: 'center',
  },
  itemUnActive: {
    ...this.item,
    backgroundColor: 'white',
    borderColor: Color.mediumslateblue_200,
  },
  buttonUnActice: {
    backgroundColor: 'white',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  button: {
    backgroundColor: '#2196F3',
    borderRadius: 20,
    paddingVertical: 10,
    paddingHorizontal: 12,
    marginHorizontal: 5,
  },
  title: {
    fontSize: 12,
    fontWeight: 'bold',
    color: '#fff',
    alignSelf: 'center',
    textTransform: 'uppercase',
  },
  ttC: {
    color: Color.white,
    textAlign: 'center',
  },
  ttCTypo: {
    fontFamily: FontFamily.robotoRegular,
    lineHeight: 20,
    fontSize: FontSize.size_sm,
  },
  textUnActice: {
    ...this.ttC,
    color: Color.mediumslateblue_200,
  },
});

export default GroupButton;

export const GroupButtonHorizontal = ({buttons})=>{
    return buttons.map((e,index)=>{
        <GroupButton title={e.title} onPress={e.onPress} />
    });
}