// Static data for Gym OS Mobile App
// In production, this should be replaced with API calls

export const users = [
  {
    id: 1,
    username: 'admin',
    password: 'admin123',
    email: 'admin@gymos.com',
    role: 'admin',
    name: 'Admin User',
    createdAt: '2024-01-01'
  },
  {
    id: 2,
    username: 'john',
    password: 'user123',
    email: 'john@gymos.com',
    role: 'user',
    name: 'John Doe',
    goal: 'fatloss',
    currentLevel: 'beginner',
    streak: 7,
    createdAt: '2024-01-15'
  },
  {
    id: 3,
    username: 'jane',
    password: 'user123',
    email: 'jane@gymos.com',
    role: 'user',
    name: 'Jane Smith',
    goal: 'bulk',
    currentLevel: 'moderate',
    streak: 14,
    createdAt: '2024-01-20'
  },
  {
    id: 4,
    username: 'mike',
    password: 'user123',
    email: 'mike@gymos.com',
    role: 'user',
    name: 'Mike Johnson',
    goal: 'recomposition',
    currentLevel: 'pro-level',
    streak: 21,
    createdAt: '2024-02-01'
  },
  {
    id: 5,
    username: 'ituser',
    password: 'it123',
    email: 'it@gymos.com',
    role: 'ituser',
    name: 'IT Support',
    createdAt: '2024-01-10'
  }
];

export const workoutLevels = [
  {
    id: 1,
    name: 'Beginner',
    description: 'Perfect for those just starting their fitness journey',
    duration: '4-6 weeks',
    difficulty: 1,
    workouts: [
      {
        id: 1,
        name: 'Full Body Basics',
        exercises: [
          { name: 'Push-ups', sets: 3, reps: 10, rest: '60s' },
          { name: 'Bodyweight Squats', sets: 3, reps: 15, rest: '60s' },
          { name: 'Plank', sets: 3, reps: '30s', rest: '45s' },
          { name: 'Lunges', sets: 3, reps: 10, rest: '60s' },
          { name: 'Glute Bridges', sets: 3, reps: 12, rest: '45s' }
        ],
        calories: 200,
        duration: '30 min'
      },
      {
        id: 2,
        name: 'Core Foundation',
        exercises: [
          { name: 'Crunches', sets: 3, reps: 15, rest: '45s' },
          { name: 'Russian Twists', sets: 3, reps: 20, rest: '45s' },
          { name: 'Mountain Climbers', sets: 3, reps: '30s', rest: '45s' },
          { name: 'Leg Raises', sets: 3, reps: 12, rest: '60s' },
          { name: 'Dead Bug', sets: 3, reps: 10, rest: '45s' }
        ],
        calories: 150,
        duration: '25 min'
      }
    ]
  },
  {
    id: 2,
    name: 'Moderate',
    description: 'For those with some fitness experience looking to progress',
    duration: '6-8 weeks',
    difficulty: 2,
    workouts: [
      {
        id: 3,
        name: 'Upper Body Strength',
        exercises: [
          { name: 'Bench Press', sets: 4, reps: 8, rest: '90s' },
          { name: 'Bent Over Rows', sets: 4, reps: 10, rest: '90s' },
          { name: 'Overhead Press', sets: 3, reps: 10, rest: '60s' },
          { name: 'Pull-ups', sets: 3, reps: 8, rest: '90s' },
          { name: 'Tricep Dips', sets: 3, reps: 12, rest: '60s' }
        ],
        calories: 300,
        duration: '45 min'
      },
      {
        id: 4,
        name: 'Lower Body Power',
        exercises: [
          { name: 'Back Squats', sets: 4, reps: 8, rest: '120s' },
          { name: 'Romanian Deadlifts', sets: 4, reps: 10, rest: '90s' },
          { name: 'Leg Press', sets: 3, reps: 12, rest: '60s' },
          { name: 'Calf Raises', sets: 4, reps: 15, rest: '45s' },
          { name: 'Leg Curls', sets: 3, reps: 12, rest: '60s' }
        ],
        calories: 350,
        duration: '50 min'
      }
    ]
  },
  {
    id: 3,
    name: 'Pro-Level',
    description: 'Advanced training for experienced athletes',
    duration: '8-10 weeks',
    difficulty: 3,
    workouts: [
      {
        id: 5,
        name: 'Push Pull Legs A',
        exercises: [
          { name: 'Incline Bench Press', sets: 4, reps: 8, rest: '90s' },
          { name: 'Lat Pulldowns', sets: 4, reps: 10, rest: '90s' },
          { name: 'Shoulder Press', sets: 3, reps: 10, rest: '60s' },
          { name: 'Face Pulls', sets: 3, reps: 15, rest: '45s' },
          { name: 'Bicep Curls', sets: 3, reps: 12, rest: '60s' }
        ],
        calories: 350,
        duration: '50 min'
      },
      {
        id: 6,
        name: 'Push Pull Legs B',
        exercises: [
          { name: 'Deadlifts', sets: 4, reps: 6, rest: '120s' },
          { name: 'Dumbbell Press', sets: 4, reps: 10, rest: '90s' },
          { name: 'Barbell Rows', sets: 4, reps: 8, rest: '90s' },
          { name: 'Lateral Raises', sets: 3, reps: 15, rest: '45s' },
          { name: 'Hammer Curls', sets: 3, reps: 12, rest: '60s' }
        ],
        calories: 400,
        duration: '55 min'
      }
    ]
  },
  {
    id: 4,
    name: 'Elite',
    description: 'Elite level training for serious athletes',
    duration: '10-12 weeks',
    difficulty: 4,
    workouts: [
      {
        id: 7,
        name: 'Hypertrophy Focus',
        exercises: [
          { name: 'Chest Flys', sets: 4, reps: 12, rest: '60s' },
          { name: 'Cable Rows', sets: 4, reps: 12, rest: '60s' },
          { name: 'Lateral Raises', sets: 4, reps: 15, rest: '45s' },
          { name: 'Tricep Pushdowns', sets: 4, reps: 15, rest: '45s' },
          { name: 'Preacher Curls', sets: 4, reps: 12, rest: '60s' }
        ],
        calories: 300,
        duration: '45 min'
      },
      {
        id: 8,
        name: 'Strength Focus',
        exercises: [
          { name: 'Bench Press', sets: 5, reps: 5, rest: '180s' },
          { name: 'Squats', sets: 5, reps: 5, rest: '180s' },
          { name: 'Deadlifts', sets: 4, reps: 4, rest: '180s' },
          { name: 'Overhead Press', sets: 4, reps: 6, rest: '120s' },
          { name: 'Barbell Rows', sets: 4, reps: 6, rest: '120s' }
        ],
        calories: 400,
        duration: '60 min'
      }
    ]
  },
  {
    id: 5,
    name: 'God-Level',
    description: 'Ultimate challenge for the fittest athletes',
    duration: '12+ weeks',
    difficulty: 5,
    workouts: [
      {
        id: 9,
        name: 'Ultimate Full Body',
        exercises: [
          { name: 'Clean and Press', sets: 5, reps: 5, rest: '180s' },
          { name: 'Front Squats', sets: 5, reps: 5, rest: '180s' },
          { name: 'Pull-ups', sets: 5, reps: 10, rest: '120s' },
          { name: 'Dips', sets: 5, reps: 12, rest: '90s' },
          { name: 'Burpees', sets: 3, reps: 15, rest: '60s' }
        ],
        calories: 500,
        duration: '75 min'
      }
    ]
  }
];

export const mealPlans = {
  fatloss: {
    name: 'Fat Loss',
    dailyCalories: 1800,
    meals: {
      breakfast: [
        {
          id: 1,
          name: 'Protein Oatmeal',
          ingredients: ['1/2 cup oats', '1 scoop protein powder', '1 banana', 'almonds'],
          calories: 350,
          protein: 30,
          carbs: 45,
          fats: 8
        },
        {
          id: 2,
          name: 'Greek Yogurt Bowl',
          ingredients: ['1 cup Greek yogurt', 'berries', 'honey', 'granola'],
          calories: 300,
          protein: 25,
          carbs: 35,
          fats: 6
        }
      ],
      lunch: [
        {
          id: 3,
          name: 'Grilled Chicken Salad',
          ingredients: ['4oz chicken breast', 'mixed greens', 'tomatoes', 'olive oil'],
          calories: 400,
          protein: 40,
          carbs: 15,
          fats: 20
        },
        {
          id: 4,
          name: 'Turkey Wrap',
          ingredients: ['whole wheat wrap', 'turkey', 'lettuce', 'mustard'],
          calories: 350,
          protein: 30,
          carbs: 30,
          fats: 12
        }
      ],
      snacks: [
        {
          id: 5,
          name: 'Protein Shake',
          ingredients: ['protein powder', 'almond milk', 'banana'],
          calories: 200,
          protein: 25,
          carbs: 20,
          fats: 5
        },
        {
          id: 6,
          name: 'Almonds & Apple',
          ingredients: ['1 apple', '1 oz almonds'],
          calories: 200,
          protein: 5,
          carbs: 25,
          fats: 12
        }
      ],
      dinner: [
        {
          id: 7,
          name: 'Baked Salmon',
          ingredients: ['6oz salmon', 'broccoli', 'brown rice'],
          calories: 450,
          protein: 35,
          carbs: 40,
          fats: 18
        },
        {
          id: 8,
          name: 'Lean Beef Stir-Fry',
          ingredients: ['4oz lean beef', 'mixed vegetables', 'soy sauce'],
          calories: 400,
          protein: 35,
          carbs: 20,
          fats: 20
        }
      ]
    }
  },
  bulk: {
    name: 'Muscle Building',
    dailyCalories: 3000,
    meals: {
      breakfast: [
        {
          id: 9,
          name: 'Muscle Breakfast Bowl',
          ingredients: ['6 eggs', 'oatmeal', 'banana', 'peanut butter'],
          calories: 600,
          protein: 40,
          carbs: 70,
          fats: 25
        },
        {
          id: 10,
          name: 'Protein Pancakes',
          ingredients: ['protein powder', 'oats', 'eggs', 'maple syrup'],
          calories: 550,
          protein: 35,
          carbs: 65,
          fats: 20
        }
      ],
      lunch: [
        {
          id: 11,
          name: 'Bodybuilder Lunch',
          ingredients: ['8oz chicken', 'brown rice', 'sweet potato', 'broccoli'],
          calories: 700,
          protein: 55,
          carbs: 80,
          fats: 15
        },
        {
          id: 12,
          name: 'Beef & Pasta',
          ingredients: ['8oz beef', 'whole wheat pasta', 'marinara sauce'],
          calories: 750,
          protein: 50,
          carbs: 90,
          fats: 20
        }
      ],
      snacks: [
        {
          id: 13,
          name: 'Mass Gainer Shake',
          ingredients: ['protein powder', 'oats', 'peanut butter', 'banana'],
          calories: 500,
          protein: 40,
          carbs: 60,
          fats: 15
        },
        {
          id: 14,
          name: 'Trail Mix',
          ingredients: ['nuts', 'dried fruit', 'seeds'],
          calories: 400,
          protein: 12,
          carbs: 50,
          fats: 20
        }
      ],
      dinner: [
        {
          id: 15,
          name: 'Steak & Potatoes',
          ingredients: ['10oz steak', 'baked potato', 'asparagus'],
          calories: 800,
          protein: 60,
          carbs: 60,
          fats: 35
        },
        {
          id: 16,
          name: 'Salmon Feast',
          ingredients: ['8oz salmon', 'quinoa', 'avocado', 'mixed greens'],
          calories: 750,
          protein: 50,
          carbs: 55,
          fats: 35
        }
      ]
    }
  },
  recomposition: {
    name: 'Body Recomposition',
    dailyCalories: 2400,
    meals: {
      breakfast: [
        {
          id: 17,
          name: 'Balanced Breakfast',
          ingredients: ['4 eggs', 'oatmeal', 'berries', 'almonds'],
          calories: 500,
          protein: 30,
          carbs: 55,
          fats: 18
        },
        {
          id: 18,
          name: 'Power Smoothie',
          ingredients: ['protein powder', 'oats', 'peanut butter', 'banana'],
          calories: 450,
          protein: 30,
          carbs: 50,
          fats: 15
        }
      ],
      lunch: [
        {
          id: 19,
          name: 'Chicken Quinoa Bowl',
          ingredients: ['6oz chicken', 'quinoa', 'avocado', 'mixed greens'],
          calories: 600,
          protein: 45,
          carbs: 50,
          fats: 25
        },
        {
          id: 20,
          name: 'Turkey Sandwich',
          ingredients: ['whole wheat bread', 'turkey', 'cheese', 'vegetables'],
          calories: 550,
          protein: 35,
          carbs: 55,
          fats: 20
        }
      ],
      snacks: [
        {
          id: 21,
          name: 'Protein Bar',
          ingredients: ['protein bar', 'apple'],
          calories: 300,
          protein: 20,
          carbs: 35,
          fats: 10
        },
        {
          id: 22,
          name: 'Greek Yogurt',
          ingredients: ['Greek yogurt', 'granola', 'honey'],
          calories: 250,
          protein: 20,
          carbs: 30,
          fats: 8
        }
      ],
      dinner: [
        {
          id: 23,
          name: 'Salmon & Veggies',
          ingredients: ['6oz salmon', 'sweet potato', 'broccoli'],
          calories: 550,
          protein: 40,
          carbs: 45,
          fats: 22
        },
        {
          id: 24,
          name: 'Lean Beef Bowl',
          ingredients: ['6oz lean beef', 'brown rice', 'mixed vegetables'],
          calories: 600,
          protein: 45,
          carbs: 55,
          fats: 20
        }
      ]
    }
  }
};

export const products = {
  apparels: [
    {
      id: 1,
      name: 'Performance T-Shirt',
      price: 29.99,
      description: 'Moisture-wicking fabric, perfect for intense workouts',
      image: '👕',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'White', 'Navy', 'Red'],
      stock: 50
    },
    {
      id: 2,
      name: 'Compression Shorts',
      price: 34.99,
      description: 'Supportive fit with breathable material',
      image: '🩳',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'Navy', 'Gray'],
      stock: 40
    },
    {
      id: 3,
      name: 'Training Hoodie',
      price: 59.99,
      description: 'Warm and comfortable for outdoor training',
      image: '🧥',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Navy'],
      stock: 30
    },
    {
      id: 4,
      name: 'Sports Bra',
      price: 39.99,
      description: 'High support for intense workouts',
      image: '👚',
      sizes: ['S', 'M', 'L', 'XL'],
      colors: ['Black', 'White', 'Pink', 'Purple'],
      stock: 45
    },
    {
      id: 5,
      name: 'Training Pants',
      price: 49.99,
      description: 'Flexible and comfortable for any exercise',
      image: '👖',
      sizes: ['S', 'M', 'L', 'XL', 'XXL'],
      colors: ['Black', 'Gray', 'Navy'],
      stock: 35
    }
  ],
  food: [
    {
      id: 6,
      name: 'Whey Protein Isolate',
      price: 54.99,
      description: 'Pure protein powder for muscle recovery',
      image: '🥛',
      weight: '2 lbs',
      flavors: ['Chocolate', 'Vanilla', 'Strawberry', 'Cookies & Cream'],
      stock: 60
    },
    {
      id: 7,
      name: 'BCAA Powder',
      price: 29.99,
      description: 'Essential amino acids for muscle preservation',
      image: '🧪',
      weight: '1 lb',
      flavors: ['Fruit Punch', 'Blue Raspberry', 'Watermelon'],
      stock: 50
    },
    {
      id: 8,
      name: 'Pre-Workout',
      price: 44.99,
      description: 'Energy boost for intense training sessions',
      image: '⚡',
      weight: '1.2 lbs',
      flavors: ['Fruit Punch', 'Blue Raspberry', 'Green Apple'],
      stock: 45
    },
    {
      id: 9,
      name: 'Creatine Monohydrate',
      price: 24.99,
      description: 'Pure creatine for strength and power',
      image: '💊',
      weight: '1.1 lbs',
      flavors: ['Unflavored'],
      stock: 70
    },
    {
      id: 10,
      name: 'Protein Bars',
      price: 34.99,
      description: 'Convenient protein on the go',
      image: '🍫',
      quantity: '12 bars',
      flavors: ['Chocolate', 'Peanut Butter', 'Cookies & Cream'],
      stock: 55
    }
  ],
  equipment: [
    {
      id: 11,
      name: 'Adjustable Dumbbells',
      price: 199.99,
      description: 'Space-saving adjustable weights',
      image: '🏋️',
      stock: 20
    },
    {
      id: 12,
      name: 'Resistance Bands Set',
      price: 29.99,
      description: 'Versatile bands for various exercises',
      image: '🎗️',
      stock: 40
    },
    {
      id: 13,
      name: 'Yoga Mat Premium',
      price: 49.99,
      description: 'Extra thick for comfort and stability',
      image: '🧘',
      stock: 30
    },
    {
      id: 14,
      name: 'Pull-up Bar',
      price: 39.99,
      description: 'Door-mounted for home workouts',
      image: '🔩',
      stock: 25
    },
    {
      id: 15,
      name: 'Kettlebell Set',
      price: 149.99,
      description: 'Set of 3 kettlebells for full body workouts',
      image: '🔔',
      stock: 15
    }
  ],
  tools: [
    {
      id: 16,
      name: 'Smart Scale',
      price: 79.99,
      description: 'Track weight and body composition',
      image: '⚖️',
      stock: 25
    },
    {
      id: 17,
      name: 'Foam Roller',
      price: 24.99,
      description: 'Muscle recovery and massage',
      image: '🎯',
      stock: 35
    },
    {
      id: 18,
      name: 'Jump Rope',
      price: 14.99,
      description: 'Cardio training tool',
      image: '🪢',
      stock: 50
    },
    {
      id: 19,
      name: 'Gym Bag',
      price: 44.99,
      description: 'Spacious bag with separate compartments',
      image: '🎒',
      colors: ['Black', 'Gray', 'Navy'],
      stock: 30
    },
    {
      id: 20,
      name: 'Water Bottle',
      price: 19.99,
      description: 'Insulated bottle for hydration',
      image: '🍶',
      colors: ['Black', 'White', 'Blue', 'Red'],
      stock: 60
    }
  ]
};

export const progressData = {
  2: {
    userId: 2,
    weightHistory: [
      { date: '2024-01-15', weight: 85 },
      { date: '2024-01-22', weight: 84.5 },
      { date: '2024-01-29', weight: 84.2 },
      { date: '2024-02-05', weight: 83.8 },
      { date: '2024-02-12', weight: 83.5 },
      { date: '2024-02-19', weight: 83.2 },
      { date: '2024-02-26', weight: 82.8 }
    ],
    bodyMeasurements: [
      { date: '2024-01-15', chest: 102, waist: 92, arms: 35, thighs: 55 },
      { date: '2024-01-29', chest: 101.5, waist: 91.5, arms: 35.5, thighs: 55.5 },
      { date: '2024-02-12', chest: 101, waist: 91, arms: 36, thighs: 56 },
      { date: '2024-02-26', chest: 100.5, waist: 90.5, arms: 36.5, thighs: 56.5 }
    ],
    workoutHistory: [
      { date: '2024-01-15', workout: 'Full Body Basics', completed: true },
      { date: '2024-01-16', workout: 'Core Foundation', completed: true },
      { date: '2024-01-17', workout: 'Full Body Basics', completed: true },
      { date: '2024-01-18', workout: 'Core Foundation', completed: false },
      { date: '2024-01-19', workout: 'Full Body Basics', completed: true },
      { date: '2024-01-20', workout: 'Core Foundation', completed: true },
      { date: '2024-01-21', workout: 'Full Body Basics', completed: true }
    ]
  },
  3: {
    userId: 3,
    weightHistory: [
      { date: '2024-01-20', weight: 65 },
      { date: '2024-01-27', weight: 65.5 },
      { date: '2024-02-03', weight: 66 },
      { date: '2024-02-10', weight: 66.5 },
      { date: '2024-02-17', weight: 67 },
      { date: '2024-02-24', weight: 67.5 }
    ],
    bodyMeasurements: [
      { date: '2024-01-20', chest: 88, waist: 68, arms: 28, thighs: 48 },
      { date: '2024-02-03', chest: 88.5, waist: 68, arms: 28.5, thighs: 48.5 },
      { date: '2024-02-17', chest: 89, waist: 67.5, arms: 29, thighs: 49 }
    ],
    workoutHistory: [
      { date: '2024-01-20', workout: 'Upper Body Strength', completed: true },
      { date: '2024-01-21', workout: 'Lower Body Power', completed: true },
      { date: '2024-01-22', workout: 'Upper Body Strength', completed: true },
      { date: '2024-01-23', workout: 'Lower Body Power', completed: true },
      { date: '2024-01-24', workout: 'Upper Body Strength', completed: true },
      { date: '2024-01-25', workout: 'Lower Body Power', completed: true }
    ]
  },
  4: {
    userId: 4,
    weightHistory: [
      { date: '2024-02-01', weight: 78 },
      { date: '2024-02-08', weight: 78 },
      { date: '2024-02-15', weight: 77.5 },
      { date: '2024-02-22', weight: 77.5 },
      { date: '2024-03-01', weight: 77 }
    ],
    bodyMeasurements: [
      { date: '2024-02-01', chest: 98, waist: 82, arms: 33, thighs: 52 },
      { date: '2024-02-15', chest: 98.5, waist: 81.5, arms: 33.5, thighs: 52.5 },
      { date: '2024-03-01', chest: 99, waist: 81, arms: 34, thighs: 53 }
    ],
    workoutHistory: [
      { date: '2024-02-01', workout: 'Push Pull Legs A', completed: true },
      { date: '2024-02-02', workout: 'Push Pull Legs B', completed: true },
      { date: '2024-02-03', workout: 'Push Pull Legs A', completed: true },
      { date: '2024-02-04', workout: 'Push Pull Legs B', completed: true },
      { date: '2024-02-05', workout: 'Push Pull Legs A', completed: true }
    ]
  }
};

export const bugs = [
  {
    id: 1,
    title: 'App crashes on workout completion',
    description: 'When user completes a workout, the app crashes instead of saving progress. This happens consistently on Android devices when the workout has more than 5 exercises.',
    severity: 'high',
    status: 'open',
    reportedBy: 2,
    reportedDate: '2024-02-20',
    assignedTo: 5,
    resolvedDate: null
  },
  {
    id: 2,
    title: 'Meal plan not updating after goal change',
    description: 'After changing fitness goal in settings, the meal plan screen still shows the old meal plan. User needs to restart the app to see the updated meals.',
    severity: 'medium',
    status: 'in-progress',
    reportedBy: 3,
    reportedDate: '2024-02-18',
    assignedTo: 5,
    resolvedDate: null
  },
  {
    id: 3,
    title: 'Product images not loading',
    description: 'Some product images in the shop screen fail to load on slow network connections. This affects mostly the equipment category.',
    severity: 'low',
    status: 'resolved',
    reportedBy: 4,
    reportedDate: '2024-02-15',
    assignedTo: 5,
    resolvedDate: '2024-02-17'
  },
  {
    id: 4,
    title: 'Progress chart not displaying correctly',
    description: 'The weight progress chart shows incorrect data points. The dates are not properly aligned with the x-axis labels.',
    severity: 'medium',
    status: 'open',
    reportedBy: 2,
    reportedDate: '2024-02-22',
    assignedTo: null,
    resolvedDate: null
  },
  {
    id: 5,
    title: 'Search bar not filtering correctly',
    description: 'The search bar in user management screen doesn\'t filter results when searching by email address. Only works for username.',
    severity: 'low',
    status: 'in-progress',
    reportedBy: 1,
    reportedDate: '2024-02-25',
    assignedTo: 5,
    resolvedDate: null
  },
  {
    id: 6,
    title: 'Order status not updating',
    description: 'Admin cannot update order status from the order detail modal. The update button is not responsive.',
    severity: 'high',
    status: 'open',
    reportedBy: 1,
    reportedDate: '2024-02-26',
    assignedTo: null,
    resolvedDate: null
  },
  {
    id: 7,
    title: 'Bug tracker filter not working',
    description: 'The status filter in bug tracker screen doesn\'t filter the bug list. All bugs are always shown regardless of selected filter.',
    severity: 'medium',
    status: 'resolved',
    reportedBy: 5,
    reportedDate: '2024-02-10',
    assignedTo: 5,
    resolvedDate: '2024-02-12'
  },
  {
    id: 8,
    title: 'Login session expiring too quickly',
    description: 'Users are being logged out after just a few minutes of inactivity, even though the session should persist for 24 hours.',
    severity: 'high',
    status: 'open',
    reportedBy: 3,
    reportedDate: '2024-02-28',
    assignedTo: 5,
    resolvedDate: null
  }
];

export const orders = [
  {
    id: 1,
    userId: 2,
    items: [
      { productId: 1, name: 'Performance T-Shirt', quantity: 2, price: 29.99 },
      { productId: 6, name: 'Whey Protein Isolate', quantity: 1, price: 54.99 }
    ],
    total: 114.97,
    status: 'delivered',
    orderDate: '2024-02-01',
    deliveryDate: '2024-02-05'
  },
  {
    id: 2,
    userId: 3,
    items: [
      { productId: 6, name: 'Whey Protein Isolate', quantity: 2, price: 54.99 },
      { productId: 7, name: 'BCAA Powder', quantity: 1, price: 29.99 }
    ],
    total: 139.97,
    status: 'shipped',
    orderDate: '2024-02-20',
    deliveryDate: null
  },
  {
    id: 3,
    userId: 4,
    items: [
      { productId: 11, name: 'Adjustable Dumbbells', quantity: 1, price: 199.99 },
      { productId: 13, name: 'Yoga Mat Premium', quantity: 1, price: 49.99 }
    ],
    total: 249.98,
    status: 'processing',
    orderDate: '2024-02-25',
    deliveryDate: null
  },
  {
    id: 4,
    userId: 2,
    items: [
      { productId: 8, name: 'Pre-Workout', quantity: 1, price: 44.99 },
      { productId: 10, name: 'Protein Bars', quantity: 1, price: 34.99 }
    ],
    total: 79.98,
    status: 'pending',
    orderDate: '2024-02-28',
    deliveryDate: null
  },
  {
    id: 5,
    userId: 3,
    items: [
      { productId: 2, name: 'Compression Shorts', quantity: 3, price: 34.99 },
      { productId: 4, name: 'Sports Bra', quantity: 2, price: 39.99 }
    ],
    total: 184.95,
    status: 'delivered',
    orderDate: '2024-01-15',
    deliveryDate: '2024-01-20'
  },
  {
    id: 6,
    userId: 4,
    items: [
      { productId: 16, name: 'Smart Scale', quantity: 1, price: 79.99 },
      { productId: 17, name: 'Foam Roller', quantity: 1, price: 24.99 }
    ],
    total: 104.98,
    status: 'shipped',
    orderDate: '2024-02-26',
    deliveryDate: null
  }
];
