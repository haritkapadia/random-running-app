import React from "react";
import { Text, Container, Header, Tab, Tabs, ScrollableTab, Content } from "native-base";
import { View, ScrollView } from "react-native";
import Page from "./Page";
import FriendsList from './FriendsList';
import Leaderboard from "./Leaderboard";

const FriendsPage = ({ navigation }) => (
	<Page navigation={navigation}>
		<Content>
			<Tabs>
				<Tab heading="Friends">
					<FriendsList />
				</Tab>
				<Tab heading="Leaderboard">
					<Leaderboard />
				</Tab>

			</Tabs>
		</Content>
	</Page>
);

export default FriendsPage;
