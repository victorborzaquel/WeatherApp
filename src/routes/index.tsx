import React from 'react';
import { NavigationContainer, RouteProp } from '@react-navigation/native';
import { createNativeStackNavigator, NativeStackNavigationProp } from '@react-navigation/native-stack';
import { Home } from '../screens/Home';
import { AddCity } from '../screens/AddCity';

type RootParamList = {
  Home: undefined;
  AddCity: undefined;
};

export type RootNavigationProps<Screen extends keyof RootParamList> = NativeStackNavigationProp<RootParamList, Screen>
export type RootRouteProps<Screen extends keyof RootParamList> = RouteProp<RootParamList, Screen>

const Stack = createNativeStackNavigator()

export function Routes() {
  return (
    <NavigationContainer>
      <Stack.Navigator initialRouteName='Home'>
        <Stack.Screen
          name="Home"
          component={Home}
          options={{ title: 'Tempo agora' }}
        />
        <Stack.Screen
          name="AddCity"
          component={AddCity}
          options={{ title: 'Adicione uma cidade' }}
          // options={{headerShown: false}}
        />
      </Stack.Navigator>
    </NavigationContainer>
  );
}
