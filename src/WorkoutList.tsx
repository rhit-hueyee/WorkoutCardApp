// WorkoutList.tsx
import React, { useState, useEffect } from 'react';
import { View, ScrollView, Button, Text, StyleSheet } from 'react-native';
import WorkoutCard from './WorkoutCard';
import { workouts } from '../data/workouts';
import AsyncStorage from '@react-native-async-storage/async-storage';

const WorkoutList: React.FC = () => {
  const [currentWorkoutIndex, setCurrentWorkoutIndex] = useState(0);

  // Load progress from AsyncStorage on mount
  useEffect(() => {
    const loadProgress = async () => {
      try {
        const savedIndex = await AsyncStorage.getItem('currentWorkoutIndex');
        if (savedIndex !== null) {
          setCurrentWorkoutIndex(parseInt(savedIndex, 10));
        }
      } catch (error) {
        console.error('Failed to load workout index:', error);
      }
    };

    loadProgress();
  }, []);

  // Save progress to AsyncStorage when currentWorkoutIndex changes
  useEffect(() => {
    const saveProgress = async () => {
      try {
        await AsyncStorage.setItem('currentWorkoutIndex', currentWorkoutIndex.toString());
      } catch (error) {
        console.error('Failed to save workout index:', error);
      }
    };

    saveProgress();
  }, [currentWorkoutIndex]);

  const handleCompleteWorkout = () => {
    setCurrentWorkoutIndex((prevIndex) => prevIndex + 1);
  };

  // Get the current workout to display
  const currentWorkout = workouts[currentWorkoutIndex];

  return (
    <ScrollView contentContainerStyle={styles.container}>
      {currentWorkout ? (
        <View>
          <WorkoutCard name={currentWorkout.name} exercises={currentWorkout.exercises} />
          <Button title="Mark as Completed" onPress={handleCompleteWorkout} />
        </View>
      ) : (
        <View>
          <Text>All workouts completed!</Text>
        </View>
      )}
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    padding: 20,
  },
});

export default WorkoutList;
