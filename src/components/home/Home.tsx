import React, { useEffect, useState } from 'react';
import {
  View,
  Text,
  FlatList,
  StyleSheet,
  Button,
  Modal,
  TouchableOpacity,
} from 'react-native';
import { useWorkouts } from '../workouts/WorkoutProvider';
import Icon from 'react-native-vector-icons/Ionicons';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import SettingsModal from '../settings/SettingsModal';
import { useBaselines } from '../baselines/BaselineProvider';

const Home: React.FC = () => {
  const { workouts, saveWorkouts } = useWorkouts();
  const { baselines, setBaselines } = useBaselines();
  const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Home'>>();

  const [isModalVisible, setModalVisible] = useState(false);

  useEffect(() => {
    navigation.setOptions({
      headerRight: () => (
        <View style={{ marginRight: 10 }}>
          <TouchableOpacity onPress={() => setModalVisible(true)}>
            <Icon name="menu-outline" size={30} color="black" />
          </TouchableOpacity>
        </View>
      ),
    });
  }, [navigation]);

  const resetWorkouts = async () => {
    const resetWorkouts = workouts.map((workout) => ({ ...workout, completed: false }));
    await saveWorkouts(resetWorkouts);
    alert('Workouts have been reset to incomplete.');
  };

  const openWorkout = (workoutId: string) => {
    console.log('Navigating to workout:', workoutId); 
    navigation.navigate('Workout', { workoutId }); 
  };


  return (
    <View style={styles.container}>

      <Text style={styles.subheader}>Workouts</Text>
      <FlatList
        data={workouts}
        keyExtractor={(item) => item.id}
        ListEmptyComponent={() => (
          <Text style={styles.subheader}>No workouts available.</Text>
        )}
        renderItem={({ item }) => (
          <View style={styles.workout}>
            <Text style={styles.workoutName}>
              {item.name} {item.completed ? '(Completed)' : ''}
            </Text>
            <Button title="View Workout" onPress={() => openWorkout(item.id)} />
          </View>
        )}
      />


      <SettingsModal
        visible={isModalVisible}
        onClose={() => setModalVisible(false)}
        resetWorkouts={resetWorkouts}
        setWorkouts={saveWorkouts}
      />
    </View>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 20,
  },
  headerContainer: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    alignItems: 'center',
    marginBottom: 20,
  },
  header: {
    fontSize: 24,
    fontWeight: 'bold',
    color: 'black'
  },
  subheader: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black'
  },
  workout: {
    marginBottom: 10,
  },
  workoutName: {
    fontSize: 16,
    color: 'black'
  },
  modalContainer: {
    flex: 1,
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'center',
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
  },
  modalButton: {
    backgroundColor: '#007bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default Home;
