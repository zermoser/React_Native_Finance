import { Stack } from 'expo-router';
import AppNavigator from '../src/navigation/AppNavigator';

export default function RootLayout() {
  return (
    <Stack>
      <Stack.Screen 
        name="index" 
        options={{ headerShown: false }} 
      />
      <AppNavigator />
    </Stack>
  );
}