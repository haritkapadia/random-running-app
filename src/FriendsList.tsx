import React from "react";
import { Text, Container, Content, List, ListItem, Left, Right, Body, Thumbnail } from "native-base";
import { StyleSheet } from "react-native";
import Page from "./Page";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
const FriendsList = () => (
    <Container>
        <Content>
            <List>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} />
                    </Left>
                    <Body>
                        <Text>Harit Kapadia</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} />
                    </Left>
                    <Body>
                        <Text>David Jacewicz</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} />
                    </Left>
                    <Body>
                        <Text>Junyi Kapadia</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} />
                    </Left>
                    <Body>
                        <Text>Wang Kapadia</Text>
                    </Body>
                </ListItem>
            </List>
        </Content>
    </Container>
);

export default FriendsList;
