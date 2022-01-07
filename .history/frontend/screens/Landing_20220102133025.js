import React from "react";
// import { View, Text } from "react-native";
import { WebView } from "react-native-webview";
import { View, Text, Image, StyleSheet } from "react-native";

export default function Landing() {
	return (
		<View>
			<Text>Landing</Text>
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
