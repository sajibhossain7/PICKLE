import { View, FlatList } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import EquipmentCard from './EquipmentCard';

export default function EquipmentList({ data }) {
  const router = useRouter();

  const handlePress = (item) => {
    // Params must be strings — arrays are JSON-stringified and parsed on the details screen
    router.push({
      pathname: '/exerciseDetails',
      params: {
        type: 'equipment',
        name: item.name,
        icon: item.icon,
        description: item.description,
        difficulty: item.difficulty,
        equipmentUsed: item.equipmentUsed,
        bodyPart: item.bodyPart,
        sets: item.sets,
        reps: item.reps,
        restTime: item.restTime,
        primaryMuscles: JSON.stringify(item.primaryMuscles),
        instructions: JSON.stringify(item.instructions),
        tips: JSON.stringify(item.tips),
        commonMistakes: JSON.stringify(item.commonMistakes),
      },
    });
  };

  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 20 }}
        columnWrapperStyle={{ justifyContent: 'space-between' }}
        initialNumToRender={6}
        removeClippedSubviews
        renderItem={({ item }) => (
          <EquipmentCard item={item} onPress={() => handlePress(item)} />
        )}
      />
    </View>
  );
}