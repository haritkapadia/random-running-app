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
                        <Thumbnail source={{ uri: "https://www.mantruckandbus.com/fileadmin/_processed_/2/c/csm_kleiss-interview-header_f8b7588730.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Wyatt Smith</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://images.unsplash.com/photo-1534751516642-a1af1ef26a56?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&w=1000&q=80" }} />
                    </Left>
                    <Body>
                        <Text>Natalie Wang</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://images.thestar.com/1L3hG8JS_mLmJsB1HAsC5nT1Ass=/1280x1024/smart/filters:cb(1593142732590)/https://www.thestar.com/content/dam/thestar/life/travel/2020/06/25/do-you-need-a-scenery-change/icefields_parkway_debbie_olsen.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Gleb Abel</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746848370605293599/Untitsdsled.png" }} />
                    </Left>
                    <Body>
                        <Text>Helena Opeyemi</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://sadanduseless.b-cdn.net/wp-content/uploads/2018/01/rabbit4.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Michelle Allison</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://randomuser.me/api/portraits/men/56.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Edda Zambrano</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://images.unsplash.com/photo-1489533119213-66a5cd877091?ixlib=rb-1.2.1&ixid=eyJhcHBfaWQiOjEyMDd9&auto=format&fit=crop&w=1051&q=80" }} />
                    </Left>
                    <Body>
                        <Text>Gabriel Villanueva</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746848370605293599/Untitsdsled.png" }} />
                    </Left>
                    <Body>
                        <Text>Tom Smirnov</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://cdn.discordapp.com/attachments/347043966476353538/746848370605293599/Untitsdsled.png" }} />
                    </Left>
                    <Body>
                        <Text>Miranda Curtis</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://pbs.twimg.com/profile_images/1188507013233479681/WuNwaQ8R_400x400.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Samuel Evans</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://specials-images.forbesimg.com/imageserve/1024724898/960x0.jpg?fit=scale" }} />
                    </Left>
                    <Body>
                        <Text>Jacob Lombardi</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://i2.wp.com/thepointsguy.com/wp-content/uploads/2020/04/GettyImages-1077097080.jpg?fit=2210%2C1357px&ssl=1" }} />
                    </Left>
                    <Body>
                        <Text>Liam Singh</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://www.fakepersongenerator.com/Face/male/male1084963523041.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Cedric Cothern</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://www.fakepersongenerator.com/Face/female/female1022741436035.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Ana Coleman</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://www.fakepersongenerator.com/Face/male/male1085244116944.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Gavin Stine</Text>
                    </Body>
                </ListItem>
                <ListItem avatar>
                    <Left>
                        <Thumbnail source={{ uri: "https://www.fakepersongenerator.com/Face/male/male108464542267.jpg" }} />
                    </Left>
                    <Body>
                        <Text>Wilson Picard</Text>
                    </Body>
                </ListItem>
            </List>
        </Content>
    </Container>
);

export default FriendsList;
