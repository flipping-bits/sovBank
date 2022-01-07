import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { WebView } from "react-native-webview";
import {
	View,
	Text,
	Image,
	StyleSheet,
	SafeAreaViewComponent,
} from "react-native";
import AccessibleImage from "../helpers/altImage";
import { useMoralis, useMoralisFile } from "react-moralis";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";

const LeftContent = (props) => <Avatar.Icon {...props} icon="folder" />;

export default function Landing() {
	const { userName, avatar } = useMoralisDapp();
	const [isLoading, setIsLoading] = useState(false);

	const {
		authenticate,
		authError,
		isAuthenticating,
		isAuthenticated,
		logout,
		Moralis,
		setUserData,
		userError,
		isUserUpdating,
		user,
	} = useMoralis();

	useEffect(() => {}, []);

	return (
		<View style={styles.container}>
			<Card>
				<Card.Title
					title="Card Title"
					subtitle="Card Subtitle"
					left={LeftContent}
				/>
				<Card.Content>
					<Title>Card title</Title>
					<Paragraph>Card content</Paragraph>
				</Card.Content>
				<Card.Cover source={{ uri: "https://picsum.photos/700" }} />
				<Card.Actions>
					<Button>Cancel</Button>
					<Button>Ok</Button>
				</Card.Actions>
			</Card>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	viewContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
	avatarImage: {
		height: 66,
		width: 66,
		overflow: "hidden",
		resizeMode: "cover",
		borderColor: "#ffffff",
		borderWidth: 4,
		borderRadius: 320 / 2,
	},
});
