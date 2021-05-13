import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker } from "react-native-maps";
import { connect } from "react-redux";
import geolocation from "@react-native-community/geolocation";
import allActions from "../store/actions/allActions"
import LogBtn from "../styleComponents/LogBtn";
import logOutUser from "../store/actions/logOutUser";
import Colors from "../styleConstants/Colors";
import AddFriendBtn from "./AssignFriendForm"


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

      const getNewMarkerData = (e) => {
        const toState = (obj) => {
            return new Promise (function (res) {
                res(props.getMeetPointMarkerDataFn(obj))
            })
        }

        let coords = e.nativeEvent.coordinate
        console.log(coords)
        if (coords.latitude == props.latitude && coords.longitude == props.longitude) return 
            else {

                const meetPointMarkerData = {
                    key: 2,
                    coordinates: {
                        latitude: coords.latitude,
                        longitude: coords.longitude
                    },
                    title: 'My meet point',
                    description: 'Meet Point'
                }

                props.getMeetPointDataFn(coords);
                toState(meetPointMarkerData).then ((data)=>{setMarkData(data)}) 
                console.log(props.all, "WARN!!!!");
                
            }
      }

      async function setMarkData(data) {
        const user = Parse.User.current();
        const Mark = Parse.Object.extend("Mark");
            const mark = new Mark();
            mark.set("key", data.payload.key.toString());
            mark.set("longitude", data.payload.coordinates.longitude.toString());
            mark.set("latitude", data.payload.coordinates.latitude.toString());
            mark.set('title', data.payload.title);
            mark.set('description', data.payload.description);
            mark.set("user", user);
            await mark.save();       
        }

      const getUserLogOut = () => {
        Parse.User.logOut().then(() => {
          const currentUser = Parse.User.current();  // this will now be null
          console.log(currentUser)
        });
        props.logOutUserFn();
        console.log(props.all);
        props.navigation.navigate('Logination form');
      }

    return (
        <View style = {styled.container}>
            <View style = {styled.btn}>
                <View style = {styled.logOutBtn}>
                    <LogBtn onPress = {getUserLogOut}>
                        Log out
                    </LogBtn>   
                </View>

                <View style = {styled.addFriendBtn}>
                     <LogBtn onPress = {()=>{
                         if ((props.isRequest == 'true')) props.navigation.navigate('Assign friend form')
                            else props.navigation.navigate('Add friend');
                     }}>
                         Add
                         <Text style = {styled.isRequestText}>
                            {(props.isRequest == 'false') ? '' : ' !'} 
                        </Text>
                    </LogBtn>   
                </View>

                <View style = {styled.toUserLocationBtn}>
                    <LogBtn onPress = {geoFindMe}>
                    Push
                    </LogBtn>   
                </View>
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
            <View style = {styled.bottomField}>
                <Text style = {styled.bottomFieldTitle}>
                    Your current location:
                </Text>
                <Text>
                    Latilude:  {JSON.stringify(props.latitude)}
                </Text>
                <Text>
                    Longitude: {JSON.stringify(props.longitude)}
                </Text>
            </View>
            
        </View>
    )
}

const mapStateToProps = (state) => ({
    all: state,
    longitude: state.location.initialRegion.longitude,
    latitude: state.location.initialRegion.latitude,
    meetPointCoord: state.meetPoint.meetPointData,
    isRequest: state.friendshipRequest.isRequest
  });

const mapDispatchToProps = (dispatch) => ({
    getCurLocDataFn: (data) => dispatch(allActions.getCurLocData(data)),
    getMeetPointDataFn: (data) => dispatch(allActions.getMeetPointData(data)),
    getMeetPointMarkerDataFn: (data) => dispatch(allActions.getMeetPointMarkerData(data)),
    logOutUserFn: () => dispatch(allActions.logOutUser())
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
        backgroundColor: Colors.mainBGcolor
    },
    mapScreen: {
        flex: 0.7, 
        width: deviceWidth,
        zIndex: 2
    },
    btn: {
        flex: 0.15,
        alignItems: "flex-end",
        justifyContent: "center",
        width: "100%",
        borderBottomWidth: 2
    },
    bottomField: {
        flex: 0.15,
        alignItems: "center",
        justifyContent: "center",
        width: "100%",
        borderTopWidth: 2,
    },
    bottomFieldTitle: {
        fontSize: 16,
        fontWeight: "800"
    },
    logOutBtn: {
        borderWidth: 1,
        borderRadius: 20,
        margin: 5,
    },
    toUserLocationBtn: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 20,
        margin: 5,
    },
    isRequestText: {
        color: "red",
        alignItems: "center",
        fontWeight: "800",
        // fontSize: 14
    },
    addFriendBtn: {
        alignItems: "center",
        justifyContent: "center",
        borderWidth: 1,
        borderRadius: 20,
        margin: 5,
    },

})