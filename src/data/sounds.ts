
export interface Sound {
  id: string;
  name: string;
  description: string;
  audioSrc: string;
  category: 'rain' | 'thunder' | 'nature' | 'ambience';
  iconPath: string;
  color: string;
}

export const sounds: Sound[] = [
  {
    id: 'beach',
    name: 'Beach',
    description: 'Relaxing beach waves',
    audioSrc: '/sounds/beach.ogg',
    category: 'nature',
    iconPath: '/images/Beach-W.png',
    color: '#099FFF',
  },
  {
    id: 'birds',
    name: 'Birds',
    description: 'Birds chirping in nature',
    audioSrc: '/sounds/birds.ogg',
    category: 'nature',
    iconPath: '/images/Birds-W.png',
    color: '#4D7902',
  },
  {
    id: 'cafe',
    name: 'Cafe',
    description: 'Ambient cafe atmosphere',
    audioSrc: '/sounds/cafe.ogg',
    category: 'ambience',
    iconPath: '/images/Cafe-W.png',
    color: '#E6FB04',
  },
  {
    id: 'campfire',
    name: 'Campfire',
    description: 'Crackling campfire sounds',
    audioSrc: '/sounds/campfire.ogg',
    category: 'nature',
    iconPath: '/images/Campfire-W.png',
    color: '#FF6600',
  },
  {
    id: 'city',
    name: 'City',
    description: 'Urban city ambience',
    audioSrc: '/sounds/city.ogg',
    category: 'ambience',
    iconPath: '/images/City-W.png',
    color: '#E1C699',
  },
  {
    id: 'fireplace',
    name: 'Fireplace',
    description: 'Cozy fireplace sounds',
    audioSrc: '/sounds/fireplace.ogg',
    category: 'nature',
    iconPath: '/images/Fireplace-W.png',
    color: '#FF0000',
  },
  {
    id: 'forest',
    name: 'Forest',
    description: 'Peaceful forest ambience',
    audioSrc: '/sounds/forest.ogg',
    category: 'nature',
    iconPath: '/images/Forest-W.png',
    color: '#33FF00',
  },
  {
    id: 'night',
    name: 'Night',
    description: 'Night crickets and ambience',
    audioSrc: '/sounds/night-crickets.ogg',
    category: 'nature',
    iconPath: '/images/Night-W.png',
    color: '#1F51FF',
  },
  {
    id: 'white-noise',
    name: 'White\nNoise',
    description: 'White noise ambience',
    audioSrc: '/sounds/white-noise.ogg',
    category: 'ambience',
    iconPath: '/images/Noise-W.png',
    color: '#FFFFFF',
  },
  {
    id: 'brown-noise',
    name: 'Brown\nNoise',
    description: 'Brown noise ambience',
    audioSrc: '/sounds/brown-noise.ogg',
    category: 'ambience',
    iconPath: '/images/Noise-W.png',
    color: '#A52A2A',
  },
  {
    id: 'pink-noise',
    name: 'Pink\nNoise',
    description: 'Pink noise ambience',
    audioSrc: '/sounds/pink-noise.ogg',
    category: 'ambience',
    iconPath: '/images/Noise-W.png',
    color: '#cc0e74',
  },
  {
    id: 'rain',
    name: 'Rain',
    description: 'Gentle rainfall sounds',
    audioSrc: '/sounds/rain.ogg',
    category: 'rain',
    iconPath: '/images/Rain-W.png',
    color: '#0062FF',
  },
  {
    id: 'rain-camping',
    name: 'Rain\nCamping',
    description: 'Rain on camping tent',
    audioSrc: '/sounds/rain-camping.ogg',
    category: 'rain',
    iconPath: '/images/Rain_Camping-W.png',
    color: '#008080',
  },
  {
    id: 'heavy-rain',
    name: 'Rain\nHeavy',
    description: 'Heavy rainfall sounds',
    audioSrc: '/sounds/heavy-rain.ogg',
    category: 'rain',
    iconPath: '/images/Rain_Heavy-W.png',
    color: '#7F00FF',
  },
  {
    id: 'rain-window',
    name: 'Rain\nWindshield',
    description: 'Rain on a Car Windshield',
    audioSrc: '/sounds/rain-car.ogg',
    category: 'rain',
    iconPath: '/images/Rain_Windshield-W.png',
    color: '#00FFFF',
  },
  {
    id: 'snow',
    name: 'Snow',
    description: 'Peaceful snow ambience',
    audioSrc: '/sounds/snow.ogg',
    category: 'nature',
    iconPath: '/images/Snow-W.png',
    color: '#E2E2E2',
  },
  {
    id: 'thunder',
    name: 'Thunder',
    description: 'Thunder and storm sounds',
    audioSrc: '/sounds/thunder.ogg',
    category: 'thunder',
    iconPath: '/images/Thunder-W.png',
    color: '#3f7db2',
  },
  {
    id: 'train',
    name: 'Train',
    description: 'Train journey ambience',
    audioSrc: '/sounds/train.ogg',
    category: 'ambience',
    iconPath: '/images/Train-W.png',
    color: '#FFFF00',
  },
  {
    id: 'wind',
    name: 'Wind',
    description: 'Wind blowing sounds',
    audioSrc: '/sounds/wind.ogg',
    category: 'nature',
    iconPath: '/images/Wind-W.png',
    color: '#00FF33',
  }
];
