import React from 'react';
import { View, Dimensions, Image } from 'react-native';
import Carousel from 'react-native-reanimated-carousel';

const { width } = Dimensions.get('window');
import { sliderImages } from '../constants'; // Double-check this path matches your project

export default function ImageSlider() {
  return (
    <View style={{ flex: 1, alignItems: 'center' }}>
      <Carousel
        loop
        width={width}
        height={width * 0.5} // Adjust height aspect ratio as needed
        autoPlay={true}
        data={sliderImages}
        scrollAnimationDuration={1000}
        autoPlayInterval={4000}
        mode="parallax"
        modeConfig={{
          parallaxScrollingScale: 0.9,
          parallaxScrollingOffset: 50,
        }}
        renderItem={({ item }) => (
          <View style={{ flex: 1, justifyContent: 'center', paddingHorizontal: 10 }}>
            <Image
              source={item}
              style={{ width: '100%', height: '100%', borderRadius: 30, resizeMode: 'cover' }}
            />
          </View>
        )}
      />
    </View>
  );
}