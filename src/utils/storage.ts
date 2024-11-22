import AsyncStorage from '@react-native-async-storage/async-storage';

/**
 * Saves data to AsyncStorage
 * @param key - The storage key
 * @param value - The value to store (any type, will be serialized to JSON)
 */
export const saveToStorage = async (key: string, value: any): Promise<void> => {
  try {
    const jsonValue = JSON.stringify(value);
    await AsyncStorage.setItem(key, jsonValue);
  } catch (error) {
    console.error(`Error saving to storage with key "${key}":`, error);
  }
};

/**
 * Loads data from AsyncStorage
 * @param key - The storage key
 * @returns The deserialized value or null if the key doesn't exist
 */
export const loadFromStorage = async <T>(key: string): Promise<T | null> => {
  try {
    const jsonValue = await AsyncStorage.getItem(key);
    return jsonValue ? JSON.parse(jsonValue) : null;
  } catch (error) {
    console.error(`Error loading from storage with key "${key}":`, error);
    return null;
  }
};

/**
 * Removes a key from AsyncStorage
 * @param key - The storage key
 */
export const removeFromStorage = async (key: string): Promise<void> => {
  try {
    await AsyncStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing from storage with key "${key}":`, error);
  }
};
