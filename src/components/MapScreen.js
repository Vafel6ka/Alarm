import React, { useEffect } from "react";
import { View, Text, TouchableOpacity, StyleSheet, Dimensions } from "react-native";
import MapView, { Marker, C } from "react-native-maps";
import { connect } from "react-redux";
import geolocation from "@react-native-community/geolocation";
import { getCurLocData } from "../store/actions/getCurLocData"

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

      const getNewMarker = (e) =>{
          console.log(e.nativeEvent.coordinate)
        return (   
            <Marker                   
            key = {new Date()}
            coordinate = {{latitude : 37.78576288265525 , longitude: -122.40732739703857}}
            title = 'My current location'
            description = 'dddd'
        />
        )
      }

    return (
        <View style = {styled.container}>
            <View style = {styled.btn}>
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
                onPress = {getNewMarker}
                > 
                
                      
                <Marker
                key = {new Date()}
                    coordinate = {{ latitude : props.latitude , longitude: props.longitude }}
                    title = 'My current location'
                    description = 'dddd'
                />

                {/* <Marker
                key = {new Date()}
                    coordinate = {{ latitude : 37.78576288265525 , longitude: -122.40732739703857 }}
                    title = 'My current location'
                    description = 'dddd'
                /> */}
                
            </MapView>
            
        </View>
    )
}

const mapStateToProps = (state) => ({
    all: state,
    longitude: state.location.initialRegion.longitude,
    latitude: state.location.initialRegion.latitude
  });

const mapDispatchToProps = (dispatch) => ({
    getCurLocDataFn: (data) => dispatch(getCurLocData(data))
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
        borderColor: "red",
        borderWidth: 2
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