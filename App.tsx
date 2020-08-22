import React from "react";
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
				<Text>UWU OwO UWU</Text>
			</Content>
			<Footer>
				<Text>Foot</Text>
			</Footer>
		</Container>
    );
};

export default App;
