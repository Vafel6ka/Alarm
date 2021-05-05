import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { connect } from "react-redux";
import { getCurLocData } from "../store/actions/getCurLocData"

const TestRedComp = (props) => {
    const temp = '12345';
    const baseSt = JSON. stringify(props.all)
    return (
        <View style = {styled.conteiner}>
            <TouchableOpacity onPress = {() => props.getCurLocDataFn(temp)}>
                <Text>
                    Press to change props
                </Text>
            </TouchableOpacity>
            <Text>
                {baseSt}
            </Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    all: state
  });

  const mapDispatchToProps = (dispatch) => ({
    getCurLocDataFn: (data) => dispatch(getCurLocData(data))
  })

export default connect(mapStateToProps, mapDispatchToProps)(TestRedComp)

const styled = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    btn: {
        alignItems: "center",
        justifyContent: "center",
        height: 70,
        width: 250,
        backgroundColor: "blue"
    }
})