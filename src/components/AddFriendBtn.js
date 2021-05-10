import React from "react";
import { View, Text, TouchableOpacity, TextInput, StyleSheet, Alert } from "react-native";
import InputTextArea from "../styleComponents/InputTextArea";
import SubmitBtn from "../styleComponents/SubmitBtn";
import Colors from "../styleConstants/Colors";
import { connect } from "react-redux";
import getFriendName from "../store/actions/getFriendName"


const AddFriendBtn = (props) => {

    async function isUserExistF () {
        const User = Parse.Object.extend("User");
        const query = new Parse.Query(User);
        query.equalTo("username", props.friend.name);
        const results = await query.find();
        //console.log(results, ':results');
        if (results.length === 0) { 
            Alert.alert ('', 'This user does not exist!');
            return false
        } else return true
    }

    async function isRequestExistF () {
        const FriendRequests = Parse.Object.extend("FriendRequests");
        const query = new Parse.Query(FriendRequests);
        query.equalTo("toUser", props.friend.name);
        const results = await query.find();
        //console.log(results, ':results');
        if (results.length !== 0) { 
            Alert.alert ('', 'The request to this user has been sent earlier!');
            return true
        } else return false
    }

    async function createFriendRequest () {
        let isExist = true
        let isRequestExist = false
        isExist = await isUserExistF (isExist);
        console.log(isExist)
        if (!isExist) return
        // isRequestExist = await isRequestExistF ();
        // if (isRequestExist) return

        const user = Parse.User.current();
        const FriendRequests = Parse.Object.extend("FriendRequests");
        const friendRequest = new FriendRequests();
        
        friendRequest.set("author", user);
        friendRequest.set("toUser", props.friend.name);
        friendRequest.set("isFriendRequestConfirm", false);
        await friendRequest.save();
        
        //get userId:
        const User = Parse.Object.extend("User");
        let query = new Parse.Query(User);
        query.equalTo("username", props.friend.name);
        const results = await query.find();
        const userId = results[0];
        console.log(userId)
        //change isFriendsRequest field in FriendList on true!!!
        let FriendsList = Parse.Object.extend("FriendsList");
        const query22 = new Parse.Query(FriendsList);
        query22.equalTo("user_id", userId);
        const results22 = await query22.find();
        console.log(results22);
    
        results22[0].set('isFriendRequest', 'true')
        await results22[0].save();

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
            <InputTextArea onChangeText = { (data) => props.getFriendNameFn(data)}/>
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
