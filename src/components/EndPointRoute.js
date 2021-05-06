import React from "react";
import { 
    View, 
    Text, 
    StyleSheet, 
    TouchableOpacity 
} from "react-native";
import { connect } from "react-redux";
import { getEndPointData } from "../store/actions/getEndPointData"

const EndPointRoute = (props) => {
    const tempCoord = {
        longitude: '1234',
        latitude: '4567'
    }

    return (
        <View style = {styled.container}>
            <Text>
                EndPoint Text
            </Text>
            <TouchableOpacity onPress={()=>{props.getEndPointDataFn(tempCoord)}
                }>
                    <Text>
                        curent pos:
                    </Text>
                <Text>
                    Latilude: {JSON.stringify(props.all.location.curPointData.latitude)}
                </Text>
                <Text>
                    Longitude: {JSON.stringify(props.all.location.curPointData.longitude)}
                </Text>
                <Text>---------</Text>
                <Text>
                        End point pos:
                    </Text>
                <Text>
                    Latilude: {JSON.stringify(props.all.location.endPointData.latitude)}
                </Text>
                <Text>
                    Longitude: {JSON.stringify(props.all.location.endPointData.longitude)}
                </Text>
            </TouchableOpacity>
        </View>
    )
}
const mapStateToProps = (state) => ({
    all: state,
  });

  const mapDispatchToProps = (dispatch) => ({
    getEndPointDataFn: (data) => dispatch(getEndPointData(data))
  })

export default connect(mapStateToProps, mapDispatchToProps) (EndPointRoute)

const styled = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
        justifyContent: "center"
    }
})