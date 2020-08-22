import React, { useState } from "react";
import {
	Item,
	Input,
	Content,
	Picker,
	Container,
	Form,
} from "native-base";
import { StyleSheet, View, TouchableOpacity, PermissionsAndroid, Text, Dimensions } from "react-native";
import ToastExample from "../ToastExample";
import Page from "./Page";

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
const RunningPage = ({ navigation }) => {
	const [count, setCount] = useState(0);
	const windowWidth = Dimensions.get('window').width;
	return <Page navigation={navigation}>
		<View>
			<Item style={{
				marginTop: 20,
				marginLeft: 15,
				marginRight: 15,
				flex: 1,
			}}>
				<Input keyboardType="numeric" placeholder="Running distance" placeholderTextColor="black" />
			</Item>

			<Content>
				<Form style={{ marginRight: 15, flex: 1 }}>
					<Item regularpicker>
						<Picker
							mode="dropdown"
							placeholderIconColor="#007aff"
						//selectedValue={selected2}
						//onValueChange={(value: string) => setSelected2(value)}
						>
							<Picker.Item label="km" value="key0" />
							<Picker.Item label="mi" value="key1" />
							<Picker.Item label="m" value="key1" />
						</Picker>
					</Item>
				</Form>
			</Content>
		</View>
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={async () => {
					console.log("button clicked");
					setCount(count + 1);
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
					//					ToastExample.show("button clicked", ToastExample.SHORT)
				}}
			>
				<Text>Click me!</Text>
			</TouchableOpacity>
			<Text>clicked {count} times</Text>
		</View>
	</Page>
};
export default RunningPage;
