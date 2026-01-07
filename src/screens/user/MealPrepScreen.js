import React, { useState } from 'react';
import { View, Text, StyleSheet, ScrollView, TouchableOpacity } from 'react-native';
import { Ionicons } from '@expo/vector-icons';
import { useAuth } from '../../context/AuthContext';
import Card from '../../components/Card';
import Modal from '../../components/Modal';
import { mealPlans } from '../../data/data';

const MealPrepScreen = () => {
  const { user } = useAuth();
  const [selectedGoal, setSelectedGoal] = useState(user?.goal || 'fatloss');
  const [selectedMeal, setSelectedMeal] = useState(null);
  const [modalVisible, setModalVisible] = useState(false);

  const goals = [
    { id: 'fatloss', name: 'Fat Loss', calories: 1800 },
    { id: 'bulk', name: 'Muscle Building', calories: 3000 },
    { id: 'recomposition', name: 'Body Recomposition', calories: 2400 },
  ];

  const mealTypes = [
    { id: 'breakfast', name: 'Breakfast', icon: 'sunny-outline' },
    { id: 'lunch', name: 'Lunch', icon: 'restaurant-outline' },
    { id: 'snacks', name: 'Snacks', icon: 'nutrition-outline' },
    { id: 'dinner', name: 'Dinner', icon: 'moon-outline' },
  ];

  const currentPlan = mealPlans[selectedGoal];

  const handleMealPress = (meal) => {
    setSelectedMeal(meal);
    setModalVisible(true);
  };

  return (
    <ScrollView style={styles.container} showsVerticalScrollIndicator={false}>
      <View style={styles.header}>
        <Text style={styles.title}>Meal Plans</Text>
        <Text style={styles.subtitle}>Personalized nutrition for your goals</Text>
      </View>

      <View style={styles.goalSelector}>
        {goals.map((goal) => (
          <TouchableOpacity
            key={goal.id}
            style={[
              styles.goalButton,
              selectedGoal === goal.id && styles.goalButtonActive,
            ]}
            onPress={() => setSelectedGoal(goal.id)}
          >
            <Text
              style={[
                styles.goalButtonText,
                selectedGoal === goal.id && styles.goalButtonTextActive,
              ]}
            >
              {goal.name}
            </Text>
          </TouchableOpacity>
        ))}
      </View>

      <Card style={styles.calorieBanner}>
        <View style={styles.calorieContent}>
          <Ionicons name="flame" size={32} color="#FF9500" />
          <View style={styles.calorieText}>
            <Text style={styles.calorieLabel}>Daily Target</Text>
            <Text style={styles.calorieValue}>{currentPlan.dailyCalories} kcal</Text>
          </View>
        </View>
      </Card>

      {mealTypes.map((type) => (
        <View key={type.id} style={styles.mealSection}>
          <View style={styles.mealSectionHeader}>
            <Ionicons name={type.icon} size={24} color="#007AFF" />
            <Text style={styles.mealSectionTitle}>{type.name}</Text>
          </View>

          <View style={styles.mealGrid}>
            {currentPlan.meals[type.id].map((meal) => (
              <TouchableOpacity
                key={meal.id}
                onPress={() => handleMealPress(meal)}
                activeOpacity={0.7}
              >
                <Card style={styles.mealCard}>
                  <Text style={styles.mealName} numberOfLines={2}>
                    {meal.name}
                  </Text>
                  <View style={styles.mealCalories}>
                    <Ionicons name="flame-outline" size={14} color="#FF9500" />
                    <Text style={styles.mealCaloriesText}>{meal.calories} kcal</Text>
                  </View>
                  <View style={styles.macros}>
                    <View style={styles.macro}>
                      <Text style={styles.macroValue}>{meal.protein}g</Text>
                      <Text style={styles.macroLabel}>P</Text>
                    </View>
                    <View style={styles.macro}>
                      <Text style={styles.macroValue}>{meal.carbs}g</Text>
                      <Text style={styles.macroLabel}>C</Text>
                    </View>
                    <View style={styles.macro}>
                      <Text style={styles.macroValue}>{meal.fats}g</Text>
                      <Text style={styles.macroLabel}>F</Text>
                    </View>
                  </View>
                </Card>
              </TouchableOpacity>
            ))}
          </View>
        </View>
      ))}

      <Modal
        visible={modalVisible}
        onRequestClose={() => setModalVisible(false)}
        title="Meal Details"
      >
        {selectedMeal && (
          <View>
            <Text style={styles.modalMealName}>{selectedMeal.name}</Text>
            <View style={styles.modalCalories}>
              <Ionicons name="flame" size={28} color="#FF9500" />
              <Text style={styles.modalCaloriesText}>{selectedMeal.calories} kcal</Text>
            </View>

            <View style={styles.modalMacros}>
              <View style={styles.modalMacroItem}>
                <Text style={styles.modalMacroValue}>{selectedMeal.protein}g</Text>
                <Text style={styles.modalMacroLabel}>Protein</Text>
              </View>
              <View style={styles.modalMacroItem}>
                <Text style={styles.modalMacroValue}>{selectedMeal.carbs}g</Text>
                <Text style={styles.modalMacroLabel}>Carbs</Text>
              </View>
              <View style={styles.modalMacroItem}>
                <Text style={styles.modalMacroValue}>{selectedMeal.fats}g</Text>
                <Text style={styles.modalMacroLabel}>Fats</Text>
              </View>
            </View>

            <Text style={styles.ingredientsTitle}>Ingredients</Text>
            <View style={styles.ingredientsList}>
              {selectedMeal.ingredients.map((ingredient, index) => (
                <View key={index} style={styles.ingredientItem}>
                  <Ionicons name="checkmark-circle" size={20} color="#34C759" />
                  <Text style={styles.ingredientText}>{ingredient}</Text>
                </View>
              ))}
            </View>
          </View>
        )}
      </Modal>
    </ScrollView>
  );
};

const styles = StyleSheet.create({
  container: {
    flex: 1,
    backgroundColor: '#F5F5F5',
  },
  header: {
    padding: 20,
    paddingTop: 20,
  },
  title: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  subtitle: {
    fontSize: 14,
    color: '#666666',
    marginTop: 5,
  },
  goalSelector: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    marginBottom: 20,
    gap: 10,
  },
  goalButton: {
    flex: 1,
    paddingVertical: 10,
    borderRadius: 20,
    backgroundColor: '#FFFFFF',
    borderWidth: 1,
    borderColor: '#E0E0E0',
    alignItems: 'center',
  },
  goalButtonActive: {
    backgroundColor: '#007AFF',
    borderColor: '#007AFF',
  },
  goalButtonText: {
    fontSize: 12,
    fontWeight: '600',
    color: '#666666',
  },
  goalButtonTextActive: {
    color: '#FFFFFF',
  },
  calorieBanner: {
    marginHorizontal: 20,
    marginBottom: 20,
    backgroundColor: 'linear-gradient(135deg, #FF9500 0%, #FF6B00 100%)',
  },
  calorieContent: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  calorieText: {
    marginLeft: 15,
    flex: 1,
  },
  calorieLabel: {
    fontSize: 14,
    color: '#FFFFFF',
    opacity: 0.9,
  },
  calorieValue: {
    fontSize: 28,
    fontWeight: '700',
    color: '#FFFFFF',
    marginTop: 2,
  },
  mealSection: {
    marginBottom: 25,
  },
  mealSectionHeader: {
    flexDirection: 'row',
    alignItems: 'center',
    paddingHorizontal: 20,
    marginBottom: 15,
  },
  mealSectionTitle: {
    fontSize: 18,
    fontWeight: '700',
    color: '#333333',
    marginLeft: 10,
  },
  mealGrid: {
    flexDirection: 'row',
    paddingHorizontal: 20,
    gap: 15,
  },
  mealCard: {
    flex: 1,
    marginBottom: 0,
  },
  mealName: {
    fontSize: 14,
    fontWeight: '600',
    color: '#333333',
    marginBottom: 10,
    minHeight: 36,
  },
  mealCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    marginBottom: 10,
  },
  mealCaloriesText: {
    fontSize: 13,
    color: '#666666',
    marginLeft: 5,
  },
  macros: {
    flexDirection: 'row',
    justifyContent: 'space-between',
    paddingTop: 10,
    borderTopWidth: 1,
    borderTopColor: '#F0F0F0',
  },
  macro: {
    alignItems: 'center',
  },
  macroValue: {
    fontSize: 14,
    fontWeight: '700',
    color: '#333333',
  },
  macroLabel: {
    fontSize: 11,
    color: '#666666',
    marginTop: 2,
  },
  modalMealName: {
    fontSize: 20,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 15,
  },
  modalCalories: {
    flexDirection: 'row',
    alignItems: 'center',
    backgroundColor: '#FFF5E6',
    padding: 15,
    borderRadius: 10,
    marginBottom: 20,
  },
  modalCaloriesText: {
    fontSize: 20,
    fontWeight: '700',
    color: '#FF9500',
    marginLeft: 10,
  },
  modalMacros: {
    flexDirection: 'row',
    justifyContent: 'space-around',
    marginBottom: 25,
    paddingVertical: 20,
    backgroundColor: '#F5F5F5',
    borderRadius: 10,
  },
  modalMacroItem: {
    alignItems: 'center',
  },
  modalMacroValue: {
    fontSize: 24,
    fontWeight: '700',
    color: '#333333',
  },
  modalMacroLabel: {
    fontSize: 13,
    color: '#666666',
    marginTop: 5,
  },
  ingredientsTitle: {
    fontSize: 16,
    fontWeight: '700',
    color: '#333333',
    marginBottom: 15,
  },
  ingredientsList: {
    gap: 10,
  },
  ingredientItem: {
    flexDirection: 'row',
    alignItems: 'center',
  },
  ingredientText: {
    fontSize: 14,
    color: '#333333',
    marginLeft: 10,
  },
});

export default MealPrepScreen;
