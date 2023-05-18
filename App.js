import {
  Alert,
  FlatList,
  KeyboardAvoidingView,
  Pressable,
  ScrollView,
  StyleSheet,
  Text,
  TextInput,
  TouchableOpacity,
  View,
} from 'react-native';
import React, {useState} from 'react';

export default function App() {
  const [enteredGoalText, setenteredGoalText] = useState('');
  const [Goals, setGoals] = useState([]);
  function inputGoalHandler(enteredtext) {
    setenteredGoalText(enteredtext);
  }
  function addGoalHandler() {
    if (enteredGoalText !== '') {
      setGoals(currentGoals => [
        ...currentGoals,
        {text: enteredGoalText, key: Math.random().toString()},
      ]);
    } else {
      Alert.alert('Failed to Add', 'Please Enter a todo to add');
    }
    setenteredGoalText('');
  }
  function deleteGoal(key) {
    // const newData = Goals.filter
    console.log('idx : ', key);
    setGoals(currentGoal => {
      return currentGoal.filter(goal => goal.key !== key);
    });
  }
  return (
    <View style={styles.container}>
      <View style={styles.upperView}>
        <View style={styles.headerview}>
          <Text style={styles.headerViewText}>TODO</Text>
        </View>
        <View style={styles.goalView}>
          <TextInput
            placeholder="Enter your Todos"
            style={styles.goalInput}
            onChangeText={inputGoalHandler}
            value={enteredGoalText}
          />
          <TouchableOpacity style={styles.goalButton} onPress={addGoalHandler}>
            <Text style={styles.goalButtonText}>ADD</Text>
          </TouchableOpacity>
        </View>
      </View>

      <FlatList
        data={Goals}
        renderItem={itemData => {
          console.log(itemData.item.key);
          return (
            <Pressable onPress={() => deleteGoal(itemData.item.key)}>
              <View style={styles.goalList}>
                <Text style={styles.listText}>{itemData.item.text}</Text>
              </View>
            </Pressable>
          );
        }}
        style={styles.goalListView}
      />
    </View>
  );
}

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#edf6f9',
    padding: 10,
  },
  upperView: {},
  headerview: {
    justifyContent: 'center',
    alignItems: 'center',
    backgroundColor: '#ff4d6d',
    borderRadius: 10,
  },
  headerViewText: {
    color: '#ffffff',
    fontSize: 25,
    fontWeight: '600',
    padding: 3,
  },
  goalView: {
    flexDirection: 'row',
    alignItems: 'center',
    justifyContent: 'space-between',
    paddingHorizontal: 10,
    paddingBottom: 20,
    borderBottomWidth: 1,
  },

  goalButton: {
    width: '20%',
    padding: 15,
    borderRadius: 10,
    backgroundColor: '#ff4d6d',
    justifyContent: 'center',
    alignItems: 'center',
    marginTop: 8,
    borderWidth: 1,
  },
  goalButtonText: {
    color: '#fff0f3',
  },
  goalInput: {
    width: '80%',
    borderWidth: 1,
    marginTop: 10,
    borderRadius: 10,
    paddingLeft: 11,
    marginRight: 8,
  },
  goalListView: {
    flex: 3,
  },
  goalList: {
    margin: 8,
    padding: 10,
    borderRadius: 10,
    borderWidth: 1,
    backgroundColor: '#ff4d6d',
    color: 'white',
  },
  listText: {
    color: 'white',
  },
});

//Scroll View Logic of List
/*<ScrollView
keyboardDismissMode="on-drag"
alwaysBounceVertical={true}
style={styles.goalListView}>
{Goals.map(goal => (
  <View key={goal} style={styles.goalList}>
    <Text style={styles.listText}>{goal}</Text>
  </View>
))}
</ScrollView>*/
