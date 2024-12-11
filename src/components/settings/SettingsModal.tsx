import React, { useEffect, useRef, useState } from 'react';
import {
  View,
  Text,
  StyleSheet,
  Modal,
  TouchableOpacity,
  Animated,
  Dimensions,
  PanResponder,
  Platform,
  Alert,
} from 'react-native';
import BaselineList from '../baselines/BaselineList';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useBaselines } from '../baselines/BaselineProvider';
import { Workout } from '../../types';
import RNBlobUtil from 'react-native-blob-util';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  resetWorkouts: () => void;
  setWorkouts: (workouts: Workout[]) => void;
}

const screenWidth = Dimensions.get('window').width;

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  resetWorkouts,
  setWorkouts,
}) => {
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const { baselines, setBaselines } = useBaselines();


  useEffect(() => {
    if (visible) {
      Animated.timing(slideAnim, {
        toValue: 0, // Slide into the screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    } else {
      Animated.timing(slideAnim, {
        toValue: screenWidth, // Slide out of the screen
        duration: 300,
        useNativeDriver: true,
      }).start();
    }
  }, [visible]);

  const panResponder = PanResponder.create({
    onStartShouldSetPanResponder: () => true,
    onMoveShouldSetPanResponder: () => true,
    onPanResponderMove: (event, gestureState) => {
      if (gestureState.dx > 0) {
        slideAnim.setValue(gestureState.dx);
      }
    },
    onPanResponderRelease: (event, gestureState) => {
      if (gestureState.dx > screenWidth / 3) {
        Animated.timing(slideAnim, {
          toValue: screenWidth, // Close modal
          duration: 300,
          useNativeDriver: true,
        }).start(() => {
          onClose(); // Notify parent to close modal
        });
      } else {
        Animated.timing(slideAnim, {
          toValue: 0, // Reset position
          duration: 300,
          useNativeDriver: true,
        }).start();
      }
    },
  });

  if (!visible) return null;

  const handleImport = async () => {
    try {
      const results = await DocumentPicker.pick({
        type: [DocumentPicker.types.json],
        allowMultiSelection: true,
      });
  
      //console.log('Selected files:', results);
  
      const allWorkouts = [];
  
      for (const result of results) {
        try {
          //console.log('Reading file:', result.uri);
          const fileContent = await RNFS.readFile(result.uri, 'utf8');
          //console.log('Raw file content:', fileContent);
  
          const parsedData = JSON.parse(fileContent);
          if (Array.isArray(parsedData)) {
            // If the file contains an array of workouts, add them all
            allWorkouts.push(...parsedData);
          } else if (typeof parsedData === 'object' && parsedData !== null) {
            // If the file contains a single workout, add it
            allWorkouts.push(parsedData);
          } else {
            throw new Error('Invalid file format: Expected an array or an object');
          }
        } catch (error) {
          console.error(`Error processing file ${result.name}:`, (error as Error).message);
          Alert.alert(
            'Error',
            `Failed to process file "${result.name}". Please ensure it contains valid JSON.`
          );
        }
      }
  
      if (allWorkouts.length > 0) {
        setWorkouts(allWorkouts);
        Alert.alert('Success', `Imported ${allWorkouts.length} workouts successfully!`);
      } else {
        Alert.alert('No Workouts', 'No valid workouts were imported.');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error importing workouts:', error);
        Alert.alert('Error', 'Failed to import workouts. Please try again.');
      }
    }
  };
  
  
    

  return (
    <Modal
      visible={visible}
      animationType="none" // Custom animation; no default animation
      transparent={true}
      onRequestClose={onClose}
    >
      <View style={styles.modalOverlay}>
        <Animated.View
          style={[styles.modalContainer, { transform: [{ translateX: slideAnim }] }]}
          {...panResponder.panHandlers}
        >
          {/* Close button */}
          <TouchableOpacity
            style={styles.closeButton}
            onPressOut={() => {
              onClose();
            }}
          >
            <Icon name="close" size={30} color="black" />
          </TouchableOpacity>

          <Text style={styles.modalHeader}>Settings</Text>
          <Text style={styles.subheader}>Baselines</Text>
          <BaselineList
            baselines={baselines}
            onUpdateBaseline={(key: string, value: number) => {
              const updatedBaselines = { ...baselines, [key]: value };
              setBaselines(updatedBaselines);
            }}
          />

          {/* Import Workouts Button */}
          <TouchableOpacity style={styles.modalButton} onPressOut={handleImport}>
            <Text style={styles.modalButtonText}>Import Workouts</Text>
          </TouchableOpacity>

          {/* Reset Workouts Button */}
          <TouchableOpacity style={styles.resetButton} onPressOut={resetWorkouts}>
            <Text style={styles.resetButtonText}>Reset Workouts</Text>
          </TouchableOpacity>
        </Animated.View>
      </View>
    </Modal>
  );
};

const styles = StyleSheet.create({
  modalOverlay: {
    flex: 1,
    backgroundColor: 'rgba(0, 0, 0, 0.5)', // Dim background
    justifyContent: 'flex-end',
    alignItems: 'flex-end',
  },
  modalContainer: {
    position: 'absolute',
    top: 0,
    bottom: 0,
    width: '80%', // Adjust modal width as needed
    backgroundColor: 'white',
    padding: 20,
    justifyContent: 'space-between', // Space elements appropriately
  },
  closeButton: {
    position: 'absolute',
    top: 10,
    right: 10,
    zIndex: 1, // Ensure it stays on top
  },
  modalHeader: {
    fontSize: 24,
    fontWeight: 'bold',
    marginBottom: 20,
    textAlign: 'center',
    color: 'black'
  },
  subheader: {
    fontSize: 20,
    marginVertical: 10,
    color: 'black'
  },
  modalButton: {
    backgroundColor: '#6b6bff',
    padding: 10,
    borderRadius: 5,
    marginBottom: 15,
  },
  modalButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
  resetButton: {
    backgroundColor: '#ff6b6b', // Red background for reset
    padding: 10,
    borderRadius: 5,
    marginTop: 20,
    alignSelf: 'stretch', // Make it span the width
  },
  resetButtonText: {
    color: 'white',
    fontSize: 16,
    textAlign: 'center',
  },
});

export default SettingsModal;
