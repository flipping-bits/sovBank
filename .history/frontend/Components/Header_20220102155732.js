import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import AccessibleImage from "../;
//TODO: Uncomment to show ETH address on header
//import Address from "./Address";

export default function Header() {
	const { userName, avatar } = useMoralisDapp();
	console.log("usern ", userName);
	return (
		<View style={styles.viewContainer}>
			{/* <Text style={{fontWeight: 'bold', textAlign: 'left'}}>Defi Group Chat</Text> */}

			<Text style={{ fontWeight: "bold", textAlign: "left", marginRight: 5 }}>
				Hello {userName}
			</Text>
			<AccessibleImage
				style={styles.avatarImage}
				alt={"avatar image"}
				source={{
					uri: avatar,
				}}
			/>
		</View>
	);
}
const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
	},
});
