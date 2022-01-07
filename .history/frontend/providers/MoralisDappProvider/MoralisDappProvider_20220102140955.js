import React, { useEffect, useMemo, useState } from "react";
import { useMoralis } from "react-moralis";
import MoralisDappContext from "./context";

function MoralisDappProvider({ children }) {
	const { web3, Moralis, user } = useMoralis();
	const [walletAddress, setWalletAddress] = useState();
	const [chainId, setChainId] = useState();
	const [userName, setUserName] = useState();
	const [avatar, setAvatar] = useState();

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

	useEffect(() => {
		Moralis.onAccountsChanged(function (username) {
			setUserName(username);
		});
	}, []);

	useEffect(() => {
		Moralis.onChainChanged(function (chain) {
			setChainId(chain);
		});

		Moralis.onAccountsChanged(function (address) {
			setWalletAddress(address[0]);
		});
		// eslint-disable-next-line react-hooks/exhaustive-deps
	}, []);

	useEffect(() => setChainId(web3.givenProvider?.chainId));
	useMemo(
		() =>
			setWalletAddress(
				web3.givenProvider?.selectedAddress || user?.get("ethAddress")
			),
		[web3, user]
	);

	return (
		// <MoralisDappContext.Provider
		// 	value={{
		// 		walletAddress: "0x47140DcB07569Aca661F71caAA36623aa3F626b9",
		// 		chainId: "0xa869",
		// 	}}
		// >
		// 	{children}
		// </MoralisDappContext.Provider>

		<MoralisDappContext.Provider
			value={{
				walletAddress,
				chainId: "0xa869",
				userName: userName,
				avatar: avatar,
			}}
		>
			{children}
		</MoralisDappContext.Provider>
	);
}

function useMoralisDapp() {
	const context = React.useContext(MoralisDappContext);
	if (context === undefined) {
		throw new Error("useMoralisDapp must be used within a MoralisDappProvider");
	}
	return context;
}

export { MoralisDappProvider, useMoralisDapp };
