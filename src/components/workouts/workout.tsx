import React from 'react';
import { View, Text, Button, StyleSheet } from 'react-native';
import { useWorkouts } from './WorkoutProvider';
import { useBaselines } from '../baselines/BaselineProvider';
import { calculateWeight } from './WorkoutUtils';
import WorkoutBlock from './WorkoutBlock';

const Workout: React.FC = () => {
  const { workouts, currentWorkoutIndex, completeCurrentWorkout, failSet } = useWorkouts();
  const { baselines } = useBaselines();
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
      {currentWorkout.blocks.map((block, index) => (
        <WorkoutBlock
          key={index}
          block={block}
          baselines={baselines}
          onFailSet={failSet}
        />
      ))}
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
    textAlign: 'center',
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
});

export default Workout;
