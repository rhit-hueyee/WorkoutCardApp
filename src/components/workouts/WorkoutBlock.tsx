import React from 'react';
import { View, Text, StyleSheet } from 'react-native';
import { Block } from '../../types';
import WorkoutExercise from './WorkoutExcercise';

interface WorkoutBlockProps {
  block: Block;
  baselines: Record<string, number>;
  onFailSet: (exerciseName: string) => void;
}

const WorkoutBlock: React.FC<WorkoutBlockProps> = ({ block, baselines, onFailSet }) => {
  return (
    <View style={styles.block}>
      <Text style={styles.blockName}>{block.blockName}</Text>
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
};

const styles = StyleSheet.create({
  block: {
    marginBottom: 20,
  },
  blockName: {
    fontSize: 18,
    fontWeight: '600',
    marginBottom: 10,
  },
});

export default WorkoutBlock;
