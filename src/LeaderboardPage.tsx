import React from "react";
import { Text, Container, Content, List, ListItem, Left, Right, Body, Thumbnail } from "native-base";
import { StyleSheet, View } from "react-native";
import Leaderboard from 'react-native-leaderboard';
import Page from "./Page";

this.state = {
    data: [
        { userName: 'Joe', highScore: 52 },
        { userName: 'Jenny', highScore: 120 },
        //...
    ] //can also be an object of objects!: data: {a:{}, b:{}}
}
const LeaderboardPage = () => (
    <Container>
        <Content>
            <Leaderboard
                data={this.state.data}
                sortBy='highScore'
                labelBy='userName' />
        </Content>
    </Container >
);

export default LeaderboardPage;
