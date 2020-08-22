import React,{useState} from "react";
import {
	Item,
	Input,
	Content
} from "native-base";
import { StyleSheet,View,TouchableOpacity,PermissionsAndroid,Text } from "react-native";
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
const RunningPage = ({navigation}) => {
	const [count,setCount]= useState(0);
	return <Page navigation={navigation}>
		<Item rounded>
			<Input keyboardType="numeric" placeholder="Running distance" />
		</Item>
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={async() => {
					console.log("button clicked");
					setCount(count+1);
					try {
						// https://reactnative.dev/docs/permissionsandroid
						const result=await PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
							title: "Location Permission",
							message: "Location is required to download a map of the area around you.",
							buttonNeutral: "Ask me later",
							buttonNegative: "Deny",
							buttonPositive: "Grant",
						});
						console.log("granted:",result);
						if(result!==PermissionsAndroid.RESULTS.GRANTED) {
							console.log("permission denied");
							return;
						}
					} catch(e) {
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
