import React, { useState, useEffect, useCallback } from "react";
import whatsappBackground from "../Assets/imageAssets/whatsapp-background.jpg";
import avatar from "../Assets/imageAssets/avatar.jpg";
import addButton from "../Assets/imageAssets/add-button.png";
import camera from "../Assets/imageAssets/camera.png";
import image from "../Assets/imageAssets/image.jpg";
import Modal from "react-native-modal";
import {
    StyleSheet,
    Text,
    View,
    Button,
    Image,
    Pressable,
    SafeAreaView,
    ImageBackground,
    TouchableOpacity,
} from "react-native";
// import { Camera } from "expo-camera";
// import * as ImagePicker from "expo-image-picker";
// import { useNavigation } from "@react-navigation/native";
// import { StackNavigationProp } from "@react-navigation/stack";
// import { AuthStackParamList } from "../../App";

// type addScreenNavigationType = StackNavigationProp<AuthStackParamList, "Save">;

import * as ImagePicker from "react-native-image-picker";

function ImagePickerHeader() {
    return (
        <SafeAreaView style={styles.safeArea}>
            <View style={styles.topBar}>
                <Text style={styles.topBarTitleText}>Avatar Picker</Text>
            </View>
        </SafeAreaView>
    );
}

function ImagePickerAvatar({ uri, onPress }) {
    // import { images } from "../../assets";
    return (
        <ImageBackground style={styles.imageBackground} source={whatsappBackground}>
            <View style={styles.avatar}>
                <Image style={styles.avatarImage} source={uri ? { uri } : avatar} />
                <TouchableOpacity style={styles.addButton} onPress={onPress}>
                    <Image style={styles.addButtonIcon} source={addButton} />
                </TouchableOpacity>
                <Text style={styles.usernameText}>name</Text>
            </View>
        </ImageBackground>
    );
}

function ImagePickerModal({
                              isVisible,
                              onClose,
                              onImageLibraryPress,
                              onCameraPress,
                          }) {
    return (
        <Modal
            isVisible={isVisible}
            onBackButtonPress={onClose}
            onBackdropPress={onClose}
            style={styles.modal}
        >
            <SafeAreaView style={styles.buttons}>
                <Pressable style={styles.button} onPress={onImageLibraryPress}>
                    <Image style={styles.buttonIcon} source={image} />
                    <Text style={styles.buttonText}>Library</Text>
                </Pressable>
                <Pressable style={styles.button} onPress={onCameraPress}>
                    <Image style={styles.buttonIcon} source={camera} />
                    <Text style={styles.buttonText}>Camera</Text>
                </Pressable>
            </SafeAreaView>
        </Modal>
    );
}

export default function Add() {
    const [pickerResponse, setPickerResponse] = useState(null);
    const [visible, setVisible] = useState(false);

    const onImageLibraryPress = useCallback(() => {
        const options = {
            selectionLimit: 1,
            mediaType: "photo",
            includeBase64: false,
        };
        ImagePicker.launchImageLibrary(options, setPickerResponse);
    }, []);

    const onCameraPress = useCallback(() => {
        const options = {
            saveToPhotos: true,
            mediaType: "photo",
            includeBase64: false,
        };
        ImagePicker.launchCamera(options, setPickerResponse);
    }, []);

    const uri = pickerResponse?.assets && pickerResponse.assets[0].uri;

    return (
        <View style={styles.screen}>
            <ImagePickerHeader />
            <ImagePickerAvatar uri={uri} onPress={() => setVisible(true)} />
            <ImagePickerModal
                isVisible={visible}
                onClose={() => setVisible(false)}
                onImageLibraryPress={onImageLibraryPress}
                onCameraPress={onCameraPress}
            />
        </View>
    );
}

const styles = StyleSheet.create({
    imageBackground: {
        flex: 1,
    },
    avatar: {
        alignItems: "center",
        marginTop: "40%",
    },
    avatarImage: {
        // height: 260,
        // width: 260,
        height: 350,
        width: 350,
        overflow: "hidden",
        borderColor: "#ffffff",
        borderWidth: 4,
        // borderRadius: 260 / 2,
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
        flex: 1,
        backgroundColor: "#f2f2fC",
    },
});

// const navigation = useNavigation<addScreenNavigationType>();
// const [hasGalleryPermission, setHasGalleryPermission] = useState(null);
// const [hasCameraPermission, setHasCameraPermission] = useState(null);
// const [camera, setCamera] = useState(null);
// const [image, setImage] = useState(null);
// const [type, setType] = useState(Camera.Constants.Type.back);
// const [editImage, setEditImage] = useState(false);

// useEffect(() => {
// 	(async () => {
// 		const cameraStatus = await Camera.requestPermissionsAsync();
// 		console.log("camera status: ", cameraStatus);
// 		setHasCameraPermission(cameraStatus.status === "granted");

// 		const galleryStatus = await ImagePicker.requestMediaLibraryPermissionsAsync();
// 		console.log("gallery status: ", galleryStatus);
// 		setHasGalleryPermission(galleryStatus.status === "granted");
// 	})();
// }, []);

// const takePicture = async () => {
// 	if (camera) {
// 		const data = await camera.takePictureAsync(null);
// 		setImage(data);
// 		setEditImage(true);
// 	}
// };

// const pickImage = async () => {
// 	let result = await ImagePicker.launchImageLibraryAsync({
// 		mediaTypes: ImagePicker.MediaTypeOptions.Images,
// 		allowsEditing: true,
// 		aspect: [1, 1],
// 		quality: 1,
// 	});
// 	console.log("result line 45: ", result);

// 	if (!result.cancelled) {
// 		console.log("result 48 save: ", result);
// 		setImage(result);
// 		setEditImage(true);
// 	}
// };

// if (hasCameraPermission === null || hasGalleryPermission === false) {
// 	return <View />;
// }
// if (hasCameraPermission === false || hasGalleryPermission === false) {
// 	return <Text>No access to camera</Text>;
// }
// 	if (editImage) {
// 		return (
// 			<View style={{ flex: 1 }}>
// 				{image && (
// 					<Image
// 						source={{ uri: image.uri }}
// 						style={{ width: "50%", height: "50%" }}
// 					/>
// 				)}
// 				<Button title="Take Picture" onPress={() => takePicture()} />
// 				<Button title="Pick Image From Gallery" onPress={() => pickImage()} />
// 				<Button
// 					title="EditImage"
// 					onPress={() => navigation.navigate("Save", { image })}
// 				/>
// 			</View>
// 		);
// 	} else {
// 		return (
// 			<View style={{ flex: 1 }}>
// 				{console.log("permision ", hasGalleryPermission)}
// 				<View style={styles.cameraContainer}>
// 					<Camera
// 						ref={(ref) => setCamera(ref)}
// 						style={styles.fixedRatio}
// 						type={type}
// 						ratio={"1:1"}
// 					/>
// 				</View>
// 				<Button
// 					title="Flip Camera"
// 					onPress={() => {
// 						setType(
// 							type === Camera.Constants.Type.back
// 								? Camera.Constants.Type.front
// 								: Camera.Constants.Type.back
// 						);
// 					}}
// 				></Button>
// 				<Button title="Take Picture" onPress={() => takePicture()} />
// 				<Button title="Pick Image From Gallery" onPress={() => pickImage()} />
// 				<Button
// 					title="EditImage"
// 					onPress={() => navigation.navigate("Save", { image })}
// 				/>
// 				{/* {image && <Image source={{ uri: image }} style={{ flex: 1 }} />} */}
// 			</View>
// 		);
// 	}
// }

// const styles = StyleSheet.create({
// 	cameraContainer: {
// 		flex: 1,
// 		flexDirection: "row",
// 	},
// 	fixedRatio: {
// 		flex: 1,
// 		aspectRatio: 1,
// 	},
// });
