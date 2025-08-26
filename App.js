import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';

import CreateResponsibleOrElderly from './screens/CreateResponsibleOrElderly';
import CreateAccountScreen from './screens/CreateAccountScreen';
import CreateYourNameScreen from './screens/CreateYourNameScreen';
import ConnectBraceletScreen from './screens/ConnectBraceletScreen';
import LoginAccountScreen from './screens/LoginAccountScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator
        initialRouteName="CreateResponsibleOrElderly"
        screenOptions={{ headerShown: false }}
      >
        <Stack.Screen name="CreateResponsibleOrElderly" component={CreateResponsibleOrElderly} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
        <Stack.Screen name="CreateYourNameScreen" component={CreateYourNameScreen} />
        <Stack.Screen name="ConnectBraceletScreen" component={ConnectBraceletScreen} />
        <Stack.Screen name="LoginAccountScreen" component={LoginAccountScreen} />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
