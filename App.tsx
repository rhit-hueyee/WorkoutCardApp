// app.tsx
import React from 'react';
import { SafeAreaView, StyleSheet } from 'react-native';
import WorkoutList from './src/WorkoutList';

const App = () => {
  return (
    <SafeAreaView style={styles.container}>
      <WorkoutList />
    </SafeAreaView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: "#fff",
  },
});

export default App;
