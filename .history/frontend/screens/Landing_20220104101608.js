import React, { useState, useEffect } from "react";
import { Avatar, Button, Card, Title, Paragraph } from "react-native-paper";
import { WebView } from "react-native-webview";
import {
	View,
	Text,
	Image,
	StyleSheet,
	SafeAreaViewComponent,
	SafeAreaView,
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
		<SafeAreaView style={styles.container}>
			<View>
				<Card.Title
					title="The Sovereign Bank"
					subtitle="Personal Defi at your fingertips"
					left={LeftContent}
					style={styles.header}
				/>
			</View>
			<View style={styles.container}>
				<Card>
					{/* <Card.Title
						title="The Sovereign Bank"
						subtitle="Personal Defi at your fingertips"
						left={LeftContent}
					/> */}
					<Card.Content>
						<Title>Savings and Lending</Title>
						<Paragraph>Deposit to Earn or Borrow with Collateral</Paragraph>
					</Card.Content>
					<Card.Cover source={{ uri: "https://picsum.photos/700" }} />
					<Card.Actions>
						<Button>Cancel</Button>
						<Button>Ok</Button>
					</Card.Actions>
				</Card>
			</View>
		</SafeAreaView>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		// justifyContent: "center",
		// padding: 20,
		backgroundColor: "#ecf0f1",
	},
	header: {
		backgroundColor: "#ffffff",
        marginTop: -1
	},
	paragraph: {
		fontSize: 18,
		fontWeight: "bold",
		textAlign: "center",
		padding: 20,
	},
});
