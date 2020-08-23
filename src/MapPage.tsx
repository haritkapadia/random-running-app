import React from "react";
import { StyleSheet } from "react-native";
import Page from "./Page";
import MapboxGL from "@react-native-mapbox-gl/maps";
import { lineString, point } from "@turf/helpers";

const rasterProps = {
	id: "mapSource", // must be unique within the app, is referred to by `RasterSource`s
	tileUrlTemplates: ["https://maps.wikimedia.org/osm-intl/{z}/{x}/{y}.png"],
	tileSize: 256,
};

const stylesheet = StyleSheet.create({
	map: {
		flex: 1,
	}
});
const styleURL= "https://gist.githubusercontent.com/diagonalisability/7d66ac89e7d06ce474662f671b750bc6/raw/cd5f0dbfa6e0e7ae37bdcb4997b90939ba3f3b00/style.json";
export {styleURL};
const mapStyles = {
	runPath: {
		lineColor: "red",
		lineCap: MapboxGL.LineJoin.Round,
		lineWidth: 7,
		lineOpacity: 0.7,
	},
	runPathStart: {
		circleRadius: 7,
		circleColor: "red",
		circleOpacity: 1,
	},
	location: {
		circleRadius: 10,
		circleColor: "blue",
		circleOpacity: 1,
	}
};

// https://stackoverflow.com/questions/61994333/how-to-implement-geocoder-with-react-native-mapbox-gl-maps-library-in-react-nat
MapboxGL.setAccessToken('Mapbox token');
MapboxGL.setConnected(true);

class MapPage extends React.Component<{runPath: number[][], location: number[], setLocation}> {
	render() {
		return (
			<Page navigation={this.props.navigation}>
				<MapboxGL.MapView
					style={stylesheet.map}
					styleURL="https://gist.githubusercontent.com/diagonalisability/7d66ac89e7d06ce474662f671b750bc6/raw/490018ab10a51694b4c25dbc8b12d01f1e3d7b86/style.json"
				>
					<MapboxGL.Camera
					zoomLevel={16}
					centerCoordinate={this.props.runPath.length < 2 ? this.props.location : this.props.runPath[0]}
					/>
					<MapboxGL.RasterSource {...rasterProps}>
						<MapboxGL.RasterLayer
						id="mapLayer"
						/>
					</MapboxGL.RasterSource>
					{
						this.props.runPath.length < 2 ? null : (
							<>
								<MapboxGL.ShapeSource
									id="runPathSource"
									shape={lineString(this.props.runPath)}
								>
									<MapboxGL.LineLayer id="runPathFill" style={mapStyles.runPath} />
								</MapboxGL.ShapeSource>
								<MapboxGL.ShapeSource
									id="runPathStartSource"
									shape={point(this.props.runPath[0])}
								>
									<MapboxGL.CircleLayer id="runPathStartFill" style={mapStyles.runPathStart} />
								</MapboxGL.ShapeSource>
							</>
						)
					}
					<MapboxGL.ShapeSource
						id="locationSource"
						shape={point(this.props.location)}
					>
						<MapboxGL.CircleLayer id="locationFill" style={mapStyles.location} />
					</MapboxGL.ShapeSource>
				</MapboxGL.MapView>
			</Page>
		);
	}
}

export default MapPage;
