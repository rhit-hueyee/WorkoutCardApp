import React from 'react';
import { View, Text, StyleSheet, TouchableOpacity, Alert, Button } from 'react-native';
import { useWorkouts } from './WorkoutContext';
import { FlatList } from 'react-native-gesture-handler';
import { useBaselines } from '../baselines/BaselineContext';

const Workout: React.FC = () => {
  const { workouts, currentWorkoutIndex, failSet, completeCurrentWorkout } = useWorkouts();
  const { baselines } = useBaselines();
  const currentWorkout = workouts[currentWorkoutIndex];

  if (!currentWorkout) {
    return (
      <View style={styles.container}>
        <Text style={styles.text}>No workouts available.</Text>
      </View>
    );
  }

  const renderBaseline = ({ item }: { item: [string, number] }) => (
    <View style={styles.baselineItem}>
      <Text style={styles.baselineKey}>{item[0]}:</Text>
      <Text style={styles.baselineValue}>{item[1]} lbs</Text>
    </View>
  );

  const calculateWeight = (source: string, percent: string | undefined, loadPercent: string | undefined): number | null => {
    const baseWeight = baselines[source as keyof typeof baselines] || 0;
    const percentValue = percent ? parseFloat(percent) / 100 : 1;
    const loadValue = loadPercent ? parseFloat(loadPercent) / 100 : 1;
    return Math.round((baseWeight * percentValue * loadValue) / 5) * 5;
  };

  const handleFailSet = (source: string) => {
    // Confirm before marking the set as failed
    Alert.alert(
      'Fail Set',
      `Are you sure you want to mark this set as failed? This will complete the workout and reduce the baseline for ${source} by 10.`,
      [
        { text: 'Cancel', style: 'cancel' },
        { text: 'Yes', onPress: async () => await failSet(source) },
      ]
    );
  };

  const renderSetRow = (set: any, source: string, index: number) => {
    const weight = calculateWeight(source, set.percent, set.loadPercent);
    return (
      <View style={styles.setRow} key={index}>
        <Text style={styles.setCell}>{set.percent || '-'}</Text>
        <Text style={styles.setCell}>{weight ? `${weight} lbs` : '-'}</Text>
        <Text style={styles.setCell}>{set.reps || '-'}</Text>
        <Text style={styles.setCell}>{set.loadPercent || '-'}</Text>
        {!set.failed && (
          <TouchableOpacity onPress={() => handleFailSet(source)}>
            <Text style={styles.failButton}>Fail</Text>
          </TouchableOpacity>
        )}
      </View>
    );
  };

  const renderExercise = (exercise: any) => (
    <View style={styles.exercise} key={exercise.name}>
      <Text style={styles.exerciseName}>{exercise.name}</Text>
      <View style={styles.setTable}>
        <View style={styles.setRow}>
          <Text style={[styles.setCell, styles.headerCell]}>%</Text>
          <Text style={[styles.setCell, styles.headerCell]}>Weight</Text>
          <Text style={[styles.setCell, styles.headerCell]}>Reps</Text>
          <Text style={[styles.setCell, styles.headerCell]}>Load %</Text>
        </View>
        {exercise.sets?.map((set: any, index: number) => renderSetRow(set, exercise.name, index))}
      </View>
    </View>
  );

  const renderBlock = ({ item }: { item: any }) => (
    <View style={styles.block}>
      <Text style={styles.blockName}>{item.blockName}</Text>
      {item.exercises.map(renderExercise)}
    </View>
  );

  return (
    <View style={styles.container}>
      <Text style={styles.header}>{currentWorkout.name}</Text>
      <FlatList
        data={Object.entries(baselines)}
        keyExtractor={(item) => item[0]}
        renderItem={renderBaseline}
        horizontal
      />
      <FlatList
        data={currentWorkout.blocks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={renderBlock}
      />
      {!currentWorkout.completed && (
        <Button title="Mark as Completed" onPress={() => completeCurrentWorkout()} />
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
  block: {
    marginBottom: 20,
  },
  blockName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
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
    marginLeft: 5,
  },
  text: {
    fontSize: 18,
    textAlign: 'center',
  },
  baselineItem: {
    flexDirection: 'row',
    marginRight: 15,
    alignItems: 'center',
  },
  baselineKey: {
    fontSize: 16,
    fontWeight: 'bold',
  },
  baselineValue: {
    fontSize: 16,
    marginLeft: 5,
  }
});

export default Workout;