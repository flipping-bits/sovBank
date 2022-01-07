import React, { useState, useEffect } from "react";
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

export default function Landing() {
	// const { userName, avatar } = useMoralisDapp();

	// const [userName, setUserName] = useState("hi");
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

	// useEffect(() => {
	// 	if (user) {
	// 		let _user = user.get("username");
	// 		let userAvatar = user.get("avatar");
	// 		console.log("user in effect", _user, avatar);
	// 		if (_user) {
	// 			setUserName(_user);
	// 		}
	// 		if (userAvatar) {
	// 			setAvatar(userAvatar);
	// 		}
	// 	}
	// }, [user]);

	return (
		// <SafeAreaViewComponent>
		<View>
			<Text>Landing</Text>
			{/* <Text>{userName}</Text> */}
			{/* <AccessibleImage
				style={styles.avatarImage}
				alt={"avatar image"}
				source={{
					uri: avatar,
				}}
			/> */}
		</View>
		// </SafeAreaViewComponent>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
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
