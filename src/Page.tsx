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
import FontAwesome5 from 'react-native-vector-icons/FontAwesome5';

const styles = StyleSheet.create({
	footer: {
		height: 70,
	},
	icon: {
		backgroundColor: "#5e97da",
		padding: 5,
	}
});

const Page = ({ navigation, children }) => (
	<Container>
		<Header style={{ backgroundColor: "#5e97da" }}>
			<Body>
				<Title>App</Title>
			</Body>
		</Header>
		<Content>
			{children}
		</Content>
		<Content />
		<Footer style={styles.footer}>
			<FooterTab style={{ backgroundColor: "#5e97da" }}>
				<Button vertical onPress={() => navigation.navigate("Share")}>
					<FontAwesome5.Button name={'share'} style={styles.icon} />
					<Text>Share</Text>
				</Button>
				<Button vertical onPress={() => navigation.navigate("Home")}>
					<FontAwesome5.Button name={'home'} style={styles.icon} />
					<Text>Home</Text>
				</Button>
				<Button vertical onPress={() => navigation.navigate("Friends")}>
					<FontAwesome5.Button name={'users'} style={styles.icon} />
					<Text>Friends</Text>
				</Button>
			</FooterTab>
		</Footer>
	</Container>
);

export default Page;
