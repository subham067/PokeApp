import { View, Text, Image, StyleSheet } from 'react-native'
import React from 'react'
import Container from '../../Components/GloblalComp/Container'
import Header from '../../Components/GloblalComp/Header'
import { moderateScale } from '../../Constants/PixelRatio'
import AppButton from '../../Components/GloblalComp/AppButton'
import { FONTS } from '../../Constants/Fonts'
import { COLORS } from '../../Constants/Colors'
import NavigationService from '../../Services/Navigation'

const Home = () => {
  return (
    <Container>
      <Header title='Home' />
      <View style={styles.container}>
        <Image
          source={require("../../Assets/Images/Notification.png")}
          style={styles.image}
        />
        <Text style={styles.text}>
          Lorem ipsum dolor sit amet, consectetur adipiscing elit. Duis et ante elit. Sed vitae erat quis dui viverra cursus in sed leo.
        </Text>
        <AppButton title='Let’s poke!' onPress={() => NavigationService.navigate("PokePage")} />
      </View>
    </Container>
  )
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: "center",
  },
  image: {
    width: moderateScale(127),
    height: moderateScale(127),
    alignSelf: "center"
  },
  text: {
    color: COLORS.primaryFontColor,
    fontFamily: FONTS.bold,
    fontSize: 15,
    margin: moderateScale(15),
    textAlign: "center"
  }
});

export default Home
