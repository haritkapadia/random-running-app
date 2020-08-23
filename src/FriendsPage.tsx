import React from "react";
import { Text, Container, Header, Tab, Tabs, ScrollableTab, Content } from "native-base";
import { View, ScrollView } from "react-native";
import Page from "./Page";
import FriendsList from './FriendsList';
import LeaderboardPage from "./LeaderboardPage";

const FriendsPage = ({ navigation, profile }) => (
	<Page navigation={navigation} profile={profile}>
		<Tabs style={{ flex: 1 }}>
			<Tab heading="Friends">
				<FriendsList />
			</Tab>
			<Tab heading="Leaderboard">
				<LeaderboardPage />
			</Tab>
		</Tabs>
	</Page>
);

export default FriendsPage;
