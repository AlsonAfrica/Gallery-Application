import { Stack } from 'expo-router';
import { GestureHandlerRootView } from 'react-native-gesture-handler';

export default function RootLayout() {
  return (
    <GestureHandlerRootView style={{ flex: 1 }}>
      <Stack
        screenOptions={{
          headerShown: true,
          gestureDirection: 'vertical',
          animation: 'fade',
        }}
      />
    </GestureHandlerRootView>
  );
}