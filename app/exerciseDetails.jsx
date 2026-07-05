import { View, Text, TouchableOpacity, ScrollView } from 'react-native';
import React from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import Animated, { FadeInDown } from 'react-native-reanimated';

export default function ExerciseDetails() {
  const item = useLocalSearchParams();
  const router = useRouter();

  // Handle strings vs array types safely for instructions
  let instructions = [];
  if (item.instructions) {
    if (typeof item.instructions === 'string') {
      instructions = item.instructions.split(',');
    } else {
      instructions = item.instructions;
    }
  }

  // Safe formatting for secondary muscles array string serialization
  const renderSecondaryMuscles = () => {
    if (!item.secondaryMuscles) return "";
    if (typeof item.secondaryMuscles === 'string') {
      return item.secondaryMuscles.split(',').join(', ');
    }
    return item.secondaryMuscles.join(', ');
  };

  return (
    <View className="flex flex-1 bg-white">
      {/* Exercise Image Banner View */}
      <View className="shadow-md bg-neutral-200 rounded-b-[40px]">
        <Image
          source={{ uri: item.gifUrl }}
          contentFit="cover"
          style={{ width: wp(100), height: wp(100) }}
          className="rounded-b-[40px]"
        />
      </View>

      {/* Top Absolute Close Action Icon */}
      <TouchableOpacity
        onPress={() => router.back()}
        className="mx-2 absolute right-0 rounded-full items-center justify-center bg-white/60" // Added minor background contrast overlay
        style={{ marginTop: hp(2), height: hp(4.5), width: hp(4.5) }}
      >
        <Ionicons name="close-circle" size={hp(4.5)} color="#f43f5e" />
      </TouchableOpacity>

      {/* Primary Context Container */}
      <ScrollView
        className="mx-4 space-y-5 mt-3"
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60 }}
      >
        <Animated.Text
          entering={FadeInDown.duration(300).springify()}
          style={{ fontSize: hp(3.5) }}
          className="font-semibold text-neutral-800 tracking-wide capitalize"
        >
          {item.name}
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(300).delay(100).springify()}
          style={{ fontSize: hp(2) }}
          className="text-neutral-700 tracking-wide"
        >
          Equipment: <Text className="font-bold text-neutral-800 capitalize">{item.equipment}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(300).delay(200).springify()}
          style={{ fontSize: hp(2) }}
          className="text-neutral-700 tracking-wide"
        >
          Secondary Muscles: <Text className="font-bold text-neutral-800 capitalize">{renderSecondaryMuscles()}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(300).delay(300).springify()}
          style={{ fontSize: hp(2) }}
          className="text-neutral-700 tracking-wide"
        >
          Target Muscle: <Text className="font-bold text-neutral-800 capitalize">{item.target}</Text>
        </Animated.Text>

        <Animated.Text
          entering={FadeInDown.duration(300).delay(400).springify()}
          style={{ fontSize: hp(3) }}
          className="font-semibold text-neutral-800 tracking-wide mt-4"
        >
          Instructions
        </Animated.Text>

        {/* Mapped Step Iterations */}
        <View className="space-y-2.5 mt-2">
          {instructions.map((instruction, index) => (
            <Animated.Text
              entering={FadeInDown.duration(300).delay((index + 5) * 100).springify()}
              key={index}
              style={{ fontSize: hp(1.8) }}
              className="text-neutral-600 leading-relaxed"
            >
              {index + 1}. {instruction.trim()}
            </Animated.Text>
          ))}
        </View>
      </ScrollView>
    </View>
  );
}