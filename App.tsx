import React,{useState} from "react";
import { StyleSheet,View,TouchableOpacity } from 'react-native';
import ToastExample from "./ToastExample";
// test
import {
	Container,
	Text,
	Title,
	Header,
	Footer,
	Content,
	Left,
	Right,
	Body,
	Item,
	Input,
} from "native-base";

const App = () => {
	const[count,setCount]= useState(0);
	return (
		<Container>
			<Header>
				<Body>
					<Title>Running App</Title>
				</Body>
			</Header>
			<Content>
				<Item rounded>
					<Input keyboardType="numeric" placeholder="Running distance" />
				</Item>
				<View style={styles.container}>
					<TouchableOpacity
						style={styles.button}
						onPress={()=>{
							setCount(count+1);
							ToastExample.show('button clicked!',ToastExample.SHORT)
						}}
					>
						<Text>click me!</Text>
					</TouchableOpacity>
					<Text>clicked {count} times</Text>
				</View>
			</Content>
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
