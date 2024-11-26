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
} from 'react-native';
import BaselineList from '../baselines/BaselineList';
import Icon from 'react-native-vector-icons/Ionicons';

interface SettingsModalProps {
  visible: boolean;
  onClose: () => void;
  baselines: Record<string, number>;
  setBaselines: (updatedBaselines: Record<string, number>) => void;
  resetWorkouts: () => void;
}

const screenWidth = Dimensions.get('window').width;

const SettingsModal: React.FC<SettingsModalProps> = ({
  visible,
  onClose,
  baselines,
  setBaselines,
  resetWorkouts,
}) => {
  const slideAnim = useRef(new Animated.Value(screenWidth)).current;
  const [localVisible, setLocalVisible] = useState(visible);

  useEffect(() => {
    if (visible) {
      setLocalVisible(true);
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
      }).start(() => {
        setLocalVisible(false);
      });
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
          setLocalVisible(false);
          onClose();
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

  if (!localVisible) return null;

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
          <TouchableOpacity style={styles.closeButton} onPress={onClose}>
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
          <TouchableOpacity style={styles.modalButton} onPress={resetWorkouts}>
            <Text style={styles.modalButtonText}>Reset Workouts</Text>
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
  },
  subheader: {
    fontSize: 20,
    marginVertical: 10,
  },
  modalButton: {
    backgroundColor: '#ff6b6b',
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

export default SettingsModal;
