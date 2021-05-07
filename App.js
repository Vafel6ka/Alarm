import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import MapScreen from './src/components/MapScreen';
import { initializeParse } from "@parse/react-native";
import { AsyncStorage } from "@react-native-async-storage/async-storage"

const Parse = require('parse/react-native.js');

initializeParse(
  'https://parseapi.back4app.com/',
  'uvtoYghX2m8ogGrAPsIe76Pedlj5foeRo0R6J7io',
  'rQFGHeqgBGxhCLGiNAp1WwAYlH8hYL0rfQpCsEy9'
);

async function creatPost() {
  const MeetPoint = Parse.Object.extend("MeetPoint");
        const meetPoint = new MeetPoint();
        meetPoint.set("title", 'aaa');
        meetPoint.set("discription", 'bbb');
        meetPoint.set('latitude', '12');
        meetPoint.set('longitude', '33');
        await meetPoint.save();
      console.log('creacte meetPoint post')
  }
  creatPost()
const App = () => {

  return (
    <View style = {styled.container}>
      <MapScreen/>
    </View>
  );
};

const styled = StyleSheet.create({
  container: {
    flex: 1,
    alignItems: "center",
    justifyContent: "center"
  }
});

export default App;
