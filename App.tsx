// "...add the following at the *top* of your entry file..."
import "react-native-gesture-handler";

import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import {
	Container,
	Body,
	Title,
	Header,
} from "native-base";

import RunningPage from "./src/RunningPage";
import FriendsPage from "./src/FriendsPage";
import SharePage from "./src/SharePage";

const Stack = createStackNavigator();

const App = () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{headerShown: false}}>
				<Stack.Screen name="Home" component={RunningPage} />
				<Stack.Screen name="Share" component={SharePage} />
				<Stack.Screen name="Friends" component={SharePage} />
			</Stack.Navigator>
		</NavigationContainer>
	);
};

export default App;
