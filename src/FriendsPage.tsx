import React from "react";
import { Text, Container, Header, Tab, Tabs, ScrollableTab, Content } from "native-base";
import { View, ScrollView } from "react-native";
import Page from "./Page";
import FriendsList from './FriendsList';
import Leaderboard from "./Leaderboard";

const FriendsPage = ({ navigation }) => (
	<Page navigation={navigation}>
		<Tabs style={{flex: 1}}>
			<Tab heading="Friends">
				<FriendsList />
			</Tab>
			<Tab heading="Leaderboard">
				<Leaderboard />
			</Tab>
		</Tabs>
	</Page>
);

export default FriendsPage;
