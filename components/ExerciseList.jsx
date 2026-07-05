import { View, Text, FlatList, TouchableOpacity } from 'react-native';
import React from 'react';
import { useRouter } from 'expo-router';
import { Image } from 'expo-image';
import { widthPercentageToDP as wp, heightPercentageToDP as hp } from 'react-native-responsive-screen';

export default function ExerciseList({ data }) {
  const router = useRouter();

  return (
    <View>
      <FlatList
        data={data}
        numColumns={2}
        keyExtractor={(item) => item.id}
        showsVerticalScrollIndicator={false}
        contentContainerStyle={{ paddingBottom: 60, paddingTop: 20 }}
        columnWrapperStyle={{
          justifyContent: 'space-between',
        }}
        renderItem={({ item, index }) => (
          <ExerciseCard index={index} item={item} router={router} />
        )}
      />
    </View>
  );
}

const ExerciseCard = ({ item, router, index }) => {
  // Safe URL fix: Replaces insecure http:// with secure https:// to prevent blank images
  const secureGifUrl = item?.gifUrl ? item.gifUrl.replace('http://', 'https://') : null;

  return (
    <View>
      <TouchableOpacity
        onPress={() => router.push({ pathname: '/exerciseDetails', params: item })}
        className="flex py-3 space-y-2"
      >
        {/* Added overflow-hidden to keep the image boundaries clipped and round */}
        <View className="bg-neutral-200 shadow rounded-[25px] overflow-hidden">
          <Image
            source={{ uri: secureGifUrl }}
            contentFit='cover'
            style={{ width: wp(44), height: wp(52) }}
            className="rounded-[25px]"
            // Optional optimization configurations from expo-image:
            transition={200}
            cachePolicy="disk"
          />
        </View>

        <Text
          style={{ fontSize: hp(1.7) }}
          className="text-neutral-700 font-semibold ml-1 tracking-wide"
        >
          {item?.name?.length > 20 ? item.name.slice(0, 20) + '...' : item.name}
        </Text>
      </TouchableOpacity>
    </View>
  );
};