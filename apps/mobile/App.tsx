import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import RemoteScreen from './screens/RemoteScreen';
import SettingsScreen from './screens/SettingsScreen';
import { RemoteProvider } from './RemoteContext';

const Stack = createStackNavigator();

const App = () => {
  return (
    <RemoteProvider>
      <NavigationContainer>
        <Stack.Navigator
          initialRouteName='Remote'
          screenOptions={{ headerShown: false }}
        >
          <Stack.Screen name='Remote' component={RemoteScreen} />
          <Stack.Screen name='Settings' component={SettingsScreen} />
        </Stack.Navigator>
      </NavigationContainer>
    </RemoteProvider>
  );
};

export default App;
