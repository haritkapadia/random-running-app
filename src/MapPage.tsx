import React from "react";
import { Text } from "native-base";
import { StyleSheet } from "react-native";
import Page from "./Page";
import MapboxGL from "@react-native-mapbox-gl/maps";

MapboxGL.setAccessToken(null);
MapboxGL.setConnected(true);

const rasterProps = {
	id: "mapSource", // must be unique within the app, is referred to by `RasterSource`s
	tileUrlTemplates: ["https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"],
	tileSize: 256,
};

const stylesheet = StyleSheet.create({
	map: {
		flex: 1,
		height: 400,
	}
});

class MapPage extends React.Component {
	componentDidMount() {
		// MapboxGL.setTelemetryEnabled(false);
	}

	render() {
		return (
			<Page navigation={this.props.navigation}>
				<Text>Before MapboxGL</Text>
				<MapboxGL.MapView style={stylesheet.map}>
					<MapboxGL.Camera zoomLevel={16} centerCoordinate={[-122.400021, 37.789085]}/>
					<MapboxGL.RasterSource {...rasterProps}>
						<MapboxGL.RasterLayer
						id="mapLayer"
						sourceID="mapSource"
						style={{rasterOpacity: 1}}
						/>
					</MapboxGL.RasterSource>
				</MapboxGL.MapView>
				<Text>After MapboxGL</Text>
			</Page>
		);
	}
}

export default MapPage;
