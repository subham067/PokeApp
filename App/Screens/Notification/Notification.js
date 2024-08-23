import React, { useEffect, useState } from 'react';
import { StyleSheet, View, FlatList, ActivityIndicator, Text } from 'react-native';
import firestore from '@react-native-firebase/firestore';
import { useSelector } from 'react-redux';
import { COLORS } from '../../Constants/Colors';
import { moderateScale } from '../../Constants/PixelRatio';
import NotificationCard from '../../Components/Notification/NotificationCard';
import { FONTS } from '../../Constants/Fonts';
import Container from '../../Components/GloblalComp/Container';
import Header from '../../Components/GloblalComp/Header';

const Notification = () => {
  const { userData } = useSelector(state => state.User);
  const [notifications, setNotifications] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const unsubscribe = firestore()
      .collection('notificationsHistory')
      .where('uid', '==', userData.uid)
      .onSnapshot(
        querySnapshot => {
          const notificationsList = querySnapshot.docs.map(doc => ({
            id: doc.id,
            ...doc.data(),
          }));
          setNotifications(notificationsList);
          setLoading(false);
        },
        error => {
          console.error('Error fetching notifications: ', error);
          setLoading(false);
        }
      );

    return () => unsubscribe(); // Unsubscribe from listener when component unmounts
  }, []);

  

  return (
    <Container>
        <Header title='Notification' />
      {loading ? (
        <View style={styles.loaderContainer}>
          <ActivityIndicator size="large" color={COLORS.primaryThemeColor} />
        </View>
      ) : notifications.length === 0 ? (
        <View style={styles.noNotificationsContainer}>
          <Text style={styles.noNotificationsText}>No notifications found!</Text>
        </View>
      ) : (
        <FlatList
          data={notifications}
          renderItem={({ item }) => <NotificationCard notification={item} />}
          keyExtractor={item => item.id}
          contentContainerStyle={styles.listContainer}
        />
      )}
    </Container>
  );
};

export default Notification;

const styles = StyleSheet.create({
  loaderContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    marginTop:10
  },
  noNotificationsContainer: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
  },
  noNotificationsText: {
    color: COLORS.primaryFontColor,
    fontSize: 20,
    fontFamily: FONTS.bold,
  },
  listContainer: {
    paddingBottom: moderateScale(10),
    paddingHorizontal:moderateScale(10),
    marginTop:10
  },
});
