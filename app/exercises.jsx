import { View, Text, TouchableOpacity, Image } from 'react-native';
import React, { useEffect, useState } from 'react';
import { useLocalSearchParams, useRouter } from 'expo-router';
import { fetchExercisesByBodypart } from '../api/exerciseDB';
import { StatusBar } from 'expo-status-bar';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';
import Ionicons from 'react-native-vector-icons/Ionicons';
import ExerciseList from '../components/ExerciseList';
import { ScrollView } from 'react-native-virtualized-view';

export default function Exercises() {
  const router = useRouter();
  const [exercises, setExercises] = useState([]);
  const item = useLocalSearchParams();

  useEffect(() => {
    if (item && item.name) {
      getExercises(item.name.toLowerCase());
    }
  }, [item]);

  const getExercises = async (bodyPart) => {
    let data = await fetchExercisesByBodypart(bodyPart);
    setExercises(data);
  };

  return (
    <ScrollView>
      <StatusBar style="light" />
      
      {/* Top Banner Image parsed dynamically from navigation params */}
      <Image 
        source={item.image}
        style={{ width: wp(100), height: hp(45) }}
        className="rounded-b-[40px]"
      />
      
      {/* Floating Back Arrow Overlay */}
      <TouchableOpacity 
        onPress={() => router.back()}
        className="bg-rose-500 mx-4 absolute flex justify-center items-center rounded-full"
        style={{ height: hp(5.5), width: hp(5.5), marginTop: hp(7) }}
      >
        <Ionicons name="caret-back-outline" size={hp(3)} color="white" />
      </TouchableOpacity>

      {/* Exercises Section Content Layout */}
      <View className="mx-4 space-y-3 mt-4">
        <Text style={{ fontSize: hp(3) }} className="font-semibold text-neutral-700 capitalize">
          {item.name} Exercises
        </Text>
        
        {/* Core dynamic Multi-Column Grid View component */}
        <View className="mb-10">
          <ExerciseList data={exercises} />
        </View>
      </View>
    </ScrollView>
  );
}