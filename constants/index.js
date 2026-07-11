import Constants from 'expo-constants';

// Reads the RapidAPI key from app.config.js -> extra.rapidApiKey,
// which in turn comes from the .env file (never hardcoded here).
export const rapidApiKey = Constants.expoConfig.extra.rapidApiKey;

export const sliderImages = [
    require('../assets/images/slide1.png'),
    require('../assets/images/slide2.png'),
    require('../assets/images/slide3.png'),
    require('../assets/images/slide4.png'),
    require('../assets/images/slide5.png'),
]

export const bodyParts = [
  { name: 'back', image: require('../assets/images/back.png') },
  { name: 'cardio', image: require('../assets/images/cardio.png') },
  { name: 'chest', image: require('../assets/images/chest.png') },
  { name: 'lower arms', image: require('../assets/images/lowerArms.png') },
  { name: 'lower legs', image: require('../assets/images/lowerLegs.png') },
  { name: 'neck', image: require('../assets/images/neck.png') },
  { name: 'shoulders', image: require('../assets/images/shoulders.png') },
  { name: 'upper arms', image: require('../assets/images/upperArms.png') },
  { name: 'upper legs', image: require('../assets/images/upperLegs.png') },
  { name: 'waist', image: require('../assets/images/waist.png') },
];