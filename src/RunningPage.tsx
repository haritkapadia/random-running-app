import React from "react";
import {
	Text,
	Item,
	Input,
	Content
} from "native-base";
import { View, TouchableOpacity, StyleSheet } from "react-native";
import ToastExample from "../ToastExample";
import Page from "./Page";

const styles = StyleSheet.create({
	content: {
		display: "flex",
	},
	button: {
		alignItems: "center",
		backgroundColor: "#dddddd",
		padding: 10,
		marginBottom:10
	},
	container: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center"
	},
});

const RunningPage = ({navigation}) => (
	<Page navigation={navigation}>
		<Item rounded>
			<Input keyboardType="numeric" placeholder="Running distance" />
		</Item>
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => ToastExample.show("Button clicked!", ToastExample.SHORT)}
			>
				<Text>Click me!</Text>
			</TouchableOpacity>
		</View>
	</Page>
);

export default RunningPage;
