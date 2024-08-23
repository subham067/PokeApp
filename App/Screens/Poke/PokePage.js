import React, { useEffect, useState } from 'react';
import { StyleSheet, Text, View, FlatList, ActivityIndicator } from 'react-native';
import { useFocusEffect } from '@react-navigation/native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import Container from '../../Components/GloblalComp/Container';
import Header from '../../Components/GloblalComp/Header';
import AppButton from '../../Components/GloblalComp/AppButton';
import { COLORS } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import { FONTS } from '../../Constants/Fonts';
import { addNotification } from '../../Services/NotificationService';
import UserCard from '../../Components/Poke/UserCard';
import Toast from 'react-native-toast-message';

const PokePage = () => {
    const { userData } = useSelector(state => state.User);
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);
    const [isPoking, setIsPoking] = useState(false);

    const fetchUsers = async () => {
        setLoading(true);
        try {
            const querySnapshot = await firestore()
                .collection('users')
                .where('uid', '!=', userData.uid)
                .get();

            const usersList = querySnapshot.docs.map(doc => ({
                id: doc.id,
                ...doc.data(),
            }));

            setUsers(usersList);
        } catch (error) {
            console.error('Error fetching users: ', error);
        } finally {
            setLoading(false);
        }
    };

    useFocusEffect(
        React.useCallback(() => {
            fetchUsers();
        }, [])
    );

    const sendNotification = async () => {
        setIsPoking(true);
        try {
            await addNotification(userData.name, userData.uid);
            Toast.show({
                type: 'success',
                text1: 'Notification Sent',
                text2: 'All users have been poked successfully!',
            });
        } catch (error) {
            console.error('Error sending notification:', error);
            Toast.show({
                type: 'error',
                text1: 'Notification Failed',
                text2: 'There was an error sending the notification.',
            });
        } finally {
            setIsPoking(false);
        }
    };

    return (
        <Container>
            <Header title="Poke" />
            {loading ? (
                <View style={styles.loaderContainer}>
                    <ActivityIndicator size="large" color={COLORS.primaryThemeColor} />
                </View>
            ) : users.length === 0 ? (
                <View style={styles.noUsersContainer}>
                    <Text style={styles.noUsersText}>No user found!</Text>
                </View>
            ) : (
                <FlatList
                    data={users}
                    renderItem={({ item }) => <UserCard user={item} />}
                    keyExtractor={item => item.id}
                    contentContainerStyle={styles.listContainer}
                />
            )}
            <View style={styles.footer}>
                <AppButton
                    title={'Poke All!'}
                    onPress={sendNotification}
                    disabled={isPoking}
                    loader={isPoking}
                />
            </View>
        </Container>
    );
};

const styles = StyleSheet.create({
    listContainer: {
        padding: moderateScale(10),
    },
    loaderContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noUsersContainer: {
        flex: 1,
        justifyContent: 'center',
        alignItems: 'center',
    },
    noUsersText: {
        color: COLORS.primaryFontColor,
        fontSize: 20,
        fontFamily: FONTS.bold,
    },
    footer: {
        backgroundColor: '#FAFCFF',
        paddingVertical: moderateScale(15),
        borderTopLeftRadius: moderateScale(10),
        borderTopRightRadius: moderateScale(10),
        elevation: 6,
    },
});

export default PokePage;
