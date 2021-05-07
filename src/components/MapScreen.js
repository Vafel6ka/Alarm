import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, C } from "react-native-maps";
import { connect } from "react-redux";
import geolocation from "@react-native-community/geolocation";
import { getCurLocData } from "../store/actions/getCurLocData";
import { getMeetPointData } from "../store/actions/getMeetPointData";
import LogBtn from "../styleComponents/LogBtn";
import logOutUser from "../store/actions/logOutUser"

const Parse = require('parse/react-native.js');

const MapScreen = (props) => {

    const geoFindMe = () => {
        function success(pos) {
          let crd = pos.coords;
          let lon = crd.longitude;
          let lat = crd.latitude;
          props.getCurLocDataFn({
            latitude: lat,
            longitude: lon,
            latitudeDelta: 0.01,
            longitudeDelta: 0.005
            });
        }
    
        function error(err) {
          console.warn(`ERROR(${err.code}): ${err.message}`);
        }
        if (geolocation) {
            geolocation.getCurrentPosition(success, error);
        } else { 
            console.log("Geolocation is not supported by this browser.");
        }
        //geolocation.getCurrentPosition(info => console.log(info));//Another mathod to get current location
      }

      console.log(props.all)

      useEffect(() => {
        geoFindMe()
      }, [])

      const getNewMarkerData = (e) =>{
        let coords = e.nativeEvent.coordinate
        console.log(coords)
        if (coords.latitude == props.latitude && coords.longitude == props.longitude) return 
            else {
                props.getMeetPointDataFn(coords)
                console.log(props.all) 
            }
      }

      const getUserLogOut = () => {
        Parse.User.logOut().then(() => {
          const currentUser = Parse.User.current();  // this will now be null
          console.log(currentUser)
        });
        props.logOutUserFn();
        console.log(props.all)
        props.navigation.navigate('Home')
      }

      async function setMarkData() {
        const user = Parse.User.current();
        const Mark = Parse.Object.extend("Mark");
            const mark = new Mark();
            mark.set("key", 'dddd');
            mark.set("coordinate", '{33,33}');
            mark.set('title', 'dsdsd');
            mark.set('description', 'dsddsdsdsd');
            mark.set("user", user);
            await mark.save();
            console.log(props.all)           
        }

    return (
        <View style = {styled.container}>
            <View style = {styled.btn}>
                <LogBtn onPress = {getUserLogOut}>
                    Log out
                </LogBtn>   
                <TouchableOpacity onPress = {geoFindMe} >
                    <Text>
                        Push
                    </Text>
                </TouchableOpacity>

                <Text>
                    Latilude:  {JSON.stringify(props.latitude)}
                </Text>
                <Text>
                    Longitude: {JSON.stringify(props.longitude)}
                </Text>
            </View>

            <MapView style={styled.mapScreen}
                region={props.all.location.initialRegion}
                //onRegionChange = {geoFindMe}
                // onPress = {(e)=>console.log(e.nativeEvent.coordinate)}>
                onPress = {getNewMarkerData}
                > 
                
                      
                <Marker
                    key = {1}
                    coordinate = {{ latitude : props.latitude , longitude: props.longitude }}
                    title = 'My current location'
                    description = 'dddd'
                />

                <Marker
                    key = {2}
                    coordinate = {props.meetPointCoord}
                    title = 'My meet point'
                    description = 'Meet Point'
                /> 
                
            </MapView>
            
        </View>
    )
}

const mapStateToProps = (state) => ({
    all: state,
    longitude: state.location.initialRegion.longitude,
    latitude: state.location.initialRegion.latitude,
    meetPointCoord: state.meetPoint.meetPointData
  });

const mapDispatchToProps = (dispatch) => ({
    getCurLocDataFn: (data) => dispatch(getCurLocData(data)),
    getMeetPointDataFn: (data) => dispatch(getMeetPointData(data)),
    logOutUserFn: () => dispatch(logOutUser())
    })

export default connect(mapStateToProps, mapDispatchToProps) (MapScreen)

const deviceDisplay = Dimensions.get("window");
const deviceHeight = deviceDisplay.height;
const deviceWidth = deviceDisplay.width;

const styled = StyleSheet.create ({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center",
    },
    mapScreen: {
        flex: 0.8, 
        width: deviceWidth,
        zIndex: 2
    },
    btn: {
        flex: 0.2,
        alignItems: "center",
        justifyContent: "center"
    }
})