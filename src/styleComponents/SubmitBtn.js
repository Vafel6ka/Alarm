import React from "react";
import { TouchableOpacity, Text, StyleSheet } from "react-native";

const submitBtn = (props) => {
    return (
        <TouchableOpacity {...props} style={{...props.style,...styled.submitBtn}}>
            <Text style={styled.textArea}>{props.text}</Text>
        </TouchableOpacity>
    )
}

export default submitBtn

const styled = StyleSheet.create({
    submitBtn: {
        width:90,
        height:30,
        alignItems: "center",
        justifyContent:"center",
        padding: 5,
        marginTop: 5,
        marginBottom: 5,
        shadowOpacity: 0.16,
        shadowColor: "black",
        shadowRadius:5,
        backgroundColor:"black",
        borderRadius:10
    },
    textArea: {
        color:"white",
        fontSize: 15,
    }
})