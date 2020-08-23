import React from "react";
import { View, PermissionsAndroid, NativeEventEmitter, NativeModules } from "react-native";
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
import ToastExample from "./ToastExample";

const Stack = createStackNavigator();

export default class App extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			location: [-122.400021, 37.789085],
			runPath: [],
			running: false
		};
		this.setLocation = (location) => this.setState({location: location});
		this.setRunPath = (runPath) => this.setState({runPath: runPath});
		this.setRunning = (running) => this.setState({running: running});
	}

	componentDidMount() {
		// https://reactnative.dev/docs/permissionsandroid
		PermissionsAndroid.request(PermissionsAndroid.PERMISSIONS.ACCESS_FINE_LOCATION, {
			title: "Location Permission",
			message: "Location is required to download a map of the area around you.",
			buttonNeutral: "Ask me later",
			buttonNegative: "Deny",
			buttonPositive: "Grant",
		}).then((result) => {
			if (result !== PermissionsAndroid.RESULTS.GRANTED) {
				console.log("permission denied");
				return;
			}
			ToastExample.run();
			console.log("granted:", result);
		}).catch((error) => {
			console.log("exception thrown");
		});
		const eventEmitter= new NativeEventEmitter(NativeModules.ToastExample);
		this.eventListener= eventEmitter.addListener("locUpdate",(event)=>{
			console.log({lat: event.lat, lon: event.lon});
			this.setLocation([event.lon, event.lat]);
		});
	}

	render() {
		const calculateRoute = (lat: number, lng: number, radius: number) => [
			[-122.400021, 37.790085], [-122.401021, 37.791085], [-122.400021, 37.790085]
		];
		const customSetRunPath = (radius: number) => {};
		return (
			<NavigationContainer>
				<Stack.Navigator screenOptions={{ headerShown: false }}>
					<Stack.Screen
						name="Home"
						options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
					>
						{(props) => (
							<RunningPage
							location={this.state.location}
							setRunPath={customSetRunPath}
							running={this.state.running}
							setRunning={this.setRunning}
							{...props}
							/>
						)}
					</Stack.Screen>
					<Stack.Screen
						name="Map"
						options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
					>
						{(props) => (
							<MapPage
							location={this.state.location}
							runPath={this.state.runPath}
							{...props}
							/>
						) }
					</Stack.Screen>
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
	}
};
