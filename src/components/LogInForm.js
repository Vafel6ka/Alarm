import React from "react";
import { View, Text, StyleSheet, Alert, TouchableOpacity } from "react-native";
import Parse from 'parse/react-native.js';
import InputTextArea from "../styleComponents/InputTextArea";
import SubmitBtn from "../styleComponents/SubmitBtn";
import { connect } from "react-redux"
import allActions from '../store/actions/allActions'
import Colors from "../styleConstants/Colors";
import LogBtn from '../styleComponents/LogBtn';
import getRequestOnFriendship from "../store/actions/getRequestOnFriendship";

const LogIn = (props) => {

  async function getIsFriendRequest () {
    const user = Parse.User.current();
    const FriendsList = Parse.Object.extend("FriendsList");
    const query = new Parse.Query(FriendsList);
    query.equalTo("user_id", user);
    const friendsListCurrUserParseObj = await query.find();
    let result = friendsListCurrUserParseObj[0].get('isFriendRequest')
    console.log(result, ':isFriendRequest');
    props.getRequestOnFriendshipFn(result)
  }

  const logIn = () => {
    let user = Parse.User.logIn(props.username.toString(), props.password.toString())
      .then(user => {
        //get isFriendRequest props:
        getIsFriendRequest();
        //console.log(user['id'])
        console.log('We get '+ user.get("username") + ' and his email: ' + user.get("email"))
        props.navigation.navigate('Main');
        console.log(props.all)

    })
      .catch (error => {
        console.log(error, "Error!!!");
        console.log(props.all)
        Alert.alert('Error', 'Something wrong! Try again...')
      })
  }

  return (
    <View style={styled.wrapper}>
      <View style = {styled.btnBlock}>
        <View style = {styled.signUpBtn}>
          <LogBtn onPress = {() => props.navigation.navigate('Sign Up')}>
                    SignUp
          </LogBtn>  
        </View>    
      </View>
      <View style = {styled.titleBlock}>
        <Text style={styled.title}> Login</Text>
        <InputTextArea  placeholder = "username" 
                        onChangeText = {data => props.getLoginFn(data)}/>

        <InputTextArea  secureTextEntry={true}
                        placeholder = "password"
                        onChangeText = {data => props.getPassFn(data)}/>

        <TouchableOpacity style = {styled.chgPassBtn} onPress = {() => {}}>
          <Text style = {styled.chgPassText}>"Don't remember the password"</Text>
        </TouchableOpacity>

        <SubmitBtn text = "Submit" onPress = {logIn}/>
      </View>
    </View>
  )
}

const mapStateToProps = (state) => ({
    all:state,
    username: state.currentUserInfo.username,
    password: state.currentUserInfo.password,
    email: state.currentUserInfo.email,
    id: state.currentUserInfo.id,
    isRequest: state.friendshipRequest.isRequest
})

const mapDispatchToProps = (dispatch) => {
  return {
    getLoginFn: (data) => dispatch(allActions.getLogin(data)),
    getPassFn: (data) => dispatch(allActions.getPass(data)),
    getEmailFn: (data) => dispatch(allActions.getEmail(data)),
    getIdFn: (data) => dispatch(allActions.getId(data)),
    getRequestOnFriendshipFn: (data) => dispatch(allActions.getRequestOnFriendship(data)),
  }
}

export default connect(mapStateToProps, mapDispatchToProps)(LogIn);

const styled = StyleSheet.create({
    wrapper:{
      flex:1,
      alignItems:"center",
      justifyContent:"center",
      backgroundColor: Colors.mainBGcolor
    },
    title:{
      fontSize:26,
      margin:10
    },
    mailInput: {
      width:200,
      textAlign: "center"
    },
    chgPassBtn: {
      margin:10
    },
    chgPassText: {
      fontSize:10
    },
    btnBlock: {
      alignItems:"flex-end",
      flex: 0.07,
      width: "100%"
  },
    signUpBtn: {
      borderWidth: 1,
      borderRadius: 20,
      margin: 5
    },
  titleBlock: {
    flex:0.93,
    alignItems: "center",
    justifyContent:"center",
    marginBottom: "25%"
},
  })