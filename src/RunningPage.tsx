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
import { StyleSheet, View, TouchableOpacity, PermissionsAndroid, Text } from "react-native";
import ToastExample from "../ToastExample";
import Page from "./Page";
import {styleURL} from "./MapPage";
import MapboxGL from "@react-native-mapbox-gl/maps";

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

const RunningPage = ({ navigation, running, setRunning, location, setRunPath }) => {
	const [count, setCount] = useState(0);
	const [unit, setUnit] = useState("km");
	const [radius, setRadius] = useState("");
	return <Page navigation={navigation}>
		<Content>
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
						onChangeText={(text) => setRadius(text) }
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
					<Button
						onPress={() => {
							setRunPath(parseFloat(radius) * conversion[unit]);
							setRunning(!running);
						}}
					>
						<NativeBaseText>{running === false ? "Start" : "Stop"}</NativeBaseText>
					</Button>
				</Form>
				<Text>{parseFloat(radius) * conversion[unit]} km</Text>
			</Content>
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={async () => {
					console.log("button clicked");
					setCount(count + 1);
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
					ToastExample.run();
					//ToastExample.show("button clicked", ToastExample.SHORT)
				}}
			>
				<Text>Click me!</Text>
			</TouchableOpacity>
			<Text>clicked {count} times</Text>
		</View>
		</Content>
	</Page>
};
export default RunningPage;
