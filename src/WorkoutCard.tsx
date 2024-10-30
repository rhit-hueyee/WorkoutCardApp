// WorkoutCard.tsx
import React from 'react';
import { View, Text, StyleSheet } from 'react-native';

type Exercise = {
  id: number;
  name: string;
  sets: number;
  reps: number;
  weight: string;
  rest: string;
};

type WorkoutCardProps = {
  name: string;
  exercises: Exercise[];
};

const WorkoutCard: React.FC<WorkoutCardProps> = ({ name, exercises }) => {
  return (
    <View style={styles.card}>
      <Text style={styles.title}>{name}</Text>
      {exercises.map((exercise) => (
        <View key={exercise.id} style={styles.exercise}>
          <Text>{exercise.name}</Text>
          <Text>Sets: {exercise.sets}</Text>
          <Text>Reps: {exercise.reps}</Text>
          <Text>Weight: {exercise.weight}</Text>
          <Text>Rest: {exercise.rest}</Text>
        </View>
      ))}
    </View>
  );
};

const styles = StyleSheet.create({
  card: {
    padding: 20,
    backgroundColor: "#f8f9fa",
    borderRadius: 8,
    shadowColor: "#000",
    shadowOpacity: 0.2,
    shadowRadius: 4,
    elevation: 4,
  },
  title: {
    fontSize: 20,
    fontWeight: "bold",
    marginBottom: 10,
  },
  exercise: {
    marginTop: 10,
    marginBottom: 10,
  },
});

export default WorkoutCard;
