import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import React, { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Button } from 'react-native-paper';
import styles from '../styles';

export default function HomeScreen() {
  const [seconds, setSeconds] = useState(25 * 60);
  const [isRunning, setIsRunning] = useState(false);
  const [isNotifying, setIsNotifying] = useState(true);
  const [pomodoroCount, setPomodoroCount] = useState(0);
  const [mode, setMode] = useState<'pomodoro' | 'shortBreak' | 'longBreak'>('pomodoro');

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
    return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;
  };

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/alert.mp3')
    );
    await sound.playAsync();
  };

  // Handle timer logic
  useEffect(() => {
    let timer: NodeJS.Timeout | undefined;

    if (isRunning && seconds > 0) {
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }

    if (isRunning && seconds === 0) {
      // Play alarm
      if (isNotifying) {
        playSound();
      }

      // Transition to next session
      if (mode === 'pomodoro') {
        const nextCount = pomodoroCount + 1;
        setPomodoroCount(nextCount);

        if (nextCount % 4 === 0) {
          // Long break after 4 pomodoros
          setMode('longBreak');
          setSeconds(15 * 60);
        } else {
          // Short break
          setMode('shortBreak');
          setSeconds(5 * 60);
        }
      } else {
        // After break, go back to pomodoro
        setMode('pomodoro');
        setSeconds(25 * 60);
      }
    }

    return () => clearInterval(timer);
  }, [isRunning, seconds, mode, pomodoroCount, isNotifying]);

  const handleStartStop = (start: boolean) => {
    setIsRunning(start);
  };

  const handleSetTime = (time: number) => {
    setSeconds(time * 60);
    setIsRunning(true);
  };

  const handleStopAlarm = () => {
    setIsNotifying(false);
  };

  return (
    <View style={styles.container}>
      <Text style={styles.timerText}>{formatTime(seconds)}</Text>
      <Text style={styles.sessionLabel}>
        {mode === 'pomodoro'
          ? 'Work Session'
          : mode === 'shortBreak'
          ? 'Short Break'
          : 'Long Break'}
      </Text>

      <View style={styles.buttonGroup}>
        <Button onPress={() => handleSetTime(25)}>25 min</Button>
        <Button onPress={() => handleSetTime(15)}>15 min</Button>
        <Button onPress={() => handleSetTime(5)}>5 min</Button>
        <Button onPress={() => handleSetTime(1)}>1 min</Button>
      </View>

      <View style={styles.buttonGroup}>
        <Button onPress={() => handleStartStop(true)}>Start</Button>
        <Button onPress={() => handleStartStop(false)}>Stop</Button>
      </View>

      {seconds === 0 && (
        <Button onPress={handleStopAlarm}>Stop Alarm</Button>
      )}
    </View>
  );
}