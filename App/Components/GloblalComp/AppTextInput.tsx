import React from 'react';
import { View, TextInput, StyleSheet, ViewStyle, TextStyle, TextInputProps, TouchableOpacity, Text } from 'react-native';
import { moderateScale } from '../../Constants/PixelRatio';
import { COLORS } from '../../Constants/Colors';
import { FONTS } from '../../Constants/Fonts';

interface AppTextInputProps {
    placeholder?: string;
    inputStyle?: TextStyle;
    containerStyle?: ViewStyle;
    placeholderTextColor?: string;
    leftIcon?: React.ReactNode;
    rightIcon?: React.ReactNode;
    onLeftIconPress?: () => void;
    onRightIconPress?: () => void;
    error?: boolean | string
}

const AppTextInput: React.FC<AppTextInputProps & TextInputProps> = ({
    placeholder = '',
    inputStyle,
    containerStyle,
    placeholderTextColor = '#999',
    leftIcon,
    rightIcon,
    onLeftIconPress,
    onRightIconPress,
    error = false,
    ...props
}) => {
    return (
        <>
            <View style={[styles.container, containerStyle,{borderColor:error?"red":'#ddd'}]}>
                {leftIcon && (
                    <TouchableOpacity onPress={onLeftIconPress} style={styles.iconContainer}>
                        {leftIcon}
                    </TouchableOpacity>
                )}
                <TextInput
                    style={[styles.input, inputStyle, leftIcon ? styles.inputWithLeftIcon : {}, rightIcon ? styles.inputWithRightIcon : {}]}
                    placeholder={placeholder}
                    placeholderTextColor={placeholderTextColor}
                    {...props}
                />
                {rightIcon && (
                    <TouchableOpacity onPress={onRightIconPress} style={styles.iconContainer}>
                        {rightIcon}
                    </TouchableOpacity>
                )}
            </View>
            {error && <Text
                style={{
                    color: "red",
                    fontSize: moderateScale(13),
                    fontFamily: FONTS.regular,
                    marginHorizontal: moderateScale(15),
                }}>
                {error}
            </Text>}
        </>

    );
};

const styles = StyleSheet.create({
    container: {
        marginTop: moderateScale(15),
        marginHorizontal: moderateScale(15),
        borderRadius: 5,
        borderWidth: 0.5,
        elevation: 3,
        paddingHorizontal: 10,
        backgroundColor: '#fff',
        flexDirection: 'row',
        alignItems: 'center',
    },
    input: {
        flex: 1,
        height: moderateScale(45),
        fontSize: 16,
        color: COLORS.primaryFontColor,
        fontFamily: FONTS.regular,
    },
    inputWithLeftIcon: {
        marginLeft: moderateScale(10),
    },
    inputWithRightIcon: {
        marginRight: moderateScale(10),
    },
    iconContainer: {
        justifyContent: 'center',
        alignItems: 'center',
    },
});

export default AppTextInput;
