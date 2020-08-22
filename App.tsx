import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RunningPage from "./src/RunningPage";
import FriendsPage from "./src/FriendsPage";
import SharePage from "./src/SharePage";
import MapPage from "./src/MapPage";

const Stack = createStackNavigator();

export default () => (
	<NavigationContainer>
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={RunningPage} />
			<Stack.Screen name="Share" component={SharePage} />
			<Stack.Screen name="Friends" component={FriendsPage} />
			<Stack.Screen name="Map" component={MapPage} />
		</Stack.Navigator>
	</NavigationContainer>
);
