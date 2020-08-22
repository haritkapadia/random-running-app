import React from "react";
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
const Stack = createStackNavigator();



export default () =>
	<NavigationContainer>
		<Stack.Navigator screenOptions={{ headerShown: false }}>
			<Stack.Screen name="Home" component={RunningPage} options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }} />
			<Stack.Screen name="Share" component={SharePage} options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }} />
			<Stack.Screen name="Friends" component={FriendsPage} options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }} />
		</Stack.Navigator>
	</NavigationContainer>
