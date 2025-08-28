import React, { useEffect } from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import * as Notifications from 'expo-notifications';

import ElderlyAccountScreen from './screens/ElderlyAccountScreen';
import CreateResponsibleOrElderlyScreen from './screens/CreateResponsibleOrElderlyScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import CreateYourNameScreen from './screens/CreateYourNameScreen';
import ConnectBraceletScreen from './screens/ConnectBraceletScreen';
import LoginAccountScreen from './screens/LoginAccountScreen';
import SplashScreen from './screens/SplashScreen';
import AlarmsScreen from './screens/AlarmsScreen';

const Stack = createStackNavigator();

export default function App() {

  useEffect(() => {
    Notifications.requestPermissionsAsync();
  }, []);

  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="SplashScreen"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="CreateResponsibleOrElderlyScreen" component={CreateResponsibleOrElderlyScreen} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
        <Stack.Screen name="CreateYourNameScreen" component={CreateYourNameScreen} />
        <Stack.Screen name="ConnectBraceletScreen" component={ConnectBraceletScreen} />
        <Stack.Screen name="LoginAccountScreen" component={LoginAccountScreen} />
        <Stack.Screen name="ElderlyAccountScreen" component={ElderlyAccountScreen} />
        <Stack.Screen name="AlarmsScreen" component={AlarmsScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
