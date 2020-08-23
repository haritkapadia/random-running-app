import React from "react";
import { Text } from "native-base";
import Page from "./Page";

const SharePage = ({navigation, profile}) => (
	<Page navigation={navigation} profile={profile}>
		<Text>Share OwO</Text>
	</Page>
);

export default SharePage;
