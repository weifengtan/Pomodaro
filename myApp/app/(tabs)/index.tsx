import { Image, StyleSheet, Platform, View, Text } from 'react-native';
import React , { useState, useEffect } from 'react';
import { Audio } from 'expo-av';
import { Button } from 'react-native-paper';

export default function HomeScreen() {
const [seconds, setSeconds] = useState(25 * 60);
const [isRunning, setIsRunning] = useState(false);
const [isNotifying, setIsNotifying] = useState(true);

  const handleButtonPress = (time: number) => {
    setSeconds(time * 60);
    setIsRunning(false);
  }

  const handleStartStop = (start: number) => {
    if (start){
      setIsRunning(true);
    }
    else {
      setIsRunning(false);
    }
  }

  const formatTime = (totalSeconds: number) => {
    const minutes = Math.floor(totalSeconds / 60);
    const seconds = totalSeconds % 60;
     return `${String(minutes).padStart(2, '0')}:${String(seconds).padStart(2, '0')}`;return 
  }

  const playSound = async () => {
    const { sound } = await Audio.Sound.createAsync(
      require('../../assets/sounds/alert.mp3')
    );
    await sound.playAsync();
  };

  useEffect(() => {
    let timer: string | number | NodeJS.Timeout | undefined;
    if(isRunning &&  seconds > 0){
      timer = setInterval(() => {
        setSeconds((prev) => prev - 1);
      }, 1000);
    }
    else {
      clearInterval(timer);
    }
    return() => clearInterval(timer);
  }, [isRunning, seconds]);

  useEffect(() => {
    if(isRunning && seconds <= 0 && isNotifying){
      const notification = setInterval(() => {
        playSound();
      }, 5000);

      return () => clearInterval(notification)
    }
  }, [seconds, isNotifying]);

  return (
    <View style={styles.container}>
    <Text style={styles.timerText}>{formatTime(seconds)}</Text>
    <View style = {styles.buttonGroup}>
      <Button onPress={() => handleButtonPress(25)}> 25 </Button>
      <Button onPress={() => handleButtonPress(15)}> 15 </Button>
      <Button onPress={() => handleButtonPress(5)}> 5 </Button>
      <Button onPress={() => handleButtonPress(1)}> 1 </Button>
    </View>
    <View style = {styles.buttonGroup}>
      <Button onPress = {() => handleStartStop(1)}> Start </Button>
      <Button onPress = {() => handleStartStop(0)}> Stop </Button>
    </View>
    {
      !seconds && (
        <Button onPress={() => setIsNotifying(false)}> Stop Alarm </Button>
      )
    }
 </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,                         // Take up full height of the screen
    justifyContent: 'center',       // Center vertically
    alignItems: 'center',           // Center horizontally
  },
  buttonGroup: {
    flexDirection: 'row',   // ⬅️ Make buttons horizontal
    justifyContent: 'center',
    gap: 10,                 // Optional: adds space between buttons
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 30,
  }
});
