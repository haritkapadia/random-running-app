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
			running: false,
			profile: "https://cdn.discordapp.com/attachments/347043966476353538/746848370605293599/Untitsdsled.png"
		};
		this.setLocation = (location) => this.setState({ location: location });
		this.setRunPath = (runPath) => this.setState({ runPath: runPath });
		this.setRunning = (running) => this.setState({ running: running });
		this.setProfile = (profile) => this.setState({ profile: profile });
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
		const eventEmitter = new NativeEventEmitter(NativeModules.ToastExample);
		this.eventListener = eventEmitter.addListener("locUpdate", (event) => {
			// console.log({ lat: event.lat, lon: event.lon });
			this.setLocation([event.lon, event.lat]);
		});
	}

	render() {
		const customSetRunPath = async (radius: number) => {
			if(this.state.running) {
				this.setRunPath([]);
			} else {
				console.log("args: lat, long, radius", this.state.location[1], this.state.location[0], radius);
				await ToastExample.maybeInit(this.state.location[1], this.state.location[0]);
				ToastExample.calculateRoute(
					this.state.location[1], this.state.location[0], radius, ([lat, lon]) => {
						console.log("out before", [lat, lon]);
						const newOut = lat.map((l, idx) => [lon[idx], l]);
						console.log("out after", newOut);
						this.setRunPath(newOut);
					},
					(err) => console.log(err)
				);
			}
		};
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
							profile={this.state.profile}
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
							profile={this.state.profile}
							{...props}
							/>
						)}
					</Stack.Screen>
					<Stack.Screen
						name="Friends"
						options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
					>
						{(props) => (
							<FriendsPage profile={this.state.profile} {...props} />
						)}
					</Stack.Screen>
					<Stack.Screen
						name="Share"
						options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
					>
						{(props) => (
							<SharePage profile={this.state.profile} {...props} />
						)}
					</Stack.Screen>
					<Stack.Screen
						name="Profile"
						options={{ cardStyleInterpolator: CardStyleInterpolators.forModalPresentationIOS }}
					>
						{(props) => (
							<ProfilePage profile={this.state.profile} setProfile={this.setProfile} {...props} />
						)}
					</Stack.Screen>
				</Stack.Navigator>
			</NavigationContainer>

		);
	}
};
