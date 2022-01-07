import React from "react";
import { WebView } from "react-native-webview";
import { View, Text, Image, StyleSheet, SafeAreaViewComponent } from "react-native";
import AccessibleImage from "../helpers/altImage";
import { useMoralis, useMoralisFile } from "react-moralis";


export default function Landing() {
	const [avatar, setAvatar] = useState();
	const [userName, setUserName] = useState("hi");
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

	return (
        <SafeAreaViewComponent>
		<View>
			<Text>Landing</Text>
            <AccessibleImage
							style={styles.avatarImage}
							alt={"avatar image"}
							source={{
								uri: avatar,
							}}
						/>
		</View>
        </SafeAreaViewComponent>
	
	);


}


const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	// imageBackground: {
	// 	flex: 1,
	// 	flexDirection: "column",
	// 	justifyContent: "center",
	// 	alignItems: "center",
	// },
	// avatar: {
	// 	alignItems: "center",
	// 	marginTop: "20%",
	// 	// backgroundColor: "red",
	// 	marginBottom: "10%",
	// },
	avatarImage: {
		// aspectRatio: 1.5,

		height: 320,
		width: 320,
		overflow: "hidden",
		resizeMode: "cover",
		borderColor: "#ffffff",
		borderWidth: 4,
		borderRadius: 320 / 2,
	}
});