import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Exercise, Set, Baseline } from '../../types';
import { calculateWeight } from './WorkoutUtils';

interface WorkoutExerciseProps {
  exercise: Exercise;
  baselines: Baseline;
  onFailSet: (exerciseName: string) => void;
}

const WorkoutExercise: React.FC<WorkoutExerciseProps> = ({ exercise, baselines }) => {
  const renderSetRow = (set: Set, index: number) => {
    // Determine weight to display
    const weight =
      set.source && baselines
        ? calculateWeight(set.source, baselines, set.percent, set.loadPercent)
        : set.weight
        ? `${set.weight} lbs`
        : '-';

    return (
      <View style={styles.setRow} key={index}>
        <Text style={styles.setCell}>{weight}</Text>
        <Text style={styles.setCell}>{set.reps || '-'}</Text>
      </View>
    );
  };

  return (
    <View style={styles.exercise}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <View style={styles.setTable}>
        <View style={styles.setRow}>
          <Text style={[styles.setCell, styles.headerCell]}>Weight</Text>
          <Text style={[styles.setCell, styles.headerCell]}>Reps</Text>
        </View>
        {exercise.sets?.map((set, index) => renderSetRow(set, index))}
      </View>
    </View>
  );
};

const styles = StyleSheet.create({
  exercise: {
    marginBottom: 20,
  },
  exerciseName: {
    fontSize: 16,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  setTable: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    marginBottom: 10,
  },
  setRow: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    padding: 5,
    borderBottomWidth: 1,
    borderColor: '#ccc',
  },
  setCell: {
    flex: 1,
    textAlign: 'center',
  },
  headerCell: {
    fontWeight: 'bold',
  },
});

export default WorkoutExercise;
