import React from "react";
import { Text, Container, Content, Button } from "native-base";
import { StyleSheet, Image, View } from "react-native";
import Page from "./Page";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        alignItems: "center",
    },
    image: {
        width: 300,
        height: 300,
        marginTop: 20,
        borderRadius: 300 / 2,
        borderWidth: 5,
        borderColor: "#5e97da"
    },
    button: {
        padding: 5,
        marginTop: 20
    }
});
const ProfilePage = ({ navigation }) => (
    <Page navigation={navigation}>
        <View style={styles.container}>
            <Image
                source={{ uri: 'https://cdn.discordapp.com/attachments/347043966476353538/746779456152272916/unknown.png' }}
                style={styles.image}
            />
            <Button rounded style={styles.button}>
                <Text>Upload Photo</Text>
            </Button>
        </View>
    </Page>
);

export default ProfilePage;
