import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import InputTextArea from "../styleComponents/InputTextArea";
import SubmitBtn from "../styleComponents/SubmitBtn";
import Colors from "../styleConstants/Colors";
import { connect } from "react-redux";
import getFriendName from "../store/actions/getFriendName"


const AddFriendBtn = (props) => {

    async function isUserExist () {
        const User = Parse.Object.extend("User");
        const query = new Parse.Query(User);
        query.equalTo("username", props.friend.name);
        const results = await query.find();
        console.log(results, ':results');
        if (results.length === 0) { 
            Alert.alert ('', 'This user does not exist!');
            return isExist = false
        }
    }

    async function isRequestExist () {
        
        const User = Parse.Object.extend("User");
        const query = new Parse.Query(User);
        query.equalTo("username", props.friend.name);
        const results = await query.find();
        console.log(results, ':results');
        if (results.length === 0) { 
            Alert.alert ('', 'This user does not exist!');
            return isExist = false
        }
    }

    async function createFriendRequest () {
        let isExist = true
        await isUserExist ();
        if (!isExist) return
        const user = Parse.User.current();
        const Friends = Parse.Object.extend("Friends");
            const friend = new Friends();
            friend.set("user", user);
            friend.set("toUser", props.friend.name);
            friend.set("isFriendRequestConfirm", false);
            await friend.save();

            //change friendRequest pole in props.friend.name on true!!!
            Alert.alert ('', 'Your request has been sent!')
        }

    async function add () {
        createFriendRequest ()
    }

    async function checkOnUniqueFriendRequst () {    
    }

    return (
        <View style = {styled.wrapper}>
            <Text>
                Send request to add friend to friends list
            </Text>
            <InputTextArea onChangeText = { (data) => {
                    props.getFriendNameFn(data);
                    console.log(props.friend)
                }
            }/>
            <SubmitBtn text = 'send' style = {styled.btn} onPress = {add}/>
        </View>
    )
}

const mapStateToProps = (state) => ({
    all:state,
    friend: state.friend
})

const mapDispatchToProps = (dispatch) => {
  return {
    getFriendNameFn: (data) => dispatch(getFriendName(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AddFriendBtn)

const styled = StyleSheet.create({
    wrapper:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor: Colors.mainBGcolor
    },
    btn : {
        width: 240
    }
  })
