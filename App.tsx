import React from "react";
import { StyleSheet } from 'react-native';

import {
	Container,
	Text,
	Icon,
	Header,
	Footer,
	Content,
	Left,
	Right,
	Body,
	Button,
	Title,
	Item,
	Input,
} from "native-base";

const App = () => {
	return (
		<Container>
			<Header>
				<Left>
					<Text>Menu</Text>
				</Left>
				<Body>
					<Title>Running App</Title>
				</Body>
				<Right />
			</Header>
			<Content>
				<Item rounded>
					<Input placeholder='Running distance' />
				</Item>
			</Content>
			<Footer>
				<Text>Foot</Text>
			</Footer>
		</Container>
	);
};
const styles = StyleSheet.create({
	content: {
		display: "flex",
	}
});
export default App;
