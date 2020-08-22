// "...add the following at the *top* of your entry file..."
import "react-native-gesture-handler";

import React, { useState } from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import { StyleSheet, View, TouchableOpacity } from 'react-native';
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

const Stack = createStackNavigator();

const A = () => (
	<Content>
		<Item rounded>
			<Input keyboardType="numeric" placeholder="Running distance" />
		</Item>
		<View style={styles.container}>
			<TouchableOpacity
				style={styles.button}
				onPress={() => ToastExample.show("Button clicked!", ToastExample.SHORT)}
			>
				<Text>click me!</Text>
			</TouchableOpacity>
		</View>
	</Content>
);

const App = () => {
	return (
		<Container>
			<Header>
				<Body>
					<Title>Running App</Title>
				</Body>
			</Header>
			<NavigationContainer>
				<Stack.Navigator>
					<Stack.Screen
					name="Home"
					component={A}
					options={{title: "Home"}}
					/>
					<Stack.Screen
					name="Friends"
					component={A}
					options={{title: "Friends"}}
					/>
				</Stack.Navigator>
			</NavigationContainer>
		</Container>
	);
};

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

export default App;
