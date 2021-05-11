import React from "react";
import { View, Text, StyleSheet } from "react-native";
import Colors from "../styleConstants/Colors";
import { connect } from "react-redux";

const AssignFriendForm = (props) => {
    async function getToUserFriendRequest () {
        //get current user name
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
        results.map((friend, ind) => {
            let friendNameToAssign = friend.get('author');
            console.log(friendNameToAssign.get('username'))
        })
        
        
      }

      getToUserFriendRequest();

    return (
        <View style = {styled.container}>
            <Text>
                something - something
            </Text>
        </View>
    )
}

const mapStateToProps = (state) => ({
    all:state,
    friend: state.friend
})

const mapDispatchToProps = (dispatch) => {
  return {
    // getFriendNameFn: (data) => dispatch(getFriendName(data)),
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
