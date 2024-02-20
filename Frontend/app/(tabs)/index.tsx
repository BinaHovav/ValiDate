import React, { useState } from 'react';
import {
  View,
  Text,
  TextInput,
  Button,
  KeyboardAvoidingView,
  Platform,
  ScrollView,
  TouchableOpacity,
} from 'react-native';
import styles from './styles';
import httpService from '../../services/httpService';
import Spinner from 'react-native-loading-spinner-overlay/lib';
import AppModal from './modal';

export default function WelcomePage() {
  const [meals, setMeals] = useState(['', '', '']);
  const [errorMessage, setErrorMessage] = useState('');
  const [selectedDay, setSelectedDay] = useState<string | null>(null);

  const mealCategories = ['Breakfast', 'Lunch', 'Dinner'];
  const daysOfWeek = [
    { short: 'Sun', full: 'Sunday' },
    { short: 'Mon', full: 'Monday' },
    { short: 'Tue', full: 'Tuesday' },
    { short: 'Wed', full: 'Wednesday' },
    { short: 'Thu', full: 'Thursday' },
    { short: 'Fri', full: 'Friday' },
  ];

  const handleMealChange = (text: string, index: number) => {
    const updatedMeals = [...meals];
    updatedMeals[index] = text;

    setMeals(updatedMeals);
  };

  const handleDayPress = (day: string) => {
    setSelectedDay(day);
  };

  const getFullDayName = (shortDay: string) => {
    const dayObject = daysOfWeek.find((day) => day.short === shortDay);
    return dayObject ? dayObject.full : '';
  };

  return (
    <ScrollView>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'android' ? 'height' : 'padding'}
        style={styles.container}
      >
        <View style={styles.form}>
          <View style={styles.daysContainer}>
            {daysOfWeek.map((day) => (
              <TouchableOpacity
                key={day.short}
                style={[
                  styles.dayButton,
                  selectedDay === day.short ? styles.selectedDayButton : null,
                ]}
                onPress={() => handleDayPress(day.short)}
              >
                <Text
                  style={[
                    styles.dayButtonText,
                    selectedDay === day.short ? styles.selectedDayButtonText : null,
                  ]}
                >
                  {day.short}
                </Text>
              </TouchableOpacity>
            ))}
          </View>
          <Text style={styles.title}>
            {selectedDay
              ? 'What are you eating on \n' + getFullDayName(selectedDay) + '?'
              : 'Select a day'}
          </Text>
          <View>
            {mealCategories.map((category, index) => (
              <View key={index}>
                <Text style={styles.label}>{category}</Text>
                <TextInput
                  style={styles.input}
                  value={meals[index]}
                  placeholder={`What are you having for ${category.toLowerCase()}?`}
                  onChangeText={(text) => handleMealChange(text, index)}
                />
              </View>
            ))}
          </View>
          <View style={styles.buttonsContainer}>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Recipes</Text>
            </TouchableOpacity>
            <TouchableOpacity style={styles.button}>
              <Text style={styles.buttonText}>Consult with chatGPT</Text>
            </TouchableOpacity>
          </View>
          <Text style={styles.error}>{errorMessage} </Text>
        </View>
      </KeyboardAvoidingView>
    </ScrollView>
  );
}
