import React, { useState } from 'react';
import {
    View,
    Text,
    FlatList,
    StyleSheet,
    Button,
    Modal,
    TextInput,
    TouchableOpacity,
  } from 'react-native';
import { useWorkouts } from '../workouts/WorkoutContext';
import { useNavigation } from '@react-navigation/native';
import { NativeStackNavigationProp } from '@react-navigation/native-stack';
import { RootStackParamList } from '../../App';
import { useBaselines } from '../baselines/BaselineContext';
import Icon from 'react-native-vector-icons/Ionicons';

const Menu: React.FC = () => {
    const { workouts, setCurrentWorkoutIndex } = useWorkouts();
    const navigation = useNavigation<NativeStackNavigationProp<RootStackParamList, 'Menu'>>();
    const { baselines, setBaselines } = useBaselines();
    const [isModalVisible, setModalVisible] = useState(false);
    const [newBaselines, setNewBaselines] = useState({ ...baselines });

    const renderBaseline = ({ item }: { item: [string, number] }) => (
        <View style={styles.baselineItem}>
          <Text style={styles.baselineKey}>{item[0]}:</Text>
          <Text style={styles.baselineValue}>{item[1]} lbs</Text>
        </View>
      );

      const saveNewBaselines = () => {
        setBaselines(newBaselines);
        alert('Baselines updated.');
        setModalVisible(false);
      };

      const renderBaselineInput = ([key, value]: [string, number]) => (
        <View style={styles.baselineInput} key={key}>
          <Text style={styles.baselineLabel}>{key}:</Text>
          <TextInput
            style={styles.input}
            keyboardType="numeric"
            value={String(newBaselines[key])}
            onChangeText={(text) =>
              setNewBaselines({ ...newBaselines, [key]: parseInt(text || '0', 10) })
            }
          />
        </View>
      );

      const resetWorkouts = () => {
        // Reset all workouts to incomplete
        workouts.forEach((workout) => (workout.completed = false));
        alert('Workouts reset to incomplete.');
      };
  
      return (
        <View style={styles.container}>
          <View style={styles.headerContainer}>
            <Text style={styles.header}>Menu</Text>
            <TouchableOpacity onPress={() => setModalVisible(true)}>
              <Icon name="menu" size={30} color="black" />
            </TouchableOpacity>
          </View>
    
          {/* Baselines Section */}
          <Text style={styles.subheader}>Baselines</Text>
          <FlatList
            data={Object.entries(baselines)}
            keyExtractor={(item) => item[0]}
            renderItem={({ item }) => (
              <View style={styles.baselineItem}>
                <Text style={styles.baselineKey}>{item[0]}:</Text>
                <Text style={styles.baselineValue}>{item[1]} lbs</Text>
              </View>
            )}
            horizontal
          />
    
          {/* Workouts Section */}
          <Text style={styles.subheader}>Workouts</Text>
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
    
          {/* Modal for Reset and Baseline Adjustment */}
          <Modal
            visible={isModalVisible}
            animationType="slide"
            transparent={true}
            onRequestClose={() => setModalVisible(false)}
          >
            <View style={styles.modalContainer}>
              <Text style={styles.modalHeader}>Settings</Text>
    
              {/* Reset Workouts */}
              <TouchableOpacity
                style={styles.modalButton}
                onPress={resetWorkouts}
              >
                <Text style={styles.modalButtonText}>Reset Workouts</Text>
              </TouchableOpacity>
    
              {/* Adjust Baselines */}
              <Text style={styles.modalSubheader}>Adjust Baselines</Text>
              {Object.entries(baselines).map(renderBaselineInput)}
    
              <View style={styles.modalFooter}>
                <Button title="Cancel" onPress={() => setModalVisible(false)} />
                <Button title="Save" onPress={saveNewBaselines} />
              </View>
            </View>
          </Modal>
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
      fontSize: 20,
      fontWeight: 'bold',
      marginBottom: 20,
    },
    subheader: {
        fontSize: 20,
        marginBottom: 10,
      },
    workout: {
      marginBottom: 10,
    },
    workoutName: {
      fontSize: 16,
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
      modalSubheader: {
        fontSize: 20,
        marginVertical: 15,
      },
      baselineInput: {
        flexDirection: 'row',
        alignItems: 'center',
        marginBottom: 10,
      },
      baselineLabel: {
        fontSize: 16,
        flex: 1,
      },
      input: {
        borderWidth: 1,
        borderColor: '#ccc',
        borderRadius: 5,
        padding: 5,
        width: 100,
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
      modalFooter: {
        flexDirection: 'row',
        justifyContent: 'space-around',
        marginTop: 20,
      }
  });
  
  export default Menu;