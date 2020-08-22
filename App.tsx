import React,{useState} from "react";
import { StyleSheet,View,TouchableOpacity,PermissionsAndroid } from 'react-native';
import ToastExample from "./ToastExample";
// test
import {
	Container,
	Text,
	Icon,
	Header,
	Footer,
	Content,
	Left,
	Right,
	Body,
	Button,
	Title,
	Item,
	Input,
} from "native-base";

const App = () => {
	const[count,setCount]= useState(0);
	return (
		<Container>
			<Header>
				<Left>
					<Text>Menu</Text>
				</Left>
				<Body>
					<Title>Running App</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Item rounded>
					<Input placeholder='Running distance'/>
				</Item>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.button}
						onPress={async ()=>{
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
							setCount(count+1);
							ToastExample.run();
							//ToastExample.show('button clicked!',ToastExample.SHORT);
						}}
					>
						<Text>click me!</Text>
					</TouchableOpacity>
					<Text>clicked {count} times</Text>
				</View>
			</Content>
			<Footer>
				<Text>Foot</Text>
			</Footer>
		</Container>
	);
};
const styles = StyleSheet.create({
	content: {
		display: "flex",
	},
	button: {
		alignItems:'center',
		backgroundColor:'#dddddd',
		padding:10,
		marginBottom:10
	},
	container:{
		flex:1,
		justifyContent:'center',
		alignItems:'center'
	},
});
export default App;
