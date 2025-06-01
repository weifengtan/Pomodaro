import React, { useState } from 'react';
import { StyleSheet, TextInput, View, FlatList, Text, TouchableOpacity } from 'react-native';
import { Button } from 'react-native-paper';
import styles from '../styles';

export default function TabTwoScreen() {
  const [task, setTask] = useState('');
  const [tasks, setTasks] = useState<string[]>([]);

  const addTask = () => {
    if (task.trim()) {
      setTasks([...tasks, task]);
      setTask('');
    }
  };

  const removeTask = (index: number) => {
    setTasks(tasks.filter((_, i) => i !== index));
  };

  return (
    <View style={styles.container}>
      <TextInput
        style={styles.input}
        placeholder="Enter a task"
        value={task}
        onChangeText={setTask}
      />
      <View style={styles.buttonGroup}>
        <Button mode="contained" onPress={addTask}>
          Add Task
        </Button>
      </View>
      <FlatList
        data={tasks}
        keyExtractor={(item, index) => index.toString()}
        renderItem={({ item, index }) => (
          <View style={styles.taskContainer}>
            <Text style={styles.task}>{item}</Text>
            <TouchableOpacity onPress={() => removeTask(index)} style={styles.checkButton}>
              <Text style={styles.checkButtonText}>✔</Text>
            </TouchableOpacity>
          </View>
        )}
      />
    </View>
  );
}