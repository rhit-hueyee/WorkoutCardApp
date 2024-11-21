import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useWorkouts } from './WorkoutContext';
import { FlatList } from 'react-native-gesture-handler';

const Workout: React.FC = () => {
  const { workouts, currentWorkoutIndex, completeCurrentWorkout } = useWorkouts();
  const currentWorkout = workouts[currentWorkoutIndex];

  if (!currentWorkout) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No workouts available.</Text>
      </View>
    );
  }

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{currentWorkout.name}</Text>
      <FlatList
        data={currentWorkout.blocks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => (
          <View style={styles.block}>
            <Text style={styles.blockName}>{item.blockName}</Text>
            {/* Render block exercises here */}
          </View>
        )}
      />
      {!currentWorkout.completed && (
        <Button title="Mark as Completed" onPress={completeCurrentWorkout} />
      )}
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  header: {
    fontSize: 20,
    fontWeight: 'bold',
    marginBottom: 20,
  },
  block: {
    marginBottom: 20,
  },
  blockName: {
    fontSize: 16,
    fontWeight: '600',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Workout;