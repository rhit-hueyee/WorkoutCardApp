import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Block, Baseline } from '../../types';
import WorkoutExercise from './WorkoutExcercise';

interface WorkoutBlockProps {
  block: Block;
  baselines: Baseline;
  onFailSet: (exerciseName: string) => void;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ block, baselines, onFailSet }) => {
  const renderSetBasedBlock = () => (
    <View style={styles.blockContainer}>
      {block.exercises.map((exercise, index) => (
        <WorkoutExercise
          key={index}
          exercise={exercise}
          baselines={baselines}
          onFailSet={onFailSet}
        />
      ))}
    </View>
  );

  const renderSimpleBlock = () => (
    <View style={styles.simpleBlockContainer}>
      {block.exercises.map((exercise, index) => (
        <View key={index} style={styles.simpleExercise}>
          <Text style={styles.simpleExerciseName}>{exercise.name}</Text>
          <Text style={styles.simpleExerciseDetail}>
            {exercise.duration || "N/A"}
          </Text>
        </View>
      ))}
    </View>
  );

  return (
    <View style={styles.block}>
      <Text style={styles.blockName}>{block.blockName}</Text>
      {block.type === "set-based" ? renderSetBasedBlock() : renderSimpleBlock()}
    </View>
  );
};

const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
  },
  blockName: {
    fontSize: 18,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  blockContainer: {
    marginBottom: 10,
  },
  simpleBlockContainer: {
    padding: 10,
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
  },
  simpleExercise: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    marginBottom: 5,
  },
  simpleExerciseName: {
    fontSize: 16,
  },
  simpleExerciseDetail: {
    fontSize: 16,
    fontStyle: 'italic',
  },
});

export default WorkoutBlock;
