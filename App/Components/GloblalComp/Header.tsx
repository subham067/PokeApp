import React from 'react';
import { View, Text, Image, TouchableOpacity, StyleSheet, ViewStyle, TextStyle, ImageSourcePropType } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { COLORS } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import NavigationService from '../../Services/Navigation';

interface HeaderProps {
    title: string;
    onMenuPress?: () => void;
    containerStyle?: ViewStyle;
    titleStyle?: TextStyle;
    menuIcon?: ImageSourcePropType;
}

const Header: React.FC<HeaderProps> = ({
    title,
    containerStyle,
    titleStyle,
}) => {
    return (
        <View style={[styles.container, containerStyle]}>
            <Text style={[styles.title, titleStyle]}>{title}</Text>
            <TouchableOpacity onPress={() => NavigationService.openDrawer()} style={styles.menuButton}>
                <Image source={require("../../Assets/Images/manu.png")} style={styles.menuIcon} />
            </TouchableOpacity>
        </View>
    );
};

const styles = StyleSheet.create({
    container: {
        flexDirection: 'row',
        alignItems: 'center',
        justifyContent: 'space-between',
        paddingHorizontal: moderateScale(15),
        paddingVertical: moderateScale(10),
        backgroundColor: COLORS.pageBackgroundColor,
        elevation: 3,
    },
    title: {
        color: COLORS.primaryFontColor,
        fontSize: moderateScale(18),
        fontFamily: FONTS.bold,
    },
    menuButton: {
        padding: moderateScale(5),
    },
    menuIcon: {
        width: moderateScale(25),
        height: moderateScale(25),
        resizeMode: 'contain',
    },
});

export default Header;
