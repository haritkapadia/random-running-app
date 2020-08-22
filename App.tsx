import React from "react";
import { View } from "react-native";
import { NavigationContainer } from "@react-navigation/native";
import { createStackNavigator, TransitionPresets, CardStyleInterpolators } from "@react-navigation/stack";
import {
	Container,
	Body,
	Title,
	Header,
} from "native-base";
import RunningPage from "./src/RunningPage";
import FriendsPage from "./src/FriendsPage";
import SharePage from "./src/SharePage";
import MapPage from "./src/MapPage";
import ProfilePage from "./src/ProfilePage";

const Stack = createStackNavigator();

export default () => {
	return (
		<NavigationContainer>
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				{[
					{ name: "Home", component: RunningPage },
					{ name: "Share", component: SharePage },
					{ name: "Friends", component: FriendsPage },
					{ name: "Map", component: MapPage },
					{ name: "Profile", component: ProfilePage },
				].map(({name, component}) => (
					<Stack.Screen
					key={name}
					name={name}
					component={component}
					options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
					/>
				))}
			</Stack.Navigator>
		</NavigationContainer>

	);
};
