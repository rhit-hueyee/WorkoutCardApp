import React from 'react';
import { NavigationContainer } from '@react-navigation/native';
import { createStackNavigator } from '@react-navigation/stack';
import Workout from './src/components/workout';
import Menu from './src/components/Menu';
import { WorkoutProvider } from './src/components/WorkoutContext';
import { BaselineProvider } from './src/BaselineContext';
import 'react-native-gesture-handler';
import 'react-native-reanimated';


export type RootStackParamList = {
  Menu: undefined;
  Workout: { workoutId: string };
};

const Stack = createStackNavigator<RootStackParamList>();

const App: React.FC = () => {
  return (
    <BaselineProvider>
      <WorkoutProvider>
        <NavigationContainer>
          <Stack.Navigator initialRouteName="Menu">
            <Stack.Screen name="Menu" component={Menu} />
            <Stack.Screen name="Workout" component={Workout} />
          </Stack.Navigator>
        </NavigationContainer>
      </WorkoutProvider>
    </BaselineProvider>
  );
};

export default App;