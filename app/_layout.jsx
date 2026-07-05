// 1. Import the global CSS file required by NativeWind v4
import '../global.css'; 

import { Stack } from 'expo-router';
import React from 'react';

export default function RootLayout() {
  return (
    <Stack
      screenOptions={{
        // This hides the default header across all screens in the stack
        headerShown: false, 
      }}
    >
      {/* Explicitly defining the index (Welcome) screen */}
      <Stack.Screen 
        name="index" 
        options={{ 
          presentation: 'fullScreenModal',
        }} 
      />
      
      {/* Explicitly defining the home screen */}
      <Stack.Screen 
        name="home" 
      />

      {/* Explicitly defining the exercises listing screen */}
      <Stack.Screen 
        name="exercises" 
      />

      {/* Explicitly defining the exercise details popup modal */}
      <Stack.Screen 
        name="exerciseDetails" 
        options={{
          presentation: 'modal', // Slides up smoothly from the bottom
        }} 
      />
    </Stack>
  );
}