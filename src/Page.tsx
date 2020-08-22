import React from "react";
import { StyleSheet } from "react-native";
import {
	Button,
	Text,
	Footer,
	FooterTab,
	Content,
	Container,
	Icon,
	Header,
	Body,
	Title,
} from "native-base";
import FontAwesome5 from "react-native-vector-icons/FontAwesome5";

const styles = StyleSheet.create({
	icon: {
		backgroundColor: "#5e97da",
		padding: 5,
		color: "#ffffff",
	}
});

const Page = ({ navigation, children }) => (
	<Container style={{flex: 1}}>
		<Header style={{ backgroundColor: "#5e97da" }}>
			<Body>
				<Title>App</Title>
			</Body>
		</Header>
		<Content contentContainerStyle={{flexGrow: 1}}>
			{children}
		</Content>
		<Footer>
			<FooterTab style={{ backgroundColor: "#5e97da" }}>
				<Button vertical onPress={() => navigation.navigate("Share")}>
					<FontAwesome5 name="share" style={styles.icon} />
					<Text>Share</Text>
				</Button>
				<Button vertical onPress={() => navigation.navigate("Home")}>
					<FontAwesome5 name="home" style={styles.icon} />
					<Text>Home</Text>
				</Button>
				<Button vertical onPress={() => navigation.navigate("Friends")}>
					<FontAwesome5 name="users" style={styles.icon} />
					<Text>Friends</Text>
				</Button>
				<Button vertical onPress={() => navigation.navigate("Map")}>
					<FontAwesome5 name="map" style={styles.icon} />
					<Text>Map</Text>
				</Button>
			</FooterTab>
		</Footer>
	</Container>
);

export default Page;
