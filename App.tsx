import React from "react";
import { StyleSheet } from "react-native";
// test
import {
	Container,
	Text,
	Title,
	Header,
	Footer,
	Content,
	Left,
	Right,
	Body,
	Item,
	Input,
} from "native-base";

const App = () => {
	return (
		<Container>
			<Header>
				<Body>
					<Title>Running App</Title>
				</Body>
			</Header>
			<Content>
				<Item rounded>
					<Input keyboardType="numeric" placeholder="Running distance" />
				</Item>
			</Content>
		</Container>
	);
};
const styles = StyleSheet.create({
	content: {
		display: "flex",
	}
});
export default App;
