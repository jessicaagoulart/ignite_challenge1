import React, { useState, useRef, useEffect } from 'react';
import {
  Image,
  TouchableOpacity,
  View,
  Text,
  StyleSheet,
  TextInput,
} from 'react-native';
import Icon from 'react-native-vector-icons/Feather';
import trashIcon from '../assets/icons/trash/trash.png';
import xIcon from '../assets/icons/X.png';
import editIcon from '../assets/icons/edit.png';

interface TaskItemProps {
  index: number;
  task: { id: number; done: boolean; title: string };
  toggleTaskDone: (id: number) => void;
  removeTask: (id: number) => void;
  editTask: (id: number, title: string) => void;
}

export default function TaskItem({
  index,
  task,
  toggleTaskDone,
  removeTask,
  editTask,
}: TaskItemProps) {
  const textInputRef = useRef<TextInput>(null);
  const [editing, setEditing] = useState(false);
  const [value, setValue] = useState(task.title);

  useEffect(() => {
    if (textInputRef) {
      if (editing) {
        textInputRef.current?.focus();
      } else {
        textInputRef.current?.blur();
      }
    }
  }, [editing]);

  function handleStartEditing() {
    setEditing(true);
  }

  function handleCancelEditing() {
    setValue(task.title);
    setEditing(false);
  }

  function handleSubmitEditing() {
    editTask(task.id, value);
    setEditing(false);
  }

  return (
    <>
      <View>
        <TouchableOpacity
          testID={`button-${index}`}
          activeOpacity={0.7}
          style={styles.taskButton}
          onPress={() => toggleTaskDone(task.id)}
        >
          <View
            testID={`marker-${index}`}
            style={task.done ? styles.taskMarkerDone : styles.taskMarker}
          >
            {task.done && <Icon name="check" size={12} color="#FFF" />}
          </View>

          <TextInput
            ref={textInputRef}
            value={value}
            onChangeText={setValue}
            editable={editing}
            onSubmitEditing={handleSubmitEditing}
            style={task.done ? styles.taskTextDone : styles.taskText}
          />
        </TouchableOpacity>
      </View>
      <View style={styles.container}>
        {editing ? (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleCancelEditing()}
          >
            <Image source={xIcon} />
          </TouchableOpacity>
        ) : (
          <TouchableOpacity
            style={styles.icon}
            onPress={() => handleStartEditing()}
          >
            <Image source={editIcon} />
          </TouchableOpacity>
        )}
        <View style={styles.separator} />

        <TouchableOpacity
          testID={`trash-${index}`}
          style={[styles.icon, { opacity: editing ? 0.2 : 1 }]}
          onPress={() => removeTask(task.id)}
          disabled={editing ? true : false}
        >
          <Image source={trashIcon} />
        </TouchableOpacity>
      </View>
    </>
  );
}
const styles = StyleSheet.create({
  taskButton: {
    flex: 1,
    paddingHorizontal: 24,
    paddingVertical: 15,
    marginBottom: 4,
    borderRadius: 4,
    flexDirection: 'row',
    alignItems: 'center',
  },
  taskMarker: {
    height: 16,
    width: 16,
    borderRadius: 4,
    borderWidth: 1,
    borderColor: '#B2B2B2',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskText: {
    color: '#666',
    fontFamily: 'Inter-Medium',
  },
  taskMarkerDone: {
    height: 16,
    width: 16,
    borderRadius: 4,
    backgroundColor: '#1DB863',
    marginRight: 15,
    alignItems: 'center',
    justifyContent: 'center',
  },
  taskTextDone: {
    color: '#1DB863',
    textDecorationLine: 'line-through',
    fontFamily: 'Inter-Medium',
  },
  separator: {
    width: 1,
    height: 24,
    backgroundColor: 'rgba(196, 196, 196, 0.24)',
  },
  container: {
    flexDirection: 'row',
		justifyContent: 'center',
		alignItems: 'center',
  },
  icon: {
    margin: 18,
  },
});
