import React from "react";
import { Text, Container, Content, List, ListItem, Left, Right, Body, Thumbnail } from "native-base";
import { StyleSheet, View } from "react-native";
import Leaderboard from "react-native-leaderboard";
import Page from "./Page";

const data = [
	{ userName: "Joe", highScore: 52, icon: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" },
	{ userName: "Jenny", highScore: 120, icon: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" },
];

const LeaderboardPage = () => (
    <Container>
        <Content>
            <Leaderboard
			data={data}
			sortBy="highScore"
			labelBy="userName"
			icon="icon"
			/>
        </Content>
    </Container >
);

export default LeaderboardPage;
