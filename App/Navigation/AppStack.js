
import React, { Component, useEffect } from 'react';
import Home from '../Screens/Home/Home';
import { createDrawerNavigator } from '@react-navigation/drawer';
import PokePage from '../Screens/Poke/PokePage';
import DrawerComp from '../Components/Drawer/DrawerComp';
import { setupNotificationListener } from '../Services/NotificationService';
import { useSelector } from 'react-redux';
import notifee from '@notifee/react-native';
import Notification from '../Screens/Notification/Notification';
import EditProfile from '../Screens/Profile/EditProfile';

const Drawer = createDrawerNavigator();

const AppStack = () => {
  const { userData } = useSelector(state => state.User);

  useEffect(() => {
    notifee.requestPermission()
    const unsubscribe = setupNotificationListener(userData.uid);

    return () => unsubscribe();
  }, []);
  return (
    <Drawer.Navigator
      drawerContent={props => <DrawerComp {...props} />}
      screenOptions={{
        headerShown: false,
        drawerPosition: "right"
      }}>
      <Drawer.Screen name="Home" component={Home} />
      <Drawer.Screen name="PokePage" component={PokePage} />
      <Drawer.Screen name="Notification" component={Notification} />
      <Drawer.Screen name="EditProfile" component={EditProfile} />
    </Drawer.Navigator>

  );
};

export default AppStack;
