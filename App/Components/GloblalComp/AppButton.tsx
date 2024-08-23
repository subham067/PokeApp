import React from 'react';
import { TouchableOpacity, Text, StyleSheet, ActivityIndicator, ViewStyle, TextStyle } from 'react-native';
import { COLORS } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';

interface ButtonProps {
  title: string;
  onPress?: () => void;
  disabled?: boolean;
  loader?: boolean;
  titleStyle?: TextStyle;
  containerStyle?: ViewStyle;
}

const AppButton: React.FC<ButtonProps> = ({
  title,
  onPress = () => { },
  disabled = false,
  loader = false,
  titleStyle,
  containerStyle,
}) => {
  return (
    <TouchableOpacity
      style={[
        styles.buttonContainer,
        containerStyle,
        disabled ? styles.disabledButton : null,
      ]}
      onPress={onPress}
      disabled={disabled || loader}
    >
      {loader ? (
        <ActivityIndicator color="#fff" />
      ) : (
        <Text style={[styles.buttonText, titleStyle]}>{title}</Text>
      )}
    </TouchableOpacity>
  );
};

const styles = StyleSheet.create({
  buttonContainer: {
    marginHorizontal:moderateScale(15),
    backgroundColor: COLORS.primaryThemeColor,
    paddingVertical: moderateScale(12),
    paddingHorizontal: moderateScale(24),
    borderRadius: 5,
    alignItems: 'center',
    justifyContent: 'center',
  },
  disabledButton: {
    backgroundColor:COLORS.secondaryThemeColor,
  },
  buttonText: {
    color: '#FFFFFF',
    fontSize: 18,
    fontFamily:FONTS.bold
  },
});

export default AppButton;
