import React from "react";
import  { View, Text, StyleSheet, TouchableOpacity } from "react-native";

const Log__Btn = (props) => {
    return (
        <TouchableOpacity style={styled.container} onPress = {props.onPress}>
            <View style = {styled.btn} >
                <Text style = {styled.btnText}>{props.children}</Text>
            </View>
        </TouchableOpacity>      
    )
}

export default Log__Btn;

const styled = StyleSheet.create({
    container: {
        margin:5
    },
    btn: {
        width:"100%",
        justifyContent:"center",
        alignItems:"center"
    },
    btnText: {
        width:50,
        fontSize: 12,
        textAlign: "center"
    }
  })