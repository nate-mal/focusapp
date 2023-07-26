import * as React from 'react';

import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';

export const RoundedButton = ({
  style = {},
  size = 125,
  textStyle = {},
  ...props
}) => {
  return (
    <TouchableOpacity style={[styles(size).radius, style]} {...props}>
      <Text style={[styles(size).text,textStyle]}>{props.title}</Text>
    </TouchableOpacity>
  );
};
const styles = (size) => {
  return StyleSheet.create({
    radius: {
      height: size,
      width: size,
      borderRadius: size / 2,
      borderColor: '#fff',
      borderWidth: 2,
      alignItems:'center',
      justifyContent:'center',
    
    },
    text : {fontSize : size / 3, color:'#fff'}
  });
};
