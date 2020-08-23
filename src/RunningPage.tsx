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
						<Button full
							onPress={() => {
								setRunPath(parseFloat(radius) * conversion[unit]);
								setRunning(!running);
							}}
							style={{ marginTop: 20, marginLeft: 10 }}
						>
							<NativeBaseText>{running === false ? "Start" : "Stop"}</NativeBaseText>
						</Button>
					</Form>
				</Content>

			</Content>
		</Page>
	);
};
export default RunningPage;
