import { View, Text, Image, TouchableOpacity } from 'react-native';
import React from 'react';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import { StatusBar } from 'expo-status-bar';
import { LinearGradient } from 'expo-linear-gradient';
import Animated, { FadeInDown } from 'react-native-reanimated';
import { useRouter } from 'expo-router';

export default function Index() {
  // Initialize the Expo Router for navigation
  const router = useRouter();

  return (
    <View className="flex-1 flex justify-end">
      {/* Set the status bar text to light for visibility over the dark image */}
      <StatusBar style="light" />

      {/* 1. Background Image */}
      <Image 
        className="h-full w-full absolute" 
        source={require('../assets/images/welcome.png')} 
      />

      {/* 2. Linear Gradient Overlay */}
      <LinearGradient
        colors={['transparent', '#18181b']}
        style={{ width: wp(100), height: hp(70) }}
        start={{ x: 0.5, y: 0 }}
        end={{ x: 0.5, y: 1 }}
        className="flex justify-end pb-12 space-y-8"
      >
        
        {/* 3. Animated Title Text */}
        <Animated.View 
          entering={FadeInDown.delay(100).springify()} 
          className="flex items-center"
        >
          <Text className="text-white font-bold tracking-wide" style={{ fontSize: hp(5) }}>
            BE <Text className="text-rose-500">READY</Text>
          </Text>
        </Animated.View>

        {/* 4. Animated "Get Started" Button */}
        <Animated.View entering={FadeInDown.delay(200).springify()}>
          <TouchableOpacity
            onPress={() => router.push('home')}
            style={{ height: hp(7), width: wp(80) }}
            className="bg-rose-500 flex items-center justify-center mx-auto rounded-full border-[2px] border-neutral-200"
          >
            <Text style={{ fontSize: hp(3) }} className="text-white font-bold tracking-widest">
              Get Started
            </Text>
          </TouchableOpacity>
        </Animated.View>

      </LinearGradient>
    </View>
  );
}