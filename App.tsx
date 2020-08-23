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
	// import ToastModule
	const [location, setLocation] = React.useState([-122.400021, 37.789085]);
	const [runPath, setRunPath] = React.useState([[0, 0]]);
	const [running, setRunning] = React.useState(false);
	const calculateRoute = (lat: number, lng: number, radius: number) => [
		[-122.400021, 37.790085], [-122.401021, 37.791085], [-122.400021, 37.790085]
	];
	return (
		<NavigationContainer>
			{
				/* <ToastModule onLocationChange={({x, y}) => setLocation([x, y])} /> */
				/* If we have a LocationListener in ToastModule then we can do this */
			}
			<Stack.Navigator screenOptions={{ headerShown: false }}>
				<Stack.Screen
				name="Home"
				component={(props) => (
					<RunningPage
					location={location}
					setRunPath={(radius: number) => setRunPath(calculateRoute(location[0], location[1], radius)) }
					running={running}
					setRunning={setRunning}
					{...props}
					/>
				)}
				options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
				/>
				<Stack.Screen
				name="Map"
				component={(props) => (
					<MapPage
					location={location}
					runPath={runPath}
					{...props}
					/>
				) }
				options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
				/>
				<Stack.Screen
				name="Friends"
				component={FriendsPage}
				options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
				/>
				<Stack.Screen
				name="Share"
				component={SharePage}
				options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
				/>
				<Stack.Screen
				name="Profile"
				component={ProfilePage}
				options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
				/>
			</Stack.Navigator>
		</NavigationContainer>

	);
};
