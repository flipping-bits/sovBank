import React from "react";
import { View, Text, Button, useColorScheme, StyleSheet } from "react-native";
import { useMoralis } from "react-moralis";
import { useWalletConnect } from "./WalletConnect";
import {
	NavigationContainer,
	getFocusedRouteNameFromRoute,

} from "@react-navigation/native";
import { createStackNavigator } from "@react-navigation/stack";
import MaterialCommunityIcons from "react-native-vector-icons/MaterialCommunityIcons";
import { createMaterialBottomTabNavigator } from "@react-navigation/material-bottom-tabs";
import SplashScreen from "./Components/SplashScreen";
import CryptoAuth from "./Components/CryptoAuth";
// import RecentTransactions from "./Components/RecentTransactions/RecentTransactions";
// import Assets from "./Components/Assets/Assets";
// import NFTAssets from "./Components/NFT/NFTAssets";
// import Chat from "./Components/Chat/Chat";
// import Transfer from "./Components/Transfer/Transfer";
// import Profile from "./Components/Profile/Profile";
import Add from "./screens/Add";
import Save from "./screens/Save";
import Feed from "./screens/Feed";
import Profile from "./screens/Profile";
import Landing from "./screens/Landing";
import Header from "./Components/Header";
// import QuickStart from "./Components/QuickStart";

import { FontAwesomeIcon } from "@fortawesome/react-native-fontawesome";
import {
	faCreditCard,
	faCoins,
	faUser,
	faPaperPlane,
	faRocket,
	faSignOutAlt,
	faCameraRetro,
	faNewspaper,
} from "@fortawesome/free-solid-svg-icons";

import Moralis from "moralis/types";
import { TouchableOpacity } from "react-native-gesture-handler";

// const Activecolor =
// function LandingPage(): JSX.Element {
// 	return (
// 		<Stack.Navigator initialRouteName="Landing">
// 			<Stack.Screen
// 				name="Landing"
// 				options={{ headerShown: false }}
// 				component={Landing}
// 			/>
// 		</Stack.Navigator>
// 	);
// }

function Home({ navigation }): JSX.Element {
	const {
		authenticate,
		authError,
		isAuthenticating,
		isAuthenticated,
		logout,
		Moralis,
	} = useMoralis();

	const logoutApp = () => {
		console.log("loggin out");
		logout();
	}
	return (
		// <View style={{ flex: 1, justifyContent: "center" }}>
		<Tab.Navigator
			initialRouteName="Landing"
			// backBehaviour = "Feed"
			shifting={false}
			// activeColor="#315399"
			// inactiveColor="#3e2465"
			// barStyle={{ backgroundColor: "white" }}
		>
			<Tab.Screen
				name="Landing"
				options={{
					tabBarLabel: "Home",
					tabBarIcon: ({ color, focused }) => {
						return (
							<FontAwesomeIcon icon={faNewspaper} color={color} size={20} />
						);
					},
				}}
				component={Landing}
			/>
			<Tab.Screen
				name="Add"
				options={{
					tabBarLabel: "Post",
					tabBarIcon: ({ color, focused }) => {
						return (
							<FontAwesomeIcon icon={faCameraRetro} color={color} size={20} />
						);
					},
				}}
				component={Add}
			/>
			<Tab.Screen
				name="Profile"
				options={{
					tabBarLabel: "Profile",
					tabBarIcon: ({ color }) => (
						<FontAwesomeIcon icon={faUser} color={color} size={20} />
					),
				}}
				component={Profile}
			/>

			<Tab.Screen
				name="Splash"
				options={{
					tabBarLabel: "Logout",
					tabBarIcon: ({ color, focused }) => {
						return (
							<TouchableOpacity >
                <Button onPress={logoutApp}></Button>
								{/* <FontAwesomeIcon icon={faSignOutAlt} color={color} size={20} /> */}
							</TouchableOpacity>
						);
					},
				}}
				component={SplashScreen}
			/>
		</Tab.Navigator>
		// </View>
	);
}

const Tab = createMaterialBottomTabNavigator();
const Stack = createStackNavigator();
function getHeaderTitle(route) {
	// If the focused route is not found, we need to assume it's the initial screen
	// This can happen during if there hasn't been any navigation inside the screen
	// In our case, it's "Feed" as that's the first screen inside the navigator
	const routeName = getFocusedRouteNameFromRoute(route) ?? "Feed";

	switch (routeName) {
		// case "Assets":
		// 	return "Assets";
		// case "Transfer":
		// 	return "Transfer";
		// case "Transactions":
		// 	return "Transactions";
		// case "Profile":
		// 	return "Profile";
		// case "LandingPage":
		// 	return "LandingPage";
		case "Feed":
			return "Feed";
		case "Add":
			return "Add";
		case "Profile":
			return "Profile";
	}
}

function App(): JSX.Element {
	const connector = useWalletConnect();
	const {
		authenticate,
		authError,
		isAuthenticating,
		isAuthenticated,
		logout,
		Moralis,
	} = useMoralis();

	return (
		<NavigationContainer>
			<Stack.Navigator initialRouteName="SplashScreen">
				<Stack.Screen
					name="SplashScreen"
					component={SplashScreen}
					options={{ headerShown: false }}
				/>
				<Stack.Screen
					name="Auth"
					component={CryptoAuth}
					options={{ headerShown: false }}
				/>
				{/* <Stack.Screen
					name="Landing"
					component={Landing}
					options={{ headerShown: false }}
				/> */}
				<Stack.Screen
					name="DrawerNavigationRoutes"
					component={Home}
					options={{ headerShown: false }}
					// Hiding header for Navigation Drawer
					// options={{ headerTitle: (props) => <Header /> }}
					// options={({ route }) => ({
					// 	headerTitle: getHeaderTitle(route),
					// })}
				/>
			</Stack.Navigator>
		</NavigationContainer>
	);
}

export default App;
