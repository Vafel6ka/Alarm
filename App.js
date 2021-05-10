import 'react-native-gesture-handler';
import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';

import { initializeParse } from "@parse/react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage"

import { NavigationContainer } from "@react-navigation/native"
import { createStackNavigator } from "@react-navigation/stack"

import LogInForm from './src/components/LogInForm';
import SignUpForm from './src/components/SignUpForm';
import MapScreen from './src/components/MapScreen';
import StartScreen from './src/components/StartScreen';
import AddFriendBtn from './src/components/AddFriendBtn'

//const Parse = require('parse/react-native.js');

const Stack = createStackNavigator();

initializeParse(
  'https://parseapi.back4app.com/',
  'uvtoYghX2m8ogGrAPsIe76Pedlj5foeRo0R6J7io',
  'rQFGHeqgBGxhCLGiNAp1WwAYlH8hYL0rfQpCsEy9'
);

const App = () => {
  return (
    <NavigationContainer>
      <Stack.Navigator>
        <Stack.Screen
          name = 'Home'
          component = {AddFriendBtn}
          //component = {StartScreen}
        />

        <Stack.Screen
          name = 'Log In'
          component = {LogInForm}
        />
        
        <Stack.Screen
          name = 'Main'
          component = {MapScreen}
        />

        <Stack.Screen
          name = 'Sign Up'
          component = {SignUpForm}
        />

        {/* <Stack.Screen
          name = 'Reset password'
          component = {ResetPassword}
        /> */}

      </Stack.Navigator>
    </NavigationContainer>
  )
}

const styled = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
