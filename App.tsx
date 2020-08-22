import React,{useState} from "react";
import { StyleSheet,View,TouchableOpacity } from 'react-native';
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
					<Input placeholder='Running distance' />
				</Item>
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
	}
});
export default App;
