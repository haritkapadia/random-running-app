import React from "react";
import { NativeEventEmitter, NativeModules } from "react-native";
import { Text } from "native-base";
import { StyleSheet } from "react-native";
import Page from "./Page";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { lineString } from "@turf/helpers";

const rasterProps = {
	id: "mapSource", // must be unique within the app, is referred to by `RasterSource`s
	tileUrlTemplates: ["https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"],
	tileSize: 256,
};

const stylesheet = StyleSheet.create({
	map: {
		flex: 1,
		height:400
	}
});
//const styleURL= "https://gist.githubusercontent.com/diagonalisability/7d66ac89e7d06ce474662f671b750bc6/raw/cd5f0dbfa6e0e7ae37bdcb4997b90939ba3f3b00/style.json";
//export {styleURL};
const mapStyles = {
	route: {
		lineColor: "red",
		lineCap: MapboxGL.LineJoin.Round,
		lineWidth: 7,
		lineOpacity: 0.7,
	},
};

// https://stackoverflow.com/questions/61994333/how-to-implement-geocoder-with-react-native-mapbox-gl-maps-library-in-react-nat
MapboxGL.setAccessToken('Mapbox token');
MapboxGL.setConnected(true);
class MapPage extends React.Component {
	componentDidMount() {
		console.log("componentDidMount");
		//		MapboxGL.setTelemetryEnabled(false);
		const eventEmitter= new NativeEventEmitter(NativeModules.ToastExample);
		this.eventListener= eventEmitter.addListener("locUpdate",(event)=>{
			console.log(event.lat);
			console.log(event.lon);
		});
	}
	componentWillUnmount() {
		this.eventListener.remove();
	}
	render() {
		return (
			<Page navigation={this.props.navigation}>
				<Text>Before MapboxGL</Text>
				<MapboxGL.MapView
					style={stylesheet.map}
					styleURL="https://gist.githubusercontent.com/diagonalisability/7d66ac89e7d06ce474662f671b750bc6/raw/490018ab10a51694b4c25dbc8b12d01f1e3d7b86/style.json"
				>
					<MapboxGL.Camera zoomLevel={16} centerCoordinate={[-122.400021, 37.789085]} />
					<MapboxGL.RasterSource {...rasterProps}>
						<MapboxGL.RasterLayer
						id="mapLayer"
						sourceID="mapSource"
						/>
					</MapboxGL.RasterSource>
					<MapboxGL.ShapeSource
						id="routeSource"
						shape={lineString([[-122.400021, 37.789085], [-122.400021, 37.790085], [-122.401021, 37.791085]])}
					>
						<MapboxGL.LineLayer id="routeFill" style={mapStyles.route} />
					</MapboxGL.ShapeSource>
				</MapboxGL.MapView>
				<Text>After MapboxGL</Text>
			</Page>
		);
	}
}

export default MapPage;
