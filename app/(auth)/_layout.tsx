import React from 'react';
import { Stack } from 'expo-router';

export default function AuthLayout() {
  return (
    <Stack screenOptions={{ headerShown: false, contentStyle: { backgroundColor: '#0F0E17' } }}>
      <Stack.Screen name="login" />
    </Stack>
  );
}
