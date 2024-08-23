import { Alert, FlatList, Image, Pressable, StyleSheet, Text, View } from 'react-native'
import React from 'react'
import Container from '../GloblalComp/Container'
import AntDesign from 'react-native-vector-icons/AntDesign'
import FontAwesome from 'react-native-vector-icons/FontAwesome'
import { COLORS } from '../../Constants/Colors'
import { FONTS } from '../../Constants/Fonts'
import { moderateScale } from '../../Constants/PixelRatio'
import NavigationService from '../../Services/Navigation'
import { useDispatch, useSelector } from 'react-redux'
import { logout } from '../../Redux/reducer/User'
import AuthService from '../../Services/Auth'

const DrawerComp = () => {
  const { userData } = useSelector(state => state.User);
  const dispatch = useDispatch();

  const options = [
    {
      id: 1,
      name: "Edit profile",
      onPress: () => NavigationService.navigate("EditProfile")
    },
    {
      id: 2,
      name: "Poke",
      onPress: () => NavigationService.navigate("PokePage")
    },
    {
      id: 3,
      name: "Notification",
      onPress: () => NavigationService.navigate("Notification")
    },
    {
      id: 4,
      name: "Logout",
      onPress: ()=> logoutConfirmation()
    }
  ]
  const logoutConfirmation = () => {
    Alert.alert(
      'Confirm Logout',
      'Are you sure you want to log out?',
      [
        {
          text: 'Cancel',
          style: 'cancel',
        },
        {
          text: 'Log Out',
          onPress: () => handleLogout(),
          style: 'destructive',
        },
      ],
      { cancelable: false }
    );
  };
  function handleLogout() {
    AuthService.setAccount(null)
    dispatch(logout());
  }
  return (
    <Container>
      <Pressable
        onPress={() => NavigationService.closeDrawer()}
        style={{
          flexDirection: "row",
          marginLeft: moderateScale(10),
          marginTop: moderateScale(15),
          alignItems: "center"
        }}>
        <AntDesign name="caretleft" size={20} color={COLORS.primaryFontColor} />
        <Text style={{
          color: COLORS.primaryFontColor,
          fontSize: 16,
          fontFamily: FONTS.regular
        }}>
          Back
        </Text>
      </Pressable>
      <View style={{ alignSelf: "center", marginTop: moderateScale(30) }}>
        <Image source={{ uri: userData.image ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
          style={{
            width: moderateScale(90),
            height: moderateScale(90),
          }}
        />
        <View style={{
          width: moderateScale(28),
          height: moderateScale(28),
          backgroundColor: "#FFF3E9",
          borderRadius: 20,
          justifyContent: "center",
          alignItems: "center",
          position: "absolute",
          bottom: 0,
          right: 0,
          elevation: 2
        }}>
          <FontAwesome name="camera" color={COLORS.primaryThemeColor} size={15} />
        </View>

      </View>
      <Text style={{
        color: COLORS.primaryFontColor,
        fontSize: 18,
        fontFamily: FONTS.regular,
        textAlign: "center",
        marginTop: moderateScale(10)
      }}>
        {userData.name}
      </Text>
      <FlatList
        data={options}
        contentContainerStyle={{ marginTop: moderateScale(30) }}
        renderItem={({ item }) => (
          <Pressable onPress={item.onPress} style={{
            flexDirection: "row",
            alignItems: "center",
            justifyContent: "space-between",
            marginHorizontal: moderateScale(10),
            paddingHorizontal: moderateScale(10),
            paddingVertical: moderateScale(10),
            borderBottomWidth: 1,
            borderStyle: "dashed",
            marginTop: moderateScale(10)
          }}>
            <Text style={{
              color: COLORS.primaryFontColor,
              fontSize: 16,
              fontFamily: FONTS.regular,
            }}>
              {item.name}
            </Text>
            <AntDesign name="caretright" size={20} color={COLORS.primaryThemeColor} />
          </Pressable>
        )}
      />
      <Text style={{
        color: COLORS.primaryFontColor,
        fontSize: 16,
        fontFamily: FONTS.regular,
        textAlign: "center",
        marginBottom: moderateScale(15)
      }}>
        v 1. 0
      </Text>
    </Container>
  )
}

export default DrawerComp

const styles = StyleSheet.create({})