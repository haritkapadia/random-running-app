import React from "react";
import { Text } from "native-base";
import { StyleSheet } from "react-native";
import Page from "./Page";
import MapboxGL from "@react-native-mapbox-gl/maps";
// https://stackoverflow.com/questions/61994333/how-to-implement-geocoder-with-react-native-mapbox-gl-maps-library-in-react-nat
MapboxGL.setAccessToken('Mapbox token');
MapboxGL.setConnected(true);
const rasterProps = {
	id: "mapSource", // must be unique within the app, is referred to by `RasterSource`s
	tileUrlTemplates: ["https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"],
	tileSize: 256,
};
const stylesheet = StyleSheet.create({
	map: {
		flex: 1,
		height: 400
	}
});
class MapPage extends React.Component {
	componentDidMount() {
		//		MapboxGL.setTelemetryEnabled(false);
	}
	render() {
		return (
			<Page navigation={this.props.navigation}>
				<Text>Before MapboxGL</Text>
				<MapboxGL.MapView style={stylesheet.map} styleURL="https://gist.githubusercontent.com/diagonalisability/7d66ac89e7d06ce474662f671b750bc6/raw/490018ab10a51694b4c25dbc8b12d01f1e3d7b86/style.json">
						<MapboxGL.Camera zoomLevel={16} centerCoordinate={[-122.400021, 37.789085]}/>
						<MapboxGL.RasterSource {...rasterProps}>
							<MapboxGL.RasterLayer
							id="mapLayer"
							sourceID="mapSource"
							/>
						</MapboxGL.RasterSource>
					</MapboxGL.MapView>
					<Text>After MapboxGL</Text>
			</Page>
		);
	}
}

export default MapPage;
