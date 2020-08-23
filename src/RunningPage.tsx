import React, { useState } from "react";
import {
	Item,
	Input,
	Content,
	Picker,
	Form,
	Button,
	Text as NativeBaseText
} from "native-base";
import { StyleSheet, View, TouchableOpacity, Text, Dimensions } from "react-native";
import ToastExample from "../ToastExample";
import { styleURL } from "./MapPage";
import Page from "./Page";
import MapboxGL from "@react-native-mapbox-gl/maps";
import geoViewport from "@mapbox/geo-viewport";

const styles = StyleSheet.create({

	button: {
		alignItems: "center",
		backgroundColor: "#dddddd",
		padding: 10,
		marginBottom: 10,
		marginTop: 20
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
});

const conversion = {
	"km": 1,
	"m": 0.001,
	"mi": 0.621371
};

const RunningPage = ({ navigation, running, setRunning, location, setRunPath, profile }) => {
	const [count, setCount] = useState(0);
	const [unit, setUnit] = useState("km");
	const [radius, setRadius] = useState("");
	return (
		<Page navigation={navigation} profile={profile}>
			<Content>
				<Form style={{ marginRight: 15, flex: 1 }}>
					<Item style={{
						marginTop: 20,
						marginLeft: 15,
						marginRight: 15,
						flex: 1,
					}}>
						<Input
						keyboardType="numeric"
						placeholder="Running distance"
						onChangeText={(text) => setRadius(text)}
						value={radius}
						/>
					</Item>
					<Item>
						<Picker
							mode="dropdown"
							placeholderIconColor="#007aff"
							selectedValue={unit}
							onValueChange={(value: string) => setUnit(value)}
						>
							<Picker.Item label="km" value="km" />
							<Picker.Item label="mi" value="mi" />
							<Picker.Item label="m" value="m" />
						</Picker>
					</Item>
				</Form>
				<Button>
					<NativeBaseText>{running === false ? "Start" : "Stop"}</NativeBaseText>
				</Button>
				<Text>{parseFloat(radius) * conversion[unit]} km</Text>
			</Content>
			<View style={styles.container}>
				<TouchableOpacity
					style={styles.button}
					onPress={async () => {
						console.log("button clicked");
						setCount(count + 1);
						ToastExample.getLocation((lat,lon)=>{
							console.log("got location:",lat,lon);
							ToastExample.maybeInit(lat,lon);
							console.log("initialised");
							const ret=ToastExample.calculateRoute(lat,lon,5,([lat,lon])=>{
								console.log("cb was called");
								console.log("lat:",lat);
								console.log("lon:",lon);
							},()=>{
								console.log("err was called");
							});
						});
						/*
						   const customSetRunPath = async (radius: number) => {
						   console.log("args: lat, long, radius", this.state.location[1], this.state.location[0], radius);
						   
						   await new Promise((resolve, reject) => ToastExample.calculateRoute(
						   this.state.location[1], this.state.location[0], radius, (out) => {
						   console.log("out before", out);
						   const newOut = out[0].map((el) => [out[1], el]);
						   console.log("out after", newOut);
						   resolve(newOut);
						   }
						   ));
						   };
						 */
						// https://github.com/react-native-mapbox-gl/maps/blob/master/example/src/examples/CreateOfflineRegion.js
						/*const { width, height } = Dimensions.get("window");
						   const MAPBOX_VECTOR_TILE_SIZE = 512;
						   const loc = ToastExample.getLocation(async (lat, lon) => {
						   console.log("aa");
						   const bounds = geoViewport.bounds(
						   [lon, lat],
						   12,
						   [width, height],
						   MAPBOX_VECTOR_TILE_SIZE
						   );
						   await MapboxGL.offlineManager.deletePack("offlinePack");
						   console.log("styleURL:", styleURL);
						   await MapboxGL.offlineManager.setTileCountLimit(10000000);
						   console.log("bounds:", bounds);
						   const pack = await MapboxGL.offlineManager.createPack(
						   {
						   name: "offlinePack",
						   styleURL: styleURL,
						   minZoom: 10,
						   maxZoom: 20,
						   //bounds:[[lon+.5,lat+.5],[lon-.5,lat-.5]]
						   bounds: [[lon + 2, lat + 2], [lon - 2, lat - 2]]
						   //								bounds:[[bounds[0],bounds[1]],[bounds[2],bounds[3]]]
						   },
						   (offlineRegion, status) => console.log("offline region status", offlineRegion, status),
						   (offlineRegion, err) => console.log("offline region error", offlineRegion, error)
						   );
						   console.log(pack);
						   });*/
						/*
						   ToastExample.getLocation((lat,lon)=>console.log("got loc: ",lat,",",lon));
						   try {
						   // https://reactnative.dev/docs/permissionsandroid
						   const result = await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
						   title: "Location Permission",
						   message: "Location is required to download a map of the area around you.",
						   buttonNeutral: "Ask me later",
						   buttonNegative: "Deny",
						   buttonPositive: "Grant",
						   });
						   console.log("granted:", result);
						   if (result !== PermissionsAndroid.RESULTS.GRANTED) {
						   console.log("permission denied");
						   return;
						   }
						   } catch (e) {
						   console.log("exception thrown");
						   }
						   ToastExample.run();*/
						ToastExample.getLocation((lat, lon) => console.log("got loc: ", lat, ",", lon));
						//ToastExample.show("button clicked", ToastExample.SHORT)
					}}
				>
					<Text>Click me!</Text>
				</TouchableOpacity>
				<Text>clicked {count} times</Text>
			</View>
			<Button
				full
				onPress={() => {
					setRunPath(parseFloat(radius) * conversion[unit]);
					setRunning(!running);
				}}
			>
				<NativeBaseText>{running === false ? "Start" : "Stop"}</NativeBaseText>
			</Button>
		</Page>
	);
};
export default RunningPage;
