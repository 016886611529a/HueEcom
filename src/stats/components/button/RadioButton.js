import React, { Component } from 'react';
import { View, TouchableOpacity, Text, StyleSheet } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import {
    selectedStoreByEcom,
    userInfo,
    selectedEcomByStore,
} from '../../features/home/homeSlice';

export default RadioButton = ({ PROP, TYPE = 'Default' }) => {
    const dispatch = useDispatch();
    return (
        <View
            // horizontal
            // showsHorizontalScrollIndicator={false}
            style={{ display: 'flex', flexDirection: 'row', flexWrap: 'wrap', width: '100%', borderColor: '#e6ebf1', }}>
            {PROP.map((e, index) => {
                return e.active ? (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button, styles.active, { borderColor: '#e6ebf1', }]}
                        onPress={() => {
                            //  dispatch(selectedStoreByEcom(e.key));
                            console.log(e.key);
                        }}>
                        <Text style={[styles.textWhite]}>{e.text}</Text>
                    </TouchableOpacity>
                ) : (
                    <TouchableOpacity
                        key={index}
                        style={[styles.button, styles.buttonNomal, { borderColor: '#e6ebf1', }]}
                        onPress={() => {
                            if (TYPE == 'Default') {

                                dispatch(selectedStoreByEcom(e.key));
                            } else {
                                dispatch(selectedEcomByStore(e.key));
                            }
                        }}>
                        <Text style={[styles.textActive]}>{e.text}</Text>
                    </TouchableOpacity>
                );
            })}
        </View>
    );
};

const styles = StyleSheet.create({
    button: {
        margin: 6,
        paddingLeft: 16,
        paddingRight: 16,
        paddingTop: 8,
        paddingBottom: 8,
        borderRadius: 48,
    },
    active: {
        backgroundColor: '#003ECF',
    },
    textActive: {
        color: '#00123D',
    },
    textWhite: {
        color: 'white',
    },
    buttonNomal: {
        borderColor: 'gray',
        borderWidth: 1,
    },
});
