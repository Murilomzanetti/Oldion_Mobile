import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import SplashScreen from './screens/SplashScreen';
import CreateAccountScreen from './screens/CreateAccountScreen';
import LoginAccountScreen from './screens/LoginAccountScreen';
import CreateYourNameScreen from './screens/CreateYourNameScreen';

const Stack = createStackNavigator();

export default function App() {
  return (
    <NavigationContainer>
      <Stack.Navigator screenOptions={{ headerShown: false }}>
        <Stack.Screen name="SplashScreen" component={SplashScreen} />
        <Stack.Screen name="CreateAccountScreen" component={CreateAccountScreen} />
        <Stack.Screen name="LoginAccountScreen" component={LoginAccountScreen} />
        <Stack.Screen name="CreateYourNameScreen" component={CreateYourNameScreen} />


      </Stack.Navigator>
    </NavigationContainer>
  );
}
