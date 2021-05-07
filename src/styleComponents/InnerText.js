import React from "react";
import { Text, StyleSheet } from "react-native";

const InnerText = (props) => {
    return (
        <Text {...props} style={{...props.style,...styled.innerText}}>
            {props.children}
        </Text>
    )   
}

export default InnerText

const styled = StyleSheet.create({
    innerText: {
        fontSize: 14
    }
})