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

  // New: detect whether this is equipment data (from EquipmentList) or ExerciseDB data
  const isEquipment = item.type === 'equipment';

  // New: safely parse JSON-stringified arrays coming from EquipmentList params
  const parseArray = (value) => {
    try {
      return JSON.parse(value) || [];
    } catch {
      return [];
    }
  };

  // ---------- EQUIPMENT LAYOUT ----------
  if (isEquipment) {
    const primaryMuscles = parseArray(item.primaryMuscles);
    const instructions = parseArray(item.instructions);
    const tips = parseArray(item.tips);
    const commonMistakes = parseArray(item.commonMistakes);

    return (
      <View className="flex flex-1 bg-white">
        {/* Icon Banner (placeholder for equipment image) */}
        <View
          className="shadow-md bg-rose-50 rounded-b-[40px] items-center justify-center"
          style={{ height: wp(80) }}
        >
          <Ionicons name={item.icon} size={hp(12)} color="#f43f5e" />
        </View>

        {/* Top Absolute Close Action Icon */}
        <TouchableOpacity
          onPress={() => router.back()}
          className="mx-2 absolute right-0 rounded-full items-center justify-center bg-white/60"
          style={{ marginTop: hp(2), height: hp(4.5), width: hp(4.5) }}
        >
          <Ionicons name="close-circle" size={hp(4.5)} color="#f43f5e" />
        </TouchableOpacity>

        <ScrollView
          className="mx-4 space-y-4 mt-3"
          showsVerticalScrollIndicator={false}
          contentContainerStyle={{ paddingBottom: 60 }}
        >
          <Animated.Text
            entering={FadeInDown.duration(300).springify()}
            style={{ fontSize: hp(3.5) }}
            className="font-semibold text-neutral-800"
          >
            {item.name}
          </Animated.Text>

          <Animated.Text
            entering={FadeInDown.duration(300).delay(100).springify()}
            style={{ fontSize: hp(1.9) }}
            className="text-neutral-600"
          >
            {item.description}
          </Animated.Text>

          <View className="flex-row flex-wrap mt-2" style={{ gap: 8 }}>
            <InfoPill label="Difficulty" value={item.difficulty} />
            <InfoPill label="Body Part" value={item.bodyPart} />
            <InfoPill label="Equipment" value={item.equipmentUsed} />
          </View>

          <Text style={{ fontSize: hp(2) }} className="text-neutral-700 mt-3">
            Target Muscles: <Text className="font-bold text-neutral-800">{primaryMuscles.join(', ')}</Text>
          </Text>

          <View className="flex-row justify-between mt-3 bg-neutral-100 rounded-[20px] p-4">
            <StatBlock label="Sets" value={item.sets} />
            <StatBlock label="Reps" value={item.reps} />
            <StatBlock label="Rest" value={item.restTime} />
          </View>

          <Section title="Instructions" items={instructions} />
          <Section title="Tips" items={tips} />
          <Section title="Common Mistakes" items={commonMistakes} />
        </ScrollView>
      </View>
    );
  }

  // ---------- ORIGINAL EXERCISEDB LAYOUT (unchanged) ----------

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
        className="mx-2 absolute right-0 rounded-full items-center justify-center bg-white/60"
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

// ---------- New helper components for the equipment layout ----------

const InfoPill = ({ label, value }) => (
  <View className="bg-neutral-100 px-3 py-1.5 rounded-full">
    <Text style={{ fontSize: hp(1.3) }} className="text-neutral-600">
      {label}: <Text className="font-semibold text-neutral-800">{value}</Text>
    </Text>
  </View>
);

const StatBlock = ({ label, value }) => (
  <View className="items-center">
    <Text style={{ fontSize: hp(2.2) }} className="font-bold text-rose-500">{value}</Text>
    <Text style={{ fontSize: hp(1.3) }} className="text-neutral-500">{label}</Text>
  </View>
);

const Section = ({ title, items }) => {
  if (!items?.length) return null;
  return (
    <View className="mt-4">
      <Text style={{ fontSize: hp(2.4) }} className="font-semibold text-neutral-800 mb-2">{title}</Text>
      {items.map((line, i) => (
        <Text key={i} style={{ fontSize: hp(1.7) }} className="text-neutral-600 mb-1">• {line.trim()}</Text>
      ))}
    </View>
  );
};