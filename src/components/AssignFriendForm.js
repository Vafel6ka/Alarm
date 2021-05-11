import React, { useEffect } from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styleConstants/Colors";
import { connect } from "react-redux";
import getId from "../store/actions/getId"

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
      
      useEffect(()=>getToUserFriendRequest(),[])
    return (
        <View style = {styled.container}>  
            {props.friends.map(friend => 
            <View>
                <Text>Friend to request:</Text>
                <Text>{friend}</Text>
            </View>
            )}
        </View>
        
    )
}

const mapStateToProps = (state) => ({
    all:state,
    friends: state.currentUserInfo.id
})

const mapDispatchToProps = (dispatch) => {
  return {
    getIdFn: (data) => dispatch(getId(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(AssignFriendForm);

const styled = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: Colors.mainBGcolor
    },
})
