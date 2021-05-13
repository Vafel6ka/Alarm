import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styleConstants/Colors";
import { connect } from "react-redux";
import getId from "../store/actions/getId";
import rejectFriendshipRequest from "../store/actions/rejectFriendshipRequest";
import getRequestOnFriendship from "../store/actions/getRequestOnFriendship"
import SubmitBtn from "../styleComponents/SubmitBtn";


const AssignFriendForm = (props) => {
    const tempArr = [];
    async function getToUserFriendRequest () {
        //get current user name
        const array = []
        const user = Parse.User.current();
        const toUserName = user.get('username');
        console.log(toUserName)

        //get parse row friend request to assign
        const FriendRequests = Parse.Object.extend("FriendRequests");
        const query = new Parse.Query(FriendRequests);
        query.equalTo("toUser", toUserName);
        const results = await query.find();
        console.log(results, ':RES')
        //get friend name to assign
        results.forEach( user => {
            console.log(user.attributes.username, 'USERNAME')
            array.push(user.attributes.username)
        })
        return props.getIdFn(array)
      }
      
      useEffect(()=>getToUserFriendRequest(),[]);

      async function destroyFriendRequest (name) {
        //change isRequest if it was the last friend request
        if (props.friends.length <= 1) {
            props.getRequestOnFriendshipFn('false')
            // const FriendsList = Parse.Object.extend("FriendsList");
            // const query = new Parse.Query(FriendsList);
            console.log (Parse.User.current(),'ddddddddd')
        }

        function destroyParseObj (friendRequest) {
            return Parse.Object.destroyAll(friendRequest);
        }

        const currentUserName = Parse.User.current().get('username')  
        const FriendRequests = Parse.Object.extend("FriendRequests");
        const query = new Parse.Query(FriendRequests);
        query.equalTo("username", name);
        const friendRequests = await query.find();
        friendRequests.forEach( friendRequest => {
            if (friendRequest.attributes.username === name && 
                friendRequest.attributes.toUser === currentUserName) {
            console.log(friendRequest, '00000000');

            destroyParseObj(friendRequest).then(function() {
                    console.log('Done')
                }, function(error) {
                    console.log(error, "ERROR!!!")
                })
            }
        })
      }

      async function rej (id, name) {
        props.rejectFriendshipRequestFn(id);
        console.log(props.all);
        destroyFriendRequest(name);
        if (props.friends.length <= 1) {
        const user = Parse.User.current()
        const FriendsList = Parse.Object.extend("FriendsList");
        const query = new Parse.Query(FriendsList);
        query.equalTo("user_id", user);
        const result = await query.first();
        console.log(result,'11111111')
        result.set("isFriendRequest", 'false');
        result.save()};  
    //------------------

      }

    return (
        <View style = {styled.container}>
            <Text style = {styled.title}>Friend requests: </Text>
            {(props.friends.length !==0) ? 
            props.friends.map((friend, index) => 
            <View style = {styled.content}>
                <Text>He or she want to be your friend:</Text>
                <Text key = {index}>{friend}</Text>
                <View style = {styled.contentBtnBox}>
                    <SubmitBtn style = {{marginRight: 10}} text = {'accept'} onPress = {()=>{}}/> 
                    <SubmitBtn text = {'reject'} onPress = {()=>{rej(index, friend)}}/> 
                </View>
            </View>
            ) : <Text>Loading...</Text> }
        </View>
        
    )
}

const mapStateToProps = (state) => ({
    all:state,
    friends: state.currentUserInfo.id,
})

const mapDispatchToProps = (dispatch) => {
  return {
    getIdFn: (data) => dispatch(getId(data)),
    rejectFriendshipRequestFn: (data) => dispatch(rejectFriendshipRequest(data)),
    getRequestOnFriendshipFn: (data) => dispatch(getRequestOnFriendship(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignFriendForm);

const styled = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.mainBGcolor,
        paddingBottom: "20%"
    },
    title: {
        fontSize: 22,
        fontWeight: "600",
        margin: 5
    },
    content: {
        alignItems: "center",
        margin: 5,
    },
    contentBtnBox: {
        flexDirection: "row"
    }
})
