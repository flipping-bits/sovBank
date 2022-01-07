import React, { Component, useState, useEffect } from "react";
import { Button, Image, TextInput, View } from "react-native";
// import * as ImageManipulator from "expo-image-manipulator";
import Moralis from "moralis/react-native.js";
// import NftToken from '../../contracts/artifacts/contracts/NftToken.sol/NftToken.json';

// const TOKEN_CONTRACT_ADDRESS = "0x5FbDB2315678afecb367f032d93F642f64180aa3";
// let web3;
// let tokenContract;
// Moralis.initialize("Q3GMXEv7RLn0RjAeS9vyWGm3FkaEAOKnp26WDq38");
// Moralis.serverURL = "https://6y0f31bmzvfv.usemoralis.com:2053/server";

export default function Save(props) {
    //    console.log("props in save are: ", props.route.params.image);
    const [caption, setCaption] = useState("");
    const [image, setImage] = useState();
    const [nftName, setNftName] = useState("");
    const [nftDescription, setNftDescription] = useState("");
    const [ready, setReady] = useState(false);
    // const [nftPrice, setNftPrice] = useState("");
    // const [nftStatus, setNftStatus] = useState("Status");
    // const [file, setFile] = useState({});

    // async function startWeb3() {
    // 	console.log("start web 3");
    // 	web3 = await Moralis.Web3.enable();
    // 	tokenContract = new web3.eth.Contract(NftToken.abi, TOKEN_CONTRACT_ADDRESS);
    // }

    useEffect(() => {
        // startWeb3();
        console.log("Web3 start", props);
        setImage(props.route.params.image);
        setReady(true);
        console.log("image ", image);
    }, []);

    const _rotate90andFlip = async () => {
        console.log("rotate and flip ", image);
        const manipResult = await ImageManipulator.manipulateAsync(
            image.localUri || image.uri,
            // props.route.params.image,
            [{ rotate: 90 }, { flip: ImageManipulator.FlipType.Vertical }],
            { compress: 1, format: ImageManipulator.SaveFormat.PNG }
        );
        setImage(manipResult);
    };

    const uploadImage = async () => {
        let uri = image.uri;
        console.log("uploading image");
        try {
            await setImage(uri);
        } catch (e) {
            throw e;
        }
    };

    // function nftNameChangeHandler(event){
    //     setNftName(event.target.value);
    // }

    return (
        <View style={{ width: 400, height: 400 }}>
            {console.log("line 49 save ", props.route.params.image)}
            <Image source={{ uri: props.route.params.image.uri }} />
            <TextInput
                placeholder="Write a Caption . . ."
                onChangeText={(caption) => setCaption(caption)}
            />
            {props.route.params.image && (
                <Image
                    source={{ uri: props.route.params.image.uri }}
                    style={{ width: 200, height: 200 }}
                />
            )}
            <Button title="Rotate" onPress={() => _rotate90andFlip()} />
            <Button title="Upload" onPress={() => uploadImage()} />
        </View>

        // <Box borderRadius='md' justifyContent="center" alignItems="center" height="100%">
        //     {
        //     props.showNftCreate ?
        //     <Container justifyContent="center" alignItems="center"AA>
        //         <VStack space={10} width={300} justifyContent="center" alignItems="center">
        //           <Box px={4} pt={4} justifyContent="center" alignItems="center">
        //             Create an NFT
        //           </Box>
        //           <Input
        //             w="80%"
        //             placeholder={"NFT Name"}
        //             _light={{
        //                 placeholderTextColor: "blueGray.400",
        //             }}
        //             _dark={{
        //                 placeholderTextColor: "blueGray.50",
        //             }}
        //             onChange={nftNameChangeHandler}
        //             value = {nftName}
        //             />

        //             <Input
        //                 w="80%"
        //                 mx={3}
        //                 marginBottom={10}
        //                 placeholder="Description"
        //                 _light={{
        //                     placeholderTextColor: "blueGray.400",
        //                 }}
        //                 _dark={{
        //                     placeholderTextColor: "blueGray.50",
        //                 }}
        //                 onChange={nftDescriptionChangeHandler}
        //                 value = {nftDescription}
        //             />

        //             <Input
        //                 w="80%"
        //                 mx={3}
        //                 marginBottom={10}
        //                 placeholder="NFT Price"
        //                 _light={{
        //                     placeholderTextColor: "blueGray.400",
        //                 }}
        //                 _dark={{
        //                     placeholderTextColor: "blueGray.50",
        //                 }}
        //                 onChange={nftPriceHandler}
        //                 value = {nftPrice}
        //             />

        //             <Select
        //                 selectedValue={nftStatus}
        //                 minWidth={200}
        //                 accessibilityLabel="Status"
        //                 placeholder={nftStatus}
        //                 onValueChange={(itemValue) => nftStatusHandler(itemValue)}
        //                 _selectedItem={{
        //                 bg: "cyan.600",
        //                 endIcon: <CheckIcon size={4} />,
        //                 }}
        //             >

        //                 <Select.Item label="buy" value="Instant Buy" />
        //                 <Select.Item label="not for sale" value="Not For Sale" />
        //                 <Select.Item label="offers" value="Accept Offers" />

        //             </Select>

        //             {
        //              <Text>{file.name}</Text>
        //             }
        //             <Button size={"lg"} marginTop={"1rem"} width={"60%"} colorScheme="secondary" onPress={pickDocument}>Choose file</Button>

        //           </VStack>
        //                 <Button size={"lg"} marginTop={"2rem"} width={"75%"} colorScheme="secondary" onPress={closeNft}>Close</Button>
        //                 <Button size={"lg"} marginTop={"2rem"} width={"75%"} marginBottom={25} onPress={createNft}>Create</Button>
        //         </Container>
        //         :
        //         <Container height={0}></Container>
        //         }
        //     </Box>
    );
}
