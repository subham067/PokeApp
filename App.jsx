import React, { useEffect, useState } from 'react';
import { ActivityIndicator, StatusBar, View } from 'react-native';
import { useDispatch, useSelector } from 'react-redux';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import { setUser } from './App/Redux/reducer/User';
import AuthService from './App/Services/Auth';
import NavigationService from './App/Services/Navigation';
import AuthStack from './App/Navigation/AuthStack';
import AppStack from './App/Navigation/AppStack';
import Toast from 'react-native-toast-message';
import RNBootSplash from "react-native-bootsplash";

const Stack = createStackNavigator();

const App = () => {
  const dispatch = useDispatch();

  const { loginStatus } = useSelector(state => state.User);

  useEffect(() => {
    checkUser();
  }, []);

  const checkUser = () => {
    AuthService.getAccount()
      .then(result => {
        if (result) {
          dispatch(setUser(result));
        }
      })
      .catch(err => {
        console.log('err>>>', err);
      })
      .finally(() => RNBootSplash.hide({ fade: true }))
  };

  return (

    <>

      <NavigationContainer ref={r => NavigationService.setTopLevelNavigator(r)}>
        <Stack.Navigator
          initialRouteName="AuthStack"
          screenOptions={{
            headerShown: false,
            animationEnabled: true,
          }}
        >
          {!loginStatus ? (
            <Stack.Screen name="AuthStack" component={AuthStack} />
          ) : (
            <Stack.Screen name="AppStack" component={AppStack} />
          )}
        </Stack.Navigator>
      </NavigationContainer>

      <Toast />
    </>
  );
};

export default App;

