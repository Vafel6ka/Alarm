import React from 'react';
import {
  ScrollView,
  StyleSheet,
  Text,
  View,
} from 'react-native';
import CurrentLocation from './src/components/CurrentLocation';
import EndPointRoute from './src/components/EndPointRoute';
import MapScreen from './src/components/MapScreen';
import TestRedComp from './src/components/TestRedComp';


const App = () => {

  return (
    <View style = {styled.container}>
      {/* <TestRedComp/>
      <Text>
        We're did it!!!
      </Text>
      <CurrentLocation/>
      <EndPointRoute/> */}
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
