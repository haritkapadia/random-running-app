import React from "react";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import RunningPage from "./src/RunningPage";
import FriendsPage from "./src/FriendsPage";
import SharePage from "./src/SharePage";

const Stack = createStackNavigator();

export default () => (
	<NavigationContainer>
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={RunningPage} />
			<Stack.Screen name="Share" component={SharePage} />
			<Stack.Screen name="Friends" component={FriendsPage} />
		</Stack.Navigator>
	</NavigationContainer>
);
