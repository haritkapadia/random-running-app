import React from "react";
import {
	Button,
	Text,
	Footer,
	Content,
	Container,
	Header,
	Body,
	Title,
} from "native-base";

const Page = ({navigation, children}) => (
	<Container>
		<Header>
			<Body>
				<Title>Running App</Title>
			</Body>
		</Header>
		<Content>
			{children}
		</Content>
		<Footer>
			<Button onPress={() => navigation.navigate("Share")}>
				<Text>Share</Text>
			</Button>
			<Button onPress={() => navigation.navigate("Home")}>
				<Text>Run</Text>
			</Button>
			<Button onPress={() => navigation.navigate("Friends")}>
				<Text>Friends</Text>
			</Button>
		</Footer>
	</Container>
);

export default Page;
