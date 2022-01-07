import React from "react";
// import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { View, Text, Image, StyleSheet, SafeAreaViewComponent } from "react-native";
import AccessibleImage from "../helpers/altImage";

export default function Landing() {
	return (
        <SafeAreaViewComponent></SafeAreaViewComponent>
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

		// <WebView
		// 	source={{ uri: "https://demo.readyplayer.me/avatar" }}
		// 	onMessage={(event) => {
		// 		alert(
		// 			`Avatar 3D model can be downloaded from: ${event.nativeEvent.data}`
		// 		);
		// 	}}
		// />
	);

	// return (
	// 	<View style={styles.container}>
	// 		<Image
	// 			style={styles.tinyLogo}
	// 			source={require("https://demo.readyplayer.me/avatar")}
	// 		/>
	// 	</View>
	// );
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