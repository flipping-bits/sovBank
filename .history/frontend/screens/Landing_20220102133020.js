// import React from "react";
// // import { View, Text } from "react-native";
// import { WebView } from "react-native-webview";
// import { View, Text, Image, StyleSheet } from "react-native";

// export default function Landing() {
//     return (
//         <View>
//             <Text>Landing</Text>
//         </View>

//         // <WebView
//         // 	source={{ uri: "https://demo.readyplayer.me/avatar" }}
//         // 	onMessage={(event) => {
//         // 		alert(
//         // 			`Avatar 3D model can be downloaded from: ${event.nativeEvent.data}`
//         // 		);
//         // 	}}
//         // />
//     );

//     // return (
//     // 	<View style={styles.container}>
//     // 		<Image
//     // 			style={styles.tinyLogo}
//     // 			source={require("https://demo.readyplayer.me/avatar")}
//     // 		/>
//     // 	</View>
//     // );
// }

import React, { useState, useEffect, useContext, useRef } from 'react';
import PropTypes from 'prop-types';
import { View, FlatList } from 'react-native';
import { useSafeArea } from 'react-native-safe-area-context';

import IconLabelButton from '../UI/buttons/IconLabelButton';
import ContainerView from '../UI/views/ContainerView';
import ProfileImageView from '../UI/views/ProfileImageView';
import UserInfoView from '../UI/views/UserInfoView';
import ProfileSocialView from '../UI/views/ProfileSocialView';
import FooterView from '../UI/views/footer/FooterView';
import { FEED } from '../helpers/dataHelper';
import ExploreListItem from '../UI/lists/ExploreListItem';

import { Context } from '../context/store';

import styles from './styles';

// DISPLAYS THE PROFILE SCREEN
// Applies the following props:
// route (contains params with all the user information

const checkmarkIcon = require('../../assets/icons/checkmark.png');

const Profile = ({ route }) => {
  let { following } = route.params.user;

  const footerButtonRef = useRef(null);
  const { state } = useContext(Context);

  const [user, setUser] = useState(null);

  const handleFollowPress = () => {
    following = !following;
    footerButtonRef.current.setNativeProps({
      style: { opacity: following ? 1 : 0.1 },
    });
  };

  useEffect(() => {
    if (route.params && route.params.user) {
      setUser(route.params.user);
    }
  }, [route]);

  if (user === null) {
    return <View style={{ paddingBottom: useSafeArea().bottom }} />;
  }

  const renderProfileImage = () => {
    // DO GOOGLE / FACEBOOK LOGIN CHECK
    // IF TRUE, PROFILEIMAGE COMES FROM URL
    // IF FALSE, PROFILE IMAGE IS LOCAL IMAGE
    const profileImage =
      state.profileImage &&
      typeof state.profileImage === 'string' &&
      state.profileImage.includes('http')
        ? { uri: state.profileImage }
        : state.profileImage;

    return profileImage;
  };

  return (
    <ContainerView
      touchEnabled={false}
      headerHeight={route.params.headerHeight}
    >
      <FlatList
        ListHeaderComponent={() => (
          <View style={[styles.innerContainer, styles.profileHeaderContainer]}>
            <View style={styles.profileImageView}>
              <ProfileImageView
                profileImage={renderProfileImage()}
                name={user.name}
                isLarge
                onPressDisabled
              />
            </View>
            <UserInfoView
              name={user.name}
              location={user.location}
              email={user.email}
              description={user.description}
            />
            <ProfileSocialView
              likes={user.likes}
              followers={user.followers}
              posts={user.posts}
            />
          </View>
        )}
        contentContainerStyle={[
          styles.contentContainer,
          { paddingBottom: useSafeArea().bottom },
        ]}
        data={FEED}
        renderItem={({ item }) => (
          <ExploreListItem
            item={item}
            onPress={() => null}
            onCommentsPress={() => null}
            onLikePress={() => null}
            onSharePress={() => null}
            onProfilePress={() => null}
            hideHeader
          />
        )}
        keyExtractor={(item) => item.id.toString()}
      />
      <FooterView hasGradient>
        <View
          ref={footerButtonRef}
          style={{
            opacity: !following || user.name === state.name ? 0.1 : 1,
          }}
        >
          <IconLabelButton
            icon={checkmarkIcon}
            label="FOLLOWING"
            isCentered
            onPress={handleFollowPress}
            disabled={user.name === state.name}
          />
        </View>
      </FooterView>
    </ContainerView>
  );
};

Profile.propTypes = {
  route: PropTypes.shape({
    params: PropTypes.instanceOf(Object),
  }).isRequired,
};

export default Profile;