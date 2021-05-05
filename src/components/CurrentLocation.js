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
          props.getCurLocDataFn(crd);
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
            <View style = {styled.resultBox}>
                <Text>
                    latitude: {JSON. stringify(props.coords.latitude)}
                </Text>
                <Text>
                   longitude: {JSON. stringify(props.coords.longitude)}
                </Text>
            </View>
            <View style = {styled.btnContainer}>
                <TouchableOpacity style = {styled.getBtn} onPress = {() => {console.log(props.all, ":all")}}>
                    <Text style = {styled.firstBtnText}>
                        Get 
                    </Text>
                    
                    <Text style = {styled.secondBtnText}>
                        current
                    </Text>
                    <Text style = {styled.thirdBtnText}>
                        coords
                    </Text>

                </TouchableOpacity>
            </View>

        </View>
    )
}

const mapStateToProps = (state) => ({
    all: state,
    coords: state.currentlocation.data
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
        flex: 0.5,
        width: 200,
        height: 200,
        borderRadius: 100,
        borderWidth: 0,
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
        fontSize: 25
    },
    secondBtnText: {
        fontSize: 34
    },
    thirdBtnText: {
        fontSize: 25
    }
})