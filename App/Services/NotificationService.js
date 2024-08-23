import notifee, { AndroidImportance } from '@notifee/react-native';
import firestore from '@react-native-firebase/firestore';

const sendNotificationToAllUsers = async (title, body) => {

    try {
        await notifee.requestPermission()
        const channelId = await notifee.createChannel({
            id: 'default',
            name: 'Default Channel',
            sound: 'default',
            importance: AndroidImportance.HIGH,
        });

        await notifee.displayNotification({
            title: title,
            body: body,
            android: {
                channelId,
                sound: 'default',
                importance: AndroidImportance.HIGH,
                smallIcon: 'ic_launcher',
                pressAction: {
                    id: 'default',
                },
            },
        });
    } catch (error) {
        console.error('Error sending notification:', error);
    }
};

const setupNotificationListener = (uid) => {
    return firestore()
        .collection('notifications')
        .where("time", ">=", new Date().getTime())
        .onSnapshot((querySnapshot) => {

            let data = querySnapshot.docChanges().find(it => it.type === "added")
            if (data && data.doc.data().uid != uid) {
                const notificationData = data.doc.data();
                sendNotificationToAllUsers("Poke Notification", `You are poked by ${notificationData.userName}!`);
                let notificationsHistory = {
                    uid,
                    pokeUid: notificationData.uid,
                    title: "Poke Notification",
                    body: `You are poked by ${notificationData.userName}!`,
                    timestamp: firestore.FieldValue.serverTimestamp(),
                }
                firestore().collection('notificationsHistory').add(notificationsHistory);
            }
        }, (error) => {
            console.error('Error fetching notifications:', error);
        });
};

const addNotification = async (name, uid) => {
    try {
        await firestore().collection('notifications').add({
            uid: uid,
            time: new Date().getTime(),
            userName: name,
            timestamp: firestore.FieldValue.serverTimestamp(), // Optional: for ordering by time
        });
        console.log('Notification added successfully.');
    } catch (error) {
        console.error('Error adding notification:', error);
    }
};

export { setupNotificationListener, addNotification };
