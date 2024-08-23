import React from 'react';
import { View, Text, Image, StyleSheet } from 'react-native';
import { COLORS } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';

const UserCard = ({ user }) => {
    return (
        <View style={styles.userContainer}>
            <Image
                source={{ uri: user.image ?? 'https://cdn-icons-png.flaticon.com/512/149/149071.png' }}
                style={styles.userImage}
            />
            <View style={styles.userInfo}>
                <Text style={styles.userName}>{user.name}</Text>
                <Text style={styles.userEmail}>{user.email}</Text>
            </View>
        </View>
    );
};

const styles = StyleSheet.create({
    userContainer: {
        flexDirection: 'row',
        alignItems: 'center',
        padding: moderateScale(10),
    },
    userImage: {
        width: moderateScale(50),
        height: moderateScale(50),
        borderRadius: moderateScale(25),
        marginRight: moderateScale(10),
    },
    userInfo: {
        flex: 1,
    },
    userName: {
        color: COLORS.primaryFontColor,
        fontSize: 15,
        fontFamily: FONTS.bold,
    },
    userEmail: {
        color: COLORS.secondaryFontColor,
        fontSize: 15,
        fontFamily: FONTS.regular,
        marginTop: moderateScale(3),
    },
});

export default UserCard;
