import mockAsyncStorage from '@react-native-async-storage/async-storage/jest/async-storage-mock';
jest.mock('@react-native-async-storage/async-storage', () => mockAsyncStorage);
jest.mock('react-native-sound', () => ({default: jest.fn()}));
jest.mock('@react-native-community/netinfo', () => ({default: jest.fn()}));
