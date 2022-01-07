import React from "react";
import { View, StyleSheet, Text } from "react-native";
import { useMoralisDapp } from "../providers/MoralisDappProvider/MoralisDappProvider";
import AccessibleImage from "../helpers/altImage";
//TODO: Uncomment to show ETH address on header
//import Address from "./Address";

export default function Header() {
	const { userName, avatar } = useMoralisDapp();
	console.log("usern ", userName, avatar);
	return (
		<View style={styles.viewContainer}>
			<View style={styles.viewInside}>
				<Text
					style={{
						fontWeight: "bold",
						textAlign: "right",
					}}
				>
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
		</View>
	);
}
const styles = StyleSheet.create({
	viewContainer: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
		// width: "100%",
		backgroundColor: "#000000",
	},
	viewInside: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "center",
		alignItems: "center",
		marginLeft: "auto",
		marginRight: "auto",
		width: "100%",
		// backgroundColor: "#000000",
	},
	avatarImage: {
		height: 44,
		width: 44,
		overflow: "hidden",
		resizeMode: "cover",
		borderColor: "#ffffff",
		borderWidth: 4,
		borderRadius: 320 / 2,
		// marginLeft: "auto",
		// marginRight: "auto",
	},
});
