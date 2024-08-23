import React from 'react';
import { View, Text, StyleSheet, Image } from 'react-native';
import { COLORS } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';
import { moderateScale } from '../../Constants/PixelRatio';
import Icon from 'react-native-vector-icons/Ionicons'; // Import the icon library

const NotificationCard = ({ notification }) => {
  return (
    <View style={styles.container}>
      <Icon name="notifications" size={moderateScale(30)} color={COLORS.primaryThemeColor} style={styles.icon} />
      <View style={styles.textContainer}>
        <Text style={styles.title}>{notification.title}</Text>
        <Text style={styles.body}>{notification.body}</Text>
        <Text style={styles.timestamp}>
          {notification.timestamp?.toDate().toLocaleString() ?? 'Just now'}
        </Text>
      </View>
    </View>
  );
};

export default NotificationCard;

const styles = StyleSheet.create({
  container: {
    flexDirection: 'row',
    backgroundColor: '#fff',
    padding: moderateScale(15),
    marginBottom: moderateScale(10),
    borderRadius: moderateScale(10),
    elevation: 2,
    alignItems: 'center',
  },
  icon: {
    marginRight: moderateScale(10),
  },
  textContainer: {
    flex: 1,
  },
  title: {
    color: COLORS.primaryFontColor,
    fontSize: 16,
    fontFamily: FONTS.bold,
    marginBottom: moderateScale(5),
  },
  body: {
    color: COLORS.secondaryFontColor,
    fontSize: 14,
    fontFamily: FONTS.regular,
    marginBottom: moderateScale(5),
  },
  timestamp: {
    color: COLORS.secondaryFontColor,
    fontSize: 12,
    fontFamily: FONTS.regular,
  },
});
