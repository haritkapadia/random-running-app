import React from "react";
import { Text, Container, Header, Tab, Tabs } from "native-base";
import Page from "./Page";
import FriendsList from './FriendsList';
import Leaderboard from "./Leaderboard";

const FriendsPage = ({ navigation }) => (
	<Page navigation={navigation}>
		<Container>
			<Tabs>
				<Tab heading="Friends">
					<FriendsList />
				</Tab>
				<Tab heading="Leaderboard">
					<Leaderboard />
				</Tab>
			</Tabs>
		</Container>
	</Page>
);

export default FriendsPage;
