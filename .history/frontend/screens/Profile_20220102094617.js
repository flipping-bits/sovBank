import React, { useState, useEffect, useCallback } from "react";
import axios from "axios";
import { WebView } from "react-native-webview";
import whatsappBackground from "../Assets/imageAssets/whatsapp-background.jpg";
import avatar from "../Assets/imageAssets/avatar.jpg";
import addButton from "../Assets/imageAssets/add-button.png";
import camera from "../Assets/imageAssets/camera.png";
import image from "../Assets/imageAssets/image.jpg";
import Modal from "react-native-modal";
import AccessibleImage from "../helpers/altImage";
import {
	Button,
	Paragraph,
	Dialog,
	Portal,
	Provider,
	ActivityIndicator,
} from "react-native-paper";
import {
	StyleSheet,
	Text,
	View,
	Image,
	PermissionsAndroid,
	Platform,
	Pressable,
	SafeAreaView,
	ImageBackground,
	TouchableOpacity,
	onPress,
	TextInput,
	KeyboardAvoidingView,
	StatusBar,
	ScrollView,
	ProgressBarAndroid,
	ToastAndroid,
} from "react-native";
import { useMoralis, useMoralisFile } from "react-moralis";
const KEYBOARD_VERTICAL_OFFSET = 60 + StatusBar.currentHeight;
import CameraRoll from "@react-native-community/cameraroll";
import * as ImagePicker from "react-native-image-picker";
// import RNFetchBlob from "rn-fetch-blob";
import { platform } from "os";
import { faRedo } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";

function ImagePickerHeader() {
	return (
		<SafeAreaView style={styles.safeArea}>
			<View style={styles.topBar}>
				<Text style={styles.topBarTitleText}>Avatar Picker</Text>
			</View>
		</SafeAreaView>
	);
}

export default function Profile() {
	// const [avatarFile, setAvatarFile] = useState();

	const [avatar, setAvatar] = useState();
	const [pickAvatar, setPickAvatar] = useState(false);
	const [text, setText] = useState("");
	const [userName, setUserName] = useState("hi");
	const [isLoading, setIsLoading] = useState(false);
	const [saving, setSaving] = useState(false);
	const [changeName, setChangeName] = false;

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

	const { error, isUploading, moralisFile, saveFile } = useMoralisFile();

	async function saveUserHandle() {
		console.log("curr user", user.get("username"));
		user.set("username", text);
	}

	// const onImageLibraryPress = useCallback(() => {
	// 	const options = {
	// 		selectionLimit: 1,
	// 		mediaType: "photo",
	// 		includeBase64: false,
	// 	};
	// 	ImagePicker.launchImageLibrary(options, setPickerResponse);
	// }, []);

	// const onCameraPress = useCallback(() => {
	// 	const options = {
	// 		saveToPhotos: true,
	// 		mediaType: "photo",
	// 		includeBase64: false,
	// 	};
	// 	ImagePicker.launchCamera(options, setPickerResponse);
	// }, []);

	// const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

	const fetchAvatar = async (_avatarFile) => {
		console.log("avatarFile163: ", _avatarFile);
		const params = {
			model: _avatarFile,
			scene: "fullbody-portrait-v1",
			armature: "ArmatureTargetMale",
			blendShapes: {},
		};

		let url = "https://render.readyplayer.me/render";
		let data = JSON.stringify(params);

		try {
			const response = await axios.post(url, data);
			console.log("ax ", JSON.stringify(response.data.renders[0]));
			let avtUrl = JSON.stringify(response.data.renders[0]);
			return avtUrl;
		} catch (error) {
			throw new Error("An error has occurred");
		}
	};

	const saveAvatar = async (avt) => {
		setPickAvatar(false);
		setIsLoading(true);
		console.log("set pick to false");
		let avatarUrl = await fetchAvatar(avt);
		console.log("avatarUrl ", avatarUrl);
		let imgPath = avatarUrl.slice(1, -1);
		try {
			// user.set("avatar", avatarUrl);
			await setUserData({
				avatar: imgPath,
				// email: "batman@marvel.com",
				// numberOfCats: 12,
			});
			console.log("saved avatar");
			// setAvatar(avatarUrl);
			setIsLoading(false);
		} catch (e) {
			alert("err", error, e);
		}
	};

	useEffect(() => {
		if (user) {
			let _user = user.get("username");
			let userAvatar = user.get("avatar");
			console.log("user in effect", _user, avatar);
			if (_user) {
				setUserName(_user);
			}
			if (userAvatar) {
				setAvatar(userAvatar);
			}
		}
	}, [user]);

	if (pickAvatar) {
		return (
			<View style={styles.screen}>
				{/* <Text>{avatar}</Text> */}
				{/* <ImagePickerHeader /> */}
				<WebView
					source={{ uri: "https://demo.readyplayer.me/avatar" }}
					onMessage={(event) => {
						console.log("event: ", event.nativeEvent);
						saveAvatar(event.nativeEvent.data);
					}}
				/>
			</View>
		);
	}
	else if (isLoading) {
		return (
			<View>
				<StatusBar barStyle="dark-content" />
				<Text>Loading</Text>
			</View>
		);
	}
	else if (changeName) {
		<ImageBackground style={styles.imageBackground} source={whatsappBackground}>
			<ScrollView>
				{/* {console.log("ava ", user)} */}
				<View style={styles.avatar}>
					<AccessibleImage
						style={styles.avatarImage}
						alt={"avatar image"}
						source={{
							uri: avatar,
						}}
					/>
					<TouchableOpacity
						style={styles.addButton}
						onPress={() => setPickAvatar(true)}
					>
						<Image style={styles.addButtonIcon} source={addButton} />
					</TouchableOpacity>
				</View>
				<View style={styles.container}>
					<View style={styles.container}>
						<View>
							<Text style={styles.usernameText}>{userName}</Text>
						</View>
						<View style={styles.container}>
							<TouchableOpacity
								style={styles.changeButton}
								onPress={() => setChangeName(true)}
							>
								<FontAwesomeIcon icon={faRedo} />
							</TouchableOpacity>
						</View>
					</View>

					<View>
						<KeyboardAvoidingView
							enabled
							keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
							behavior={Platform.OS === "ios" ? "padding" : "height"}
							style={styles.container}
						>
							{/* <View> */}
							<TextInput
								style={{ height: 40, padding: 0, textAlign: "center" }}
								placeholder="Enter user handle"
								onChangeText={(text) => setText(text)}
								defaultValue={text}
							/>
							{/* </View> */}
						</KeyboardAvoidingView>
						<View style={{ marginTop: 50, height: 50 }}>
							<Button
								onPress={() =>
									setUserData({
										username: text,
										// email: "batman@marvel.com",
										// numberOfCats: 12,
									})
								}
								disabled={isUserUpdating}
								title="Save"
								color="#841584"
								accessibilityLabel="Save user name"
							/>
						</View>
						{/* </KeyboardAvoidingView> */}
					</View>
				</View>
			</ScrollView>
		</ImageBackground>;
	} else {
		return (
			<ImageBackground
				style={styles.imageBackground}
				source={whatsappBackground}
			>
				<ScrollView>
					{/* {console.log("ava ", user)} */}
					<View style={styles.avatar}>
						<AccessibleImage
							style={styles.avatarImage}
							alt={"avatar image"}
							source={{
								uri: avatar,
							}}
						/>
						<TouchableOpacity
							style={styles.addButton}
							onPress={() => setPickAvatar(true)}
						>
							<Image style={styles.addButtonIcon} source={addButton} />
						</TouchableOpacity>
					</View>
					<View style={styles.container}>
						{/* {userName ? (
							<View style={styles.container}>
								<View>
									<Text style={styles.usernameText}>{userName}</Text>
								</View>
								<View style={styles.container}>
									<TouchableOpacity
										style={styles.changeButton}
										onPress={() => setChangeName(true)}
									>
										<FontAwesomeIcon icon={faRedo} />
									</TouchableOpacity>
								</View>
							</View>
						) : (
							<View>
								<KeyboardAvoidingView
									enabled
									keyboardVerticalOffset={KEYBOARD_VERTICAL_OFFSET}
									behavior={Platform.OS === "ios" ? "padding" : "height"}
									style={styles.container}
								>
									{/* <View> */}
									<TextInput
										style={{ height: 40, padding: 0, textAlign: "center" }}
										placeholder="Enter user handle"
										onChangeText={(text) => setText(text)}
										defaultValue={text}
									/>
									{/* </View> */}
								</KeyboardAvoidingView>
								<View style={{ marginTop: 50, height: 50 }}>
									<Button
										onPress={() =>
											setUserData({
												username: text,
												// email: "batman@marvel.com",
												// numberOfCats: 12,
											})
										}
										disabled={isUserUpdating}
										title="Save"
										color="#841584"
										accessibilityLabel="Save user name"
									/>
								</View>
								{/* </KeyboardAvoidingView> */}
							</View>
						)
                    } */}
					</View>
				</ScrollView>
			</ImageBackground>
		);
	}
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	imageBackground: {
		flex: 1,
		flexDirection: "column",
		justifyContent: "center",
		alignItems: "center",
	},
	avatar: {
		alignItems: "center",
		marginTop: "20%",
		// backgroundColor: "red",
		marginBottom: "10%",
	},
	avatarImage: {
		// aspectRatio: 1.5,

		height: 320,
		width: 320,
		overflow: "hidden",
		resizeMode: "cover",
		borderColor: "#ffffff",
		borderWidth: 4,
		borderRadius: 320 / 2,
	},
	addButton: {
		height: 54,
		width: 54,
		backgroundColor: "#f2f2fC",
		borderRadius: 50,
		position: "absolute",
		right: 104,
		bottom: 40,
	},
	addButtonIcon: {
		height: 54,
		width: 54,
	},
	changeButton: {
		height: 54,
		width: 54,
		backgroundColor: "#f2f2fC",
		borderRadius: 50,
		justifyContent: "center",
		alignItems: "center",
	},
	userNameButton: {
		marginTop: 80,
	},
	usernameText: {
		fontSize: 24,
		fontWeight: "700",
		color: "#ffffff",
		marginTop: 12,
	},
	safeArea: {
		backgroundColor: "#62d1bc",
	},
	topBar: {
		height: 50,
		backgroundColor: "#62d1bc",
		alignItems: "center",
		justifyContent: "center",
	},
	topBarTitleText: {
		color: "#ffffff",
		fontSize: 20,
	},

	modal: {
		justifyContent: "flex-end",
		margin: 0,
	},
	buttonIcon: {
		width: 30,
		height: 30,
		margin: 10,
	},
	buttons: {
		backgroundColor: "white",
		flexDirection: "row",
		borderTopRightRadius: 30,
		borderTopLeftRadius: 30,
	},
	button: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	buttonText: {
		fontSize: 14,
		fontWeight: "600",
	},

	screen: {
		// paddingTop: 50,
		flex: 1,
		backgroundColor: "#f2f2fC",
	},
});
