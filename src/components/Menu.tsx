import React from 'react';
import { View, Text, Button, StyleSheet, FlatList } from 'react-native';
import { useWorkouts } from './WorkoutContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';

const Menu: React.FC = () => {
    const { workouts } = useWorkouts();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Menu'>>();
  
    return (
      <View style={styles.container}>
        <Text style={styles.header}>Workout Menu</Text>
        <FlatList
          data={workouts}
          keyExtractor={(item) => item.id}
          renderItem={({ item }) => (
            <View style={styles.workout}>
              <Text style={styles.workoutName}>
                {item.name} {item.completed ? '(Completed)' : ''}
              </Text>
              <Button
                title="View Workout"
                onPress={() => navigation.navigate('Workout', { workoutId: item.id })}
              />
            </View>
          )}
        />
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
    workout: {
      marginBottom: 10,
    },
    workoutName: {
      fontSize: 16,
    },
  });
  
  export default Menu;