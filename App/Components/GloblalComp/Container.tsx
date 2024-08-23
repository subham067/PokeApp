import React from 'react';
import { View, StyleSheet, ViewStyle, StatusBar } from 'react-native';
import { COLORS } from '../../Constants/Colors';

interface ContainerProps {
    children: React.ReactNode;
    style?: ViewStyle;
}

const Container: React.FC<ContainerProps> = ({ children, style }) => {
    return <>
        <StatusBar backgroundColor={COLORS.pageBackgroundColor} barStyle={'dark-content'} />
        <View style={[styles.container, style]}>{children}</View>
    </>;
};

const styles = StyleSheet.create({
    container: {
        flex: 1,
        backgroundColor: COLORS.pageBackgroundColor, // You can customize the background color as needed
    },
});

export default Container;
