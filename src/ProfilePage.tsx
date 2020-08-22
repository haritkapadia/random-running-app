import React from "react";
import { Text, Container, Content, List, ListItem, Left, Right, Body, Thumbnail } from "native-base";
import { StyleSheet, Image } from "react-native";
import Page from "./Page";

const styles = StyleSheet.create({
    container: {
        flex: 1
    },
});
const ProfilePage = ({ navigation }) => (
    <Page navigation={navigation}>
        <Content>
            <Thumbnail circle large source={{ uri: 'https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png' }} />
        </Content>
    </Page>
);

export default ProfilePage;
