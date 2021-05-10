import React from "react";
import  { View, Text, StyleSheet, Alert } from "react-native";
import Parse from 'parse/react-native.js';
import InputTextArea from "../styleComponents/InputTextArea";
import SubmitBtn from "../styleComponents/SubmitBtn";
import InnerText from "../styleComponents/InnerText";
import { connect } from "react-redux"
import getLogin from "../store/actions/getLogin";
import getPass from "../store/actions/getPass";
import getEmail from "../store/actions/getEmail";
import Colors from "../styleConstants/Colors";
import { AsyncStorage } from "@react-native-async-storage/async-storage"

Parse.setAsyncStorage(AsyncStorage);
const SignUpForm = (props) => {

  const signUp = () => {
  // Create a new instance of the user class
  let user = new Parse.User();
  user.set("username", props.username.toString());
  user.set("password", props.password.toString());
  user.set("email", props.email.toString());
  // other fields can be set just like with Parse.Object
  //user.set("phone", "415-392-0202");
  // user.add('friends', '_none');
  // user.set('friendRequest', false)
  
  user.signUp().then(function(user) {

              //create friendsList
              let FriendsList = Parse.Object.extend("FriendsList");
              let friendList = new FriendsList();
              friendList.set("user_id", user);
              friendList.add("friends", '_none');
              friendList.set("isFriendRequest", 'false');
              friendList.save();
          //------------------

      console.log('User created successful with name: ' + user.get("username") + ' and email: ' + user.get("email"));
      Alert.alert('Message', 'You was registrated successfully!');
      Parse.User.logOut(); //log out!!!!
      props.navigation.navigate('Home')
  }).catch(function(error){
      console.log("Error: " + error.code + " " + error.message);
      Alert.alert('Error', 'Something wrong! Try again...')
  });



  console.log(props.all);
}

    return (
        <View style = {styled.wrapper}>
            <Text style = {styled.title}> SignUp </Text>
            
            <InnerText>Set username</InnerText>
            <InputTextArea 
              placeholder = "username"
              onChangeText = {data => props.getLoginFn(data)}
              />
      
            <InnerText>Set password</InnerText>
            <InputTextArea
              secureTextEntry={true}  
              placeholder = "pasword"
              onChangeText = {data => props.getPassFn(data)}/>
            
            <InnerText>Set email</InnerText>
            <InputTextArea
              keyboardType = "email-address"
              placeholder = "email"
              onChangeText = {data => props.getEmailFn(data)}/>

            <SubmitBtn  text="Confirm" onPress={signUp}/>
            
        </View>
    )
}

const mapStateToProps = (state) => ({
  all:state,
  username: state.currentUserInfo.username,
  password: state.currentUserInfo.password,
  email: state.currentUserInfo.email
})

const mapDispatchToProps = (dispatch)=> {
  return {
    getLoginFn: (data) => dispatch(getLogin(data)),
    getPassFn: (data) => dispatch(getPass(data)),
    getEmailFn: (data) => dispatch(getEmail(data))
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(SignUpForm);

const styled = StyleSheet.create({
    wrapper: {
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor: Colors.mainBGcolor
    },
    title: {
      margin:10,
      fontSize:26
    },
    sub: {
      width: 400
    }
  })