import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity } from 'react-native';
import { Exercise, Set } from '../../types';
import { calculateWeight } from './WorkoutUtils';

interface WorkoutExerciseProps {
  exercise: Exercise;
  baselines: Record<string, number>;
  onFailSet: (exerciseName: string) => void; // Callback for failing a set
}

const WorkoutExercise: React.FC<WorkoutExerciseProps> = ({ exercise, baselines, onFailSet }) => {
  const renderSetRow = (set: Set, index: number) => {
    const weight = calculateWeight(exercise.name, baselines, set.percent, set.loadPercent);

    return (
      <View style={styles.setRow} key={index}>
        <Text style={styles.setCell}>{set.percent || '-'}</Text>
        <Text style={styles.setCell}>{weight ? `${weight} lbs` : '-'}</Text>
        <Text style={styles.setCell}>{set.reps || '-'}</Text>
        <Text style={styles.setCell}>{set.loadPercent || '-'}</Text>
        {!set.failed && (
          <TouchableOpacity onPress={() => onFailSet(exercise.name)}>
            <Text style={styles.failButton}>Fail</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  return (
    <View style={styles.exercise}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <View style={styles.setTable}>
        <View style={styles.setRow}>
          <Text style={[styles.setCell, styles.headerCell]}>%</Text>
          <Text style={[styles.setCell, styles.headerCell]}>Weight</Text>
          <Text style={[styles.setCell, styles.headerCell]}>Reps</Text>
          <Text style={[styles.setCell, styles.headerCell]}>Load %</Text>
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
  failButton: {
    color: 'red',
    fontWeight: 'bold',
  },
});

export default WorkoutExercise;
