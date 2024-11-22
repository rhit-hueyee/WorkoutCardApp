import React from 'react';
import { FlatList, StyleSheet, Text, View, TextInput } from 'react-native';
import { Baseline } from '../../types';

interface BaselineListProps {
  baselines: Baseline;
  onUpdateBaseline: (key: string, value: number) => void; // Callback for baseline updates
}

const BaselineList: React.FC<BaselineListProps> = ({ baselines, onUpdateBaseline }) => {
  const renderBaseline = ([key, value]: [string, number]) => (
    <View style={styles.baselineItem} key={key}>
      <Text style={styles.baselineKey}>{key}:</Text>
      <TextInput
        style={styles.baselineInput}
        keyboardType="numeric"
        value={String(value)}
        onChangeText={(text) =>
          onUpdateBaseline(key, parseInt(text || '0', 10))
        }
      />
      <Text style={styles.unit}>lbs</Text>
    </View>
  );

  return (
    <FlatList
      data={Object.entries(baselines)}
      keyExtractor={(item) => item[0]}
      renderItem={({ item }) => renderBaseline(item)}
    />
  );
};

const styles = StyleSheet.create({
  baselineItem: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  baselineKey: {
    fontSize: 16,
    fontWeight: 'bold',
    flex: 1,
  },
  baselineInput: {
    borderWidth: 1,
    borderColor: '#ccc',
    borderRadius: 5,
    padding: 5,
    width: 80,
    textAlign: 'center',
  },
  unit: {
    marginLeft: 10,
    fontSize: 14,
  },
});

export default BaselineList;
