import { View, Text, TouchableOpacity } from 'react-native';
import React from 'react';
import Ionicons from 'react-native-vector-icons/Ionicons';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

// Difficulty badge color mapping, kept within the app's existing rose/neutral theme
const difficultyStyles = {
  Beginner: 'bg-emerald-100 text-emerald-700',
  Intermediate: 'bg-amber-100 text-amber-700',
  Advanced: 'bg-rose-100 text-rose-700',
};

export default function EquipmentCard({ item, onPress }) {
  const badgeClass = difficultyStyles[item.difficulty] || 'bg-neutral-100 text-neutral-700';

  return (
    <TouchableOpacity
      onPress={onPress}
      style={{ width: wp(44) }}
      className="bg-white rounded-[25px] shadow mb-4 p-3"
    >
      {/* Icon placeholder standing in for an equipment image */}
      <View
        style={{ height: hp(12) }}
        className="bg-rose-50 rounded-[18px] items-center justify-center mb-3"
      >
        <Ionicons name={item.icon} size={hp(5)} color="#f43f5e" />
      </View>

      <Text style={{ fontSize: hp(1.8) }} className="font-semibold text-neutral-800">
        {item.name}
      </Text>

      <Text
        style={{ fontSize: hp(1.4) }}
        className="text-neutral-500 mt-1"
        numberOfLines={2}
      >
        {item.description}
      </Text>

      <View className="flex-row items-center justify-between mt-2">
        <View className={`px-2 py-1 rounded-full ${badgeClass.split(' ')[0]}`}>
          <Text style={{ fontSize: hp(1.2) }} className={badgeClass.split(' ')[1]}>
            {item.difficulty}
          </Text>
        </View>
      </View>

      <Text
        style={{ fontSize: hp(1.2) }}
        className="text-neutral-400 mt-2"
        numberOfLines={1}
      >
        {item.primaryMuscles.join(', ')}
      </Text>
    </TouchableOpacity>
  );
}