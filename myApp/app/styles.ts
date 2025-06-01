import { StyleSheet } from 'react-native';

const styles = StyleSheet.create({
  container: {
    flex: 1,
    justifyContent: 'center',
    alignItems: 'center',
    padding: 16,
    backgroundColor: '#fff',
  },
  input: {
    height: 40,
    borderColor: '#ccc',
    borderWidth: 1,
    marginBottom: 10,
    paddingHorizontal: 8,
    borderRadius: 4,
    width: '100%',
  },
  buttonGroup: {
    flexDirection: 'row',
    justifyContent: 'center',
    gap: 10,
    marginVertical: 10,
  },
  taskContainer: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    padding: 8,
    marginVertical: 5,
    borderWidth: 1, // Adds a border around the task
    borderColor: '#ccc', // Light gray border color
    borderRadius: 4, // Rounded corners for the box
    backgroundColor: '#f9f9f9', // Light background color for the task box
    width: '100%',
  },
  task: {
    width: '80%', // Fixed width (80% of the container)
    fontSize: 16,
    textAlign: 'left', // Align text to the left
    overflow: 'hidden', // Prevent text from overflowing
  },
  checkButton: {
    borderWidth: 2,
    borderColor: '#4CAF50', // Green border
    width: 24, // Square size
    height: 24, // Square size
    justifyContent: 'center',
    alignItems: 'center',
  },
  checkButtonText: {
    color: '#4CAF50', // Green checkmark
    fontWeight: 'bold',
    fontSize: 16,
  },
  timerText: {
    fontSize: 48,
    fontWeight: 'bold',
    marginBottom: 10,
  },
  sessionLabel: {
    fontSize: 20,
    marginBottom: 20,
  }
});

export default styles;