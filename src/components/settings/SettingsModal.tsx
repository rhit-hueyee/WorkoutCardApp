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
  Alert,
} from 'react-native';
import BaselineList from '../baselines/BaselineList';
import Icon from 'react-native-vector-icons/Ionicons';
import DocumentPicker from 'react-native-document-picker';
import RNFS from 'react-native-fs';
import { useBaselines } from '../baselines/BaselineProvider';
import { Workout } from '../../types';

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
      const result = await DocumentPicker.pickSingle({
        type: [DocumentPicker.types.json],
      });

      const fileContent = await RNFS.readFile(result.uri, 'utf8');
      const importedWorkouts = JSON.parse(fileContent);

      if (Array.isArray(importedWorkouts)) {
        setWorkouts(importedWorkouts);
        Alert.alert('Success', 'Workouts imported successfully!');
      } else {
        throw new Error('Invalid file format');
      }
    } catch (error) {
      if (DocumentPicker.isCancel(error)) {
        console.log('User canceled the picker');
      } else {
        console.error('Error importing workouts:', error);
        Alert.alert('Error', 'Failed to import workouts. Please check the file format.');
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
          <TouchableOpacity style={styles.modalButton} onPress={handleImport}>
            <Text style={styles.modalButtonText}>Import Workouts</Text>
          </TouchableOpacity>

          {/* Reset Workouts Button */}
          <TouchableOpacity style={styles.resetButton} onPress={resetWorkouts}>
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
