import React, { useState } from 'react';
import { StyleSheet, TextInput, View, Button, FlatList, Text } from 'react-native';

export default function TabTwoScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <Button title="Add Task" onPress={addTask} />
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item }) => <Text style={styles.task}>{item}</Text>}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 8,
    paddingHorizontal: 8,
    borderRadius: 4,
  },
  task: {
    padding: 8,
    borderBottomWidth: 1,
    borderBottomColor: '#ddd',
  },
});