import React, { useState } from "react";
import { Text, Container, Content, Button } from "native-base";
import { StyleSheet, Image, View, TouchableOpacity } from "react-native";
import ImagePicker from 'react-native-image-picker';
import Page from "./Page";
import symbolicateStackTrace from "react-native/Libraries/Core/Devtools/symbolicateStackTrace";

const styles = StyleSheet.create({
    container: {
        flex: 1,
        display: "flex",
        alignItems: "center",
    },
    name: {
        fontSize: 25,
        fontWeight: "bold",
        marginTop: 30
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
        marginTop: 20,
        backgroundColor: "#5e97da",
        padding: 10,
        borderRadius: 20
    }
});

const options = {
    title: 'Select Photo',
    customButtons: [{ name: 'fb', title: 'Choose Photo from Facebook' }],
    storageOptions: {
        skipBackup: true,
        path: 'images',
    },
};

const ProfilePage = ({ navigation, profile, setProfile }) => {
    return <Page navigation={navigation}>
        <View style={styles.container}>
            <Text style={styles.name}>Jane Doe</Text>
            <Image
                source={profile}
                style={styles.image}
            />
            <TouchableOpacity
                style={styles.button}
                onPress={() => {
                    ImagePicker.launchImageLibrary(options, (response) => {
                        console.log('Response = ', response);

                        if (response.didCancel) {
                            console.log('User cancelled image picker');
                        } else if (response.error) {
                            console.log('ImagePicker Error: ', response.error);
                        } else if (response.customButton) {
                            console.log('User tapped custom button: ', response.customButton);
                        } else {
                            const source = { uri: response.uri };
                            setProfile(response);
                        }
                    });
                }}
            >
                <Text style={{ color: "white" }}>Upload Photo</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
                <Text style={{ color: "white" }}>Add Friend</Text>
            </TouchableOpacity>
        </View>
    </Page >
};

export default ProfilePage;
