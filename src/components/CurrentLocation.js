import React, { useEffect } from "react";
import { 
    View, 
    Text, 
    TouchableOpacity, 
    StyleSheet 
} from "react-native";
import { connect } from "react-redux";
import { Color } from "../styleConstants/Colors";
import geolocation from "@react-native-community/geolocation";
import { getCurLocData } from "../store/actions/getCurLocData"

const CurrentLocation = (props) => {

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
        geolocation.getCurrentPosition(info => console.log(info));//Another mathod to get current location
      }
        
    useEffect(() => {
      geoFindMe()
    }, [])

    return (
        <View style = {styled.conteiner}>
                <TouchableOpacity style = {styled.getBtn} onPress = {() => {console.log(props.all, ":all")}}>
                    <Text style = {styled.firstBtnText}>
                        Get current possition
                    </Text>
                </TouchableOpacity>
        </View>
    )
}

const mapStateToProps = (state) => ({
    all: state,
    coords: state.location.curPointData
  });

  const mapDispatchToProps = (dispatch) => ({
    getCurLocDataFn: (data) => dispatch(getCurLocData(data))
  })

export default connect(mapStateToProps, mapDispatchToProps)(CurrentLocation)

const styled = StyleSheet.create({
    conteiner: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    },
    getBtn: {
        width: 200,
        height: 60,
        backgroundColor: Color.mainBtnGetCurLoc,
        alignItems: "center",
        justifyContent: "center",
    },
    resultBox: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center"
    },
    btnContainer: {
        flex: 0.5,
        alignItems: "center",
        justifyContent: "center",
    },
    firstBtnText: {
        fontSize: 18
    },
})