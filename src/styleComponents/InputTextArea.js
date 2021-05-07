import React from "react";
import { TextInput, StyleSheet } from "react-native";

const InputTextArea = (props) => {
    return (
        <TextInput {...props} style={{...props.style,...styled.inputTextArea}}/>
    )
}

export default InputTextArea

const styled = StyleSheet.create({
    inputTextArea: {
        width:200,
        height:30,
        textAlign: "center",
        justifyContent:"center",
        padding: 5,
        margin: 5,
        shadowOpacity: 0.16,
        shadowColor: "black",
        shadowRadius:5,
        backgroundColor:"white",
        borderRadius:10
    }
})