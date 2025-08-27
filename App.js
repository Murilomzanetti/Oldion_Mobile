import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import ElderlyAccountScreen from './screens/ElderlyAccountScreen';
import CreateResponsibleOrElderlyScreen from './screens/CreateResponsibleOrElderlyScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import CreateYourNameScreen from './screens/CreateYourNameScreen';
import ConnectBraceletScreen from './screens/ConnectBraceletScreen';
import LoginAccountScreen from './screens/LoginAccountScreen';
import SplashScreen from './screens/SplashScreen';

const Stack = createStackNavigator();

export default function App() {
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
      </Stack.Navigator>
    </NavigationContainer>
  );
}
