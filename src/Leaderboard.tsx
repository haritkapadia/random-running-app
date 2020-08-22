import React from "react";
import { Text, Container, Content, List, ListItem, Left, Right, Body, Thumbnail } from "native-base";
import { StyleSheet, View } from "react-native";
import Page from "./Page";

const styles = StyleSheet.create({
    textRank: {
        fontSize: 22,
        fontWeight: "bold",
    },
    score: {
        display: "flex",
        flexDirection: "row",
        justifyContent: "space-between",
        alignItems: "center"
    },
    name: {
        fontSize: 12,
        textAlign: "center"
    },
    podium: {
        display: "flex",
        margin: 20,
        flexDirection: "row",
        justifyContent: "space-around",
        alignItems: "center"
    },
    podiumScore: {
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
    },
    profile: {
        marginLeft: 20
    }
});

const Leaderboard = () => (
    <Container>
        <Content>
            <View style={styles.podium}>
                <Left style={styles.podiumScore}>
                    <Text style={{ color: "red" }, styles.textRank}>2</Text>
                    <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} style={{ width: 70, height: 70 }} />
                    <Text style={styles.name}>Friar Lawrence</Text>
                    <Text style={{ marginTop: 10 }}>7923</Text>
                </Left>
                <Body style={styles.podiumScore}>
                    <Text style={styles.textRank}>1</Text>
                    <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} style={{ width: 100, height: 100 }} />
                    <Text style={styles.name}>John Smith</Text>
                    <Text style={{ marginTop: 10 }}>12482</Text>
                </Body>
                <Right style={styles.podiumScore}>
                    <Text style={styles.textRank}>3</Text>
                    <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} style={{ width: 70, height: 70 }} />
                    <Text style={styles.name}>Jane Doe</Text>
                    <Text style={{ marginTop: 10 }}>6244</Text>
                </Right>
            </View>
            <List>
                <ListItem avatar>
                    <Left>
                        <Text style={styles.textRank}>4</Text>
                        <Thumbnail style={styles.profile} source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} />
                    </Left>
                    <Body style={styles.score}>
                        <Text style={styles.name}>Harit Kapadia</Text>
                        <Text>5837</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Text style={styles.textRank}>5</Text>
                        <Thumbnail style={styles.profile} source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} />
                    </Left>
                    <Body style={styles.score}>
                        <Text style={styles.name}>David Jacewicz</Text>
                        <Text>4552</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Text style={styles.textRank}>6</Text>
                        <Thumbnail style={styles.profile} source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} />
                    </Left>
                    <Body style={styles.score}>
                        <Text style={styles.name}>Junyi Kapadia</Text>
                        <Text>1000</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Text style={styles.textRank}>7</Text>
                        <Thumbnail style={styles.profile} source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png" }} />
                    </Left>
                    <Body style={styles.score}>
                        <Text style={styles.name}>Wang Kapadia</Text>
                        <Text>2</Text>
                    </Body>
                </ListItem>
            </List>
        </Content>
    </Container >
);

export default Leaderboard;
